"use client";

import { useState } from "react";
import { z } from "zod";
import {
  getMemberNickName,
  MemberNicknameCheck,
  UpdateMemberNickname,
} from "@/actions/member-modal";
import { NickNameSchema } from "@/schema/NickNameSchema";

export default function Modal() {
  const [nickname, setNickname] = useState(""); // 닉네임
  const [message, setMessage] = useState<string>(""); // 메시지
  const [isNicknameValid, setIsNicknameValid] = useState<boolean>(false); // 닉네임 유효성
  const [isOpen, setIsOpen] = useState<boolean>(true); // 모달 열림

  // 닉네임 중복 확인
  const handleCheckNickname = () => {
    if (!nickname.trim()) {
      setMessage("닉네임을 입력해주세요.");
      setIsNicknameValid(false);
      return;
    }

    // 유효성 검사
    try {
      NickNameSchema.parse(nickname); // 닉네임 유효성 검사
    } catch (error) {
      if (error instanceof z.ZodError) {
        setMessage(error.errors[0].message);
      }
      setIsNicknameValid(false);
      return;
    }

    // 중복 확인 API 호출
    MemberNicknameCheck({ nickname })
      .then((responseData) => {
        if (responseData.isSuccess) {
          setMessage("사용 가능한 닉네임입니다.");
          setIsNicknameValid(true);
        } else {
          setMessage(
            typeof responseData.result === "string"
              ? responseData.result
              : "중복된 닉네임입니다.",
          );
          setIsNicknameValid(false);
        }
      })
      .catch(() => {
        setIsNicknameValid(false);
      });
  };

  // 기본 닉네임 설정
  const handleDefaultNickname = () => {
    getMemberNickName()
      .then((resnickname) => {
        const defaultNickname =
          typeof resnickname.result === "string" ? resnickname.result : "";
        setNickname(defaultNickname);
        setMessage("닉네임이 비어 있어 기본 닉네임으로 설정되었습니다.");
        setIsNicknameValid(true);
      })
      .catch(() => {
        setIsNicknameValid(false);
      });
  };

  // 닉네임 설정 제출
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!nickname.trim()) {
      handleDefaultNickname();
      return;
    }

    if (!isNicknameValid) {
      setMessage("닉네임이 중복되었습니다.");
      return;
    }

    // 유효성 검사 및 닉네임 업데이트
    try {
      NickNameSchema.parse(nickname); // 닉네임 유효성 검사
    } catch (error) {
      if (error instanceof z.ZodError) {
        setMessage(error.errors[0].message);
      }
      return;
    }

    UpdateMemberNickname(nickname)
      .then((response) => {
        if (response.isSuccess) {
          setMessage("닉네임 설정이 완료되었습니다.");
          setTimeout(() => {
            setIsOpen(false); // 닉네임 변경 성공 시 모달 닫기
          }, 1000);
        } else {
          setMessage(
            typeof response.result === "string"
              ? response.result
              : "닉네임 설정 중 문제가 발생했습니다.",
          );
        }
      })
      .catch(() => {
        // 비워둠
      });
  };

  if (!isOpen) return null;

  return (
    <form
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onSubmit={(event) => {
        event.preventDefault();
        handleSubmit(event);
      }}
    >
      <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-6 flex flex-col">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          닉네임 설정
        </h2>

        <div className="flex flex-col gap-4 mb-6">
          <div className="relative w-full">
            <input
              type="text"
              id="nickname"
              name="nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="w-full h-12 rounded-lg bg-[#F1F4F9] border-2 px-4 pr-24 focus:bg-[#D4D4D4] outline-none"
              placeholder="닉네임을 입력하세요"
            />
            <button
              type="button"
              onClick={() => handleCheckNickname()}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[14px] text-blue-700 px-3 py-2 h-[40px]"
            >
              중복 검사
            </button>
          </div>
          <div className="flex items-center justify-center gap-4 p-4 bg-[#F9FAFB] rounded-lg shadow-md">
            {message ? (
              <p
                className={`text-sm font-medium ${
                  message.startsWith("사용 가능한") ||
                  message.startsWith("닉네임 설정")
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {message}
              </p>
            ) : null}
          </div>
        </div>

        <ul className="border rounded-lg p-5 bg-[#F9FAFB] text-gray-700 text-center text-base space-y-2 shadow-md">
          <li>입력하지 않을 경우 기본 닉네임으로 설정됩니다.</li>
          <li>닉네임은 영문, 숫자, 한글, #만 포함할 수 있습니다.</li>
          <li>3자 ~ 15자 길이로 설정해야 합니다.</li>
        </ul>
        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="text-lg bg-[#47D0BF] px-8 py-3 rounded-lg text-white hover:bg-[#35b0a0] transition-all"
          >
            확인
          </button>
        </div>
      </div>
    </form>
  );
}
