import { DefaultSession, DefaultUser } from "next-auth/next";

declare module "next-auth" {
  interface Session {
    user: {
      memberUuid: string;
      accessToken: string;
      refreshToken: string;
      kakaoAccessToken: string;
      kakaoRefreshToken: string;
      naverAccessToken: string;
      naverRefreshToken: string;
      isSignUp: boolean;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    memberUuid: string;
    accessToken: string;
    refreshToken: string;
    isSignUp: boolean;
  }
}
