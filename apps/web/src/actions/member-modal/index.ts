"use server";
import type {
  CheckNickNameType,
  MemberNickNameType,
  UpdateNickNameReq,
} from "@/types/member";
import type { CommonRes } from "@/types/common";
import {
  getHeaders,
  getHeadersWithAccessToken,
  getSessionMemberUuid,
} from "../common";

const PREFIX = "member-service";
const API_SERVER = process.env.BASE_API_URL;

// 닉네임 중복 검사
export async function MemberNicknameCheck(data: MemberNickNameType) {
  const URI = `${API_SERVER}/${PREFIX}/v1/members/check-nickname`;

  // console.log(data);

  const res: Response = await fetch(URI, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify(data),
    cache: "no-cache",
  });

  const responseData = (await res.json()) as CommonRes<MemberNickNameType>;

  // console.log(" 응답 데이터:", responseData);

  // console.log("뭐오는지?", responseData);
  // console.log("뭐오는지?", responseData.result);
  // console.log("뭐오는지?", responseData.isSuccess);
  return responseData;
}

// 닉네임 조회
export async function getMemberNickName() {
  const memberUuid = await getSessionMemberUuid();
  const URI = `${API_SERVER}/${PREFIX}/v1/members/${memberUuid}/nickname`;

  const headers = await getHeaders();
  const res: Response = await fetch(URI, {
    headers,
    method: "GET",
    cache: "no-cache",
  });

  const resnickname = (await res.json()) as CommonRes<CheckNickNameType>;

  return resnickname;
}

//닉네임 수정

export async function UpdateMemberNickname(nickname: string) {
  const memberUuid = await getSessionMemberUuid();
  const URI = `${API_SERVER}/${PREFIX}/v1/members/${memberUuid}/nickname`;

  const headers = await getHeadersWithAccessToken();
  // console.log("URI:", URI);
  // console.log("Headers:", headers);
  // console.log("Request Body:", { nickname });

  const res: Response = await fetch(URI, {
    headers: {
      ...headers,
    },
    method: "PUT",
    cache: "no-cache",
    body: JSON.stringify({ nickname }),
  });

  // console.log("HTTP 상태 코드:", res.status);
  // console.log("HTTP 상태 메시지:", res.statusText);

  const rawResponseText = await res.text();
  // console.log("응답 원본 텍스트:", rawResponseText);

  const resupdate = JSON.parse(rawResponseText) as CommonRes<UpdateNickNameReq>;
  // console.log("에러값:", resupdate.result);

  // console.log("응답 데이터 (파싱된 JSON):", resupdate);
  // console.log("닉네임 업데이트 성공:", resupdate.result);

  return resupdate;
}
