"use client";

import { useState } from "react";
import { z } from "zod";
import { MemberNicknameCheck } from "@/actions/member-modal";
import { NickNameSchema } from "@/schema/NickNameSchema";

export default function Modal() {
  const [nickname, setNickname] = useState("");
  const [message, setMessage] = useState("");

  const handleCheckNickname = async () => {
    // 닉네임이 입력되지 않은 경우 처리
    if (!nickname.trim()) {
      setMessage("닉네임을 입력해주세요.");
      return;
    }

    // 닉네임 유효성 검사
    try {
      NickNameSchema.parse(nickname); // 불러온 스키마로 유효성 검사
    } catch (error) {
      if (error instanceof z.ZodError) {
        // ZodError에서 첫 번째 에러 메시지를 가져오기
        setMessage(error.errors[0].message);
      } else {
        setMessage("알 수 없는 오류가 발생했습니다.");
      }
      return;
    }

    // 닉네임 중복 검사 API 호출
    try {
      const responseData = await MemberNicknameCheck({ nickname });
      if (responseData.isSuccess) {
        setMessage("사용 가능한 닉네임입니다.");
      } else {
        setMessage("중복된 닉네임입니다.");
      }
    } catch (error) {
      setMessage("오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <fieldset className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-1/2 h-1/2 bg-white rounded-lg shadow-lg p-6 flex flex-col justify-between">
        <h2 className="text-xl font-bold mb-4">닉네임 설정</h2>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            id="nickname"
            name="nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="w-[800px] h-[55px] rounded-lg outline-none bg-[#F1F4F9] px-2 border-2 focus:bg-[#D4D4D4]"
            placeholder="닉네임을 입력하세요"
          />
          <button
            type="button"
            onClick={() => {
              void handleCheckNickname();
            }}
            className="bg-[#47D0BF] text-white px-4 py-2 rounded-lg items-center"
          >
            중복 검사
          </button>
        </div>
        <p className="text-center text-red-500">{message}</p>
        <ul className="border-2 rounded-lg items-center p-7 my-8 justify-center flex flex-col text-[18px]">
          <li>닉네임은 영문, 숫자, 한글, #만 포함할 수 있습니다</li>
          <li>3자 이상 15자 이하이어야 합니다.</li>
        </ul>
        <div className="flex justify-center mt-auto">
          <button
            type="button"
            className="text-[20px] bg-[#47D0BF] py-[25px] rounded-xl text-white text-center w-[200px]"
          >
            확인
          </button>
        </div>
      </div>
    </fieldset>
  );
}
