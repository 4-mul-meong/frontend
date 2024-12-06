import type { NextAuthOptions } from "next-auth";
import KakaoProvider from "next-auth/providers/kakao";
import NaverProvider from "next-auth/providers/naver";
import type { CommonRes } from "@/types/common";
import type { MemberSignInResType } from "@/types/member";

export const options: NextAuthOptions = {
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID || "",
      clientSecret: process.env.KAKAO_CLIENT_SECRET || "",
    }),
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID || "",
      clientSecret: process.env.NAVER_CLIENT_SECRET || "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async signIn({ user, account, profile }) {
      if (profile && account) {
        console.log(account);
        try {
          const res = await fetch(
            `${process.env.BASE_API_URL}/member-service/v1/auth/sign-in`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                oauthId: account.providerAccountId,
                oauthProvider: account.provider,
              }),
            },
          );

          if (!res.ok) return false;

          const responseData =
            (await res.json()) as CommonRes<MemberSignInResType>;
          const data = responseData.result as MemberSignInResType;
          user.memberUuid = data.memberUuid;
          user.accessToken = data.accessToken;
          user.refreshToken = data.refreshToken;
          user.isSignUp = data.isSignUp;

          console.log(data);

          return true;
        } catch (error) {
          // console.error("Error in social login:", error);
          return false;
        }
      }
      return false;
    },

    async jwt({ token, user }) {
      // token.memberUuid = (user as ExtendedUser).memberUuid;
      // token.accessToken = (user as ExtendedUser).accessToken;
      // token.refreshToken = (user as ExtendedUser).refreshToken;

      // const currentTime = Math.floor(Date.now() / 1000); // 현재 시간 (초 단위)
      // const accessTokenExpiry = token.accessTokenExpiry as number | undefined;

      // if (accessTokenExpiry && currentTime > accessTokenExpiry) {
      //   // console.log("Access token expired, refreshing token...");
      //   try {
      //     const res = await fetch(
      //       // 재발급 api
      //       `${process.env.BASE_API_URL}/member-service/v1/auth/token/refresh`,
      //       {
      //         method: "POST",
      //         headers: { "Content-Type": "application/json" },
      //         body: JSON.stringify({
      //           refreshToken: token.refreshToken,
      //           memberUuid: token.memberUuid,
      //         }),
      //       },
      //     );

      //     if (!res.ok) {
      //       // console.error("Failed to refresh access token");
      //       return token; // 기존 토큰 그대로 반환 (갱신 실패 시)
      //     }

      //     const responseData = (await res.json()) as { result: AuthResponse };

      //     // console.log("Token refresh response data:", responseData);

      //     const newTokenData = responseData.result;

      //     if (newTokenData.accessToken) {
      //       token.accessToken = newTokenData.accessToken;
      //       token.accessTokenExpiry = Math.floor(Date.now() / 1000) + 60 * 60;
      //     }
      //   } catch (error) {
      //     // console.error("Error refreshing access token:", error);
      //   }
      // }

      return { ...token, ...user };
    },

    session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },

  pages: {
    signIn: "/sign-in",
    error: "/error",
  },
};
