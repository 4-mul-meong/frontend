"use server";
import type { MemberNickNameType } from "@/types/member";
import type { CommonRes } from "@/types/common";

const PREFIX = "member-service";
const API_SERVER = process.env.BASE_API_URL;

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
      // // console.error(
      //   `[닉네임 중복 검사 실패] 상태 코드: ${res.status}, 메시지: ${res.statusText}`
      // );
      return {
        isSuccess: false,
        message: `API 요청 실패: ${res.status} ${res.statusText}`,
      };
    }

    const responseData = (await res.json()) as CommonRes<MemberNickNameType>;

    // console.log(" [닉네임 중복 검사 성공]");
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
