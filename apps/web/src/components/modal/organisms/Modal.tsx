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
  const [nickname, setNickname] = useState(""); // 닉네임 입력 상태 관리
  const [message, setMessage] = useState(""); // 메시지 상태 관리

  const handleCheckNickname = async () => {
    if (!nickname.trim()) {
      setMessage("닉네임을 입력해주세요."); // 닉네임 입력 여부 확인
      return;
    }

    try {
      NickNameSchema.parse(nickname); // 닉네임 유효성 검사 실행
    } catch (error) {
      if (error instanceof z.ZodError) {
        setMessage(error.errors[0].message);
      } else {
        setMessage("알 수 없는 오류가 발생했습니다.");
      }
      return;
    }

    try {
      const responseData: { isSuccess: boolean } = await MemberNicknameCheck({
        nickname, // 닉네임 중복 확인 API 호출
      });
      if (responseData.isSuccess) {
        setMessage("사용 가능한 닉네임입니다.");
      } else {
        setMessage("중복된 닉네임입니다.");
      }
    } catch (error) {
      setMessage("오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const handleDefaultNickname = async () => {
    try {
      const resnickname = await getMemberNickName(); // 기본 닉네임 가져오기 API 호출
      const defaultNickname =
        typeof resnickname.result === "string" ? resnickname.result : "";
      setNickname(defaultNickname);
      setMessage("닉네임이 비어 있어 기본 닉네임으로 설정되었습니다.");
    } catch (error) {
      setMessage("기본 닉네임을 불러오지 못했습니다.");
    }
  };

  const handleSubmit: (
    event: React.FormEvent<HTMLFormElement>,
  ) => Promise<void> = async (event) => {
    event.preventDefault(); // 기본 폼 제출 이벤트 방지

    if (!nickname.trim()) {
      await handleDefaultNickname(); // 닉네임 비어 있으면 기본 닉네임 설정
      return;
    }

    try {
      NickNameSchema.parse(nickname); // 닉네임 유효성 검사 실행

      try {
        const response = await UpdateMemberNickname(nickname); // 닉네임 업데이트 API 호출
        if (response.result) {
          setMessage("닉네임 설정이 완료되었습니다.");
        } else {
          setMessage("닉네임 설정이 완료 되었습니다.");
        }
      } catch (error) {
        setMessage("닉네임 설정 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        setMessage(error.errors[0].message);
      } else {
        setMessage("유효하지 않은 닉네임입니다.");
      }
    }
  };

  return (
    <form
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onSubmit={(event) => {
        void handleSubmit(event); // 폼 제출 이벤트 처리
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
              value={nickname} // 닉네임 상태 값 반영
              onChange={(e) => setNickname(e.target.value)} // 닉네임 입력값 업데이트
              className="w-full h-12 rounded-lg bg-[#F1F4F9] border-2 px-4 pr-24 focus:bg-[#D4D4D4] outline-none"
              placeholder="닉네임을 입력하세요" // 닉네임 입력 필드
            />
            <button
              type="button"
              onClick={() => {
                void handleCheckNickname(); // 닉네임 중복 확인 실행
              }}
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
                  message.startsWith("닉네임이 설정")
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {message} {/* 메시지 출력 */}
              </p>
            ) : null}
          </div>
        </div>

        <ul className="border rounded-lg p-5 bg-[#F9FAFB] text-gray-700 text-center text-base space-y-2 shadow-md">
          <li>입력하지 않을 경우 기본 닉네임으로 설정됩니다.</li>{" "}
          {/* 안내 메시지 */}
          <li>닉네임은 영문, 숫자, 한글, #만 포함할 수 있습니다.</li>
          <li>3자 ~ 15자 길이로 설정해야 합니다.</li>
        </ul>
        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="text-lg bg-[#47D0BF] px-8 py-3 rounded-lg text-white hover:bg-[#35b0a0] transition-all"
          >
            확인 {/* 닉네임 설정 버튼 */}
          </button>
        </div>
      </div>
    </form>
  );
}
