"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import {
  Bubbles,
  KakaoButton,
  Kitty,
  NaverButton,
} from "@/components/common/icons";
import { getSessionIsSignUp } from "@/actions/common";

function SignInForm() {
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (provider: string) => {
    setLoading(true);

    const isSignUp = await getSessionIsSignUp();
    const redirectUrl = isSignUp ? "/sign-modal" : "/";

    await signIn(provider, { callbackUrl: redirectUrl });

    setLoading(false);
  };

  return (
    <div className="w-full bg-white">
      <div className="absolute top-[15%] left-1/2 transform -translate-x-1/2 flex flex-col items-center justify-center px-5 text-nowrap gap-1 w-full">
        <h2 className="text-[#47D0BF] text-[48px] px-8">꾸아를 즐겨보세요.</h2>
        <h3 className="text-[#B3B4B5] text-[15px]">
          회원가입 필요없는 간편 로그인
        </h3>
      </div>

      <div className="flex flex-col justify-end relative h-screen pb-28 px-8 gap-[14px]">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0">
          <Bubbles />
        </div>

        <div className="relative z-10">
          <div className="absolute top-[-30px] left-1/2 transform -translate-x-1/2">
            <Kitty width={70} height={70} />
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            void handleSignIn("kakao");
          }}
          disabled={loading}
          className={`relative bg-[#FEE500] text-[18px] p-7 rounded-lg flex justify-center items-center gap-4 z-20 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <KakaoButton />
          <span>카카오로 시작하기</span>
        </button>

        <button
          type="button"
          onClick={() => {
            void handleSignIn("naver");
          }}
          disabled={loading}
          className={`bg-[#47474A] text-[18px] text-white p-7 rounded-lg flex justify-center items-center gap-4 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <NaverButton />
          <span>네이버로 시작하기</span>
        </button>
      </div>
    </div>
  );
}

export default SignInForm;
