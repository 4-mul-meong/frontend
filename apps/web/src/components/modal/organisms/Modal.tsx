"use client";
import { useState } from "react";
import { z } from "zod";
import { getMemberNickName, MemberNicknameCheck } from "@/actions/member-modal";
import { NickNameSchema } from "@/schema/NickNameSchema";

export default function Modal() {
  // 닉네임 입력 상태 및 알림 메시지 상태 관리
  const [nickname, setNickname] = useState("");
  const [message, setMessage] = useState("");

  // 닉네임 중복 검사 로직
  const handleCheckNickname = async () => {
    // 닉네임이 비어있는 경우 메시지 출력
    if (!nickname.trim()) {
      setMessage("닉네임을 입력해주세요.");
      return;
    }

    // 닉네임 형식이 올바른지 Zod 스키마를 통해 검증
    try {
      NickNameSchema.parse(nickname);
    } catch (error) {
      // 형식이 맞지 않을 경우 사용자에게 알림
      if (error instanceof z.ZodError) {
        setMessage(error.errors[0].message); // 첫 번째 오류 메시지 표시
      } else {
        setMessage("알 수 없는 오류가 발생했습니다."); // 예외 처리
      }
      return;
    }

    // 서버에 닉네임 중복 여부 확인 요청
    try {
      const responseData: { isSuccess: boolean } = await MemberNicknameCheck({
        nickname,
      });
      if (responseData.isSuccess) {
        setMessage("사용 가능한 닉네임입니다."); // 닉네임 사용 가능
      } else {
        setMessage("중복된 닉네임입니다."); // 닉네임 중복
      }
    } catch (error) {
      setMessage("오류가 발생했습니다. 다시 시도해주세요."); // 네트워크 또는 서버 오류
    }
  };

  // 기본 닉네임 가져오기 로직
  const handleDefaultNickname = async () => {
    try {
      const resnickname = await getMemberNickName();
      const defaultNickname =
        typeof resnickname.result === "string" ? resnickname.result : "";
      setNickname(defaultNickname);
    } catch (error) {
      setMessage("기본 닉네임을 불러오지 못했습니다.");
    }
  };

  // 닉네임 최종 설정 로직
  const handleSubmit = async () => {
    if (!nickname.trim()) {
      await handleDefaultNickname();
    } else {
      try {
        NickNameSchema.parse(nickname);
        setMessage("닉네임이 설정되었습니다.");
      } catch (error) {
        await handleDefaultNickname();
      }
    }
  };

  return (
    <fieldset className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-6 flex flex-col">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          닉네임 설정
        </h2>

        <div className="flex flex-col gap-4 mb-6">
          <div className="flex items-center">
            <input
              type="text"
              id="nickname"
              name="nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="flex-grow h-12 rounded-lg bg-[#F1F4F9] border-2 px-2 focus:bg-[#D4D4D4] outline-none"
              placeholder="닉네임을 입력하세요"
            />
            <button
              type="button"
              onClick={() => {
                void handleCheckNickname();
              }}
              className="ml-2 bg-[#47D0BF] text-white px-6 py-2 h-[48px] rounded-lg hover:bg-[#35b0a0] transition-all"
            >
              중복 검사
            </button>
          </div>
          <p
            className={`text-sm ${message.startsWith("사용 가능한") ? "text-green-500" : "text-red-500"}`}
          >
            {message}
          </p>
        </div>

        <ul className="border rounded-lg p-5 bg-[#F9FAFB] text-gray-700 text-center text-base space-y-2 shadow-md">
          <li>입력하지 않을 경우 기본 닉네임으로 설정됩니다.</li>
          <li>닉네임은 영문, 숫자, 한글, #만 포함할 수 있습니다.</li>
          <li>3자 ~ 15자 길이로 설정해야 합니다.</li>
        </ul>

        <div className="flex justify-center mt-6">
          <button
            type="button"
            onClick={() => {
              void handleSubmit();
            }}
            className="text-lg bg-[#47D0BF] px-8 py-3 rounded-lg text-white hover:bg-[#35b0a0] transition-all"
          >
            확인
          </button>
        </div>
      </div>
    </fieldset>
  );
}
