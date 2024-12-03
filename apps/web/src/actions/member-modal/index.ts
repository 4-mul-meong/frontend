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
    // console.error("Failed to fetch member nickname. Please try again later.");
    throw new Error("Error fetching member nickname.");
  }
}

//닉네임 수정

export async function UpdateMemberNickname(nickname: string) {
  const memberUuid = await getSessionMemberUuid();
  const URI = `${API_SERVER}/${PREFIX}/v1/members/${memberUuid}/nickname`;

  try {
    const headers = await getHeadersWithAccessToken();
    // console.log("API 호출 시작");
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

    // HTTP 상태 코드 및 메시지 확인
    // console.log("HTTP 상태 코드:", res.status);
    // console.log("HTTP 상태 메시지:", res.statusText);

    // 응답 본문 텍스트 확인 (JSON 파싱 전)
    const rawResponseText = await res.text();
    // console.log("응답 원본 텍스트:", rawResponseText);

    // JSON 응답 파싱
    if (!res.ok) {
      throw new Error(
        `API 호출 실패 - 상태 코드: ${res.status}, 상태 메시지: ${res.statusText}`,
      );
    }

    const resupdate = JSON.parse(
      rawResponseText,
    ) as CommonRes<UpdateNickNameReq>;

    // 응답 데이터 출력
    // console.log("응답 데이터 (파싱된 JSON):", resupdate);
    // console.log("닉네임 업데이트 성공:", resupdate.result);

    return resupdate;
  } catch (error) {
    // 에러 출력
    // console.error("닉네임 업데이트 중 오류 발생:", error);
    if (error instanceof Error) {
      // console.error("오류 메시지:", error.message);
    }
    throw new Error("닉네임 업데이트 중 오류가 발생했습니다.");
  }
}
