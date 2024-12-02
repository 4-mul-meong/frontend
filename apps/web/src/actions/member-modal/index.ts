"use server";
import type { CheckNickNameType, MemberNickNameType } from "@/types/member";
import type { CommonRes } from "@/types/common";
import { getHeaders, getSessionMemberUuid } from "../common";

const PREFIX = "member-service";
const API_SERVER = process.env.BASE_API_URL;

// 닉네임 중복 검사
export async function MemberNicknameCheck(data: MemberNickNameType) {
  const URI = `${API_SERVER}/${PREFIX}/v1/members/check-nickname`;

  // console.log(data);
  try {
    const res: Response = await fetch(URI, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(data),
      cache: "no-cache",
    });

    if (!res.ok) {
      // // // console.error(
      // `[닉네임 중복 검사 실패] 상태 코드: ${res.status}, 메시지: ${res.statusText}`;
      // // );
      return {
        isSuccess: false,
        message: `API 요청 실패: ${res.status} ${res.statusText}`,
      };
    }

    const responseData = (await res.json()) as CommonRes<MemberNickNameType>;

    // console.log(" 응답 데이터:", responseData);

    // console.log("뭐오는지?", responseData);
    // console.log("뭐오는지?", responseData.result);
    // console.log("뭐오는지?", responseData.isSuccess);
    return responseData;
  } catch (error) {
    // 에러 메시지를 반환하여 호출자가 처리할 수 있도록 수정
    return {
      isSuccess: false,
      message: "닉네임 중복 검사 중 에러가 발생했습니다.",
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

// 닉네임 조회
export async function getMemberNickName() {
  const memberUuid = await getSessionMemberUuid();
  const URI = `${API_SERVER}/${PREFIX}/v1/members/${memberUuid}/nickname`;

  try {
    const headers = await getHeaders();

    const res: Response = await fetch(URI, {
      headers,
      method: "GET",
      cache: "no-cache",
    });

    if (!res.ok) {
      throw new Error(`API call failed with status ${res.status}`);
    }

    const resnickname = (await res.json()) as CommonRes<CheckNickNameType>;

    return resnickname;
  } catch (error) {
    // 사용자 친화적인 로그 메시지
    // console.error("Failed to fetch member nickname. Please try again later.");
    throw new Error("Error fetching member nickname.");
  }
}
