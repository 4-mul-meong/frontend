import type { Datetime } from "../common";

export type MemberUuid = string;

export interface MemberReq {
  memberUuid: string;
}

export interface Member {
  memberUuid: string;
  nickname: string;
  grade: string;
  profileImageUrl: string;
}

export interface MemberSignInResType {
  memberUuid: string;
  member: Member;
  accessToken: string;
  refreshToken: string;
}

export interface MemberProfile {
  memberUuid: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: Datetime;
  point: number;
  grade: string;
  equippedBadge: {
    badgeId: number;
    badgeName: string;
    badgeImageUrl: string;
    badgeDescription: string;
  };
  followerCount: number;
  followingCount: number;
  feedCount: number;
  shortsCount: number;
}
