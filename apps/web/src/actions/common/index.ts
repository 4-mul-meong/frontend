"use server";

import { revalidateTag } from "next/cache";
import { getServerSession } from "next-auth";
import type { ResponseType, ResultType } from "@/types/common";
import { options } from "@/app/api/auth/[...nextauth]/authOption";
import type { MemberSignInResType } from "@/types/member";

interface ProcessResponseParam {
  res: Response;
  revalidatedTags?: string | string[];
}

export async function processResponse<T, IsPagination extends boolean>({
  res,
  revalidatedTags,
}: ProcessResponseParam) {
  const { isSuccess, result, ..._rest } = (await res.json()) as ResponseType<
    T,
    IsPagination
  >;

  if (!isSuccess) {
    throw Error(result as string);
  }

  if (revalidatedTags) {
    if (Array.isArray(revalidatedTags)) {
      revalidatedTags.map(revalidateTag);
    } else {
      revalidateTag(revalidatedTags);
    }
  }

  return result as ResultType<T, IsPagination>;
}

export async function getSessionMemberUuid() {
  const session = await getServerSession(options);
  if (session?.user) {
    const { memberUuid } = session.user as MemberSignInResType;
    return memberUuid;
  }
  return "";
}

export async function getHeaders() {
  const headers = { "Content-Type": "application/json" };

  return {
    ...headers,
    "Member-Uuid": await getSessionMemberUuid(),
  };
}

export async function getHeadersWithAccessToken() {
  const headers = { "Content-Type": "application/json" };
  const session = await getServerSession(options);
  if (session?.user) {
    const { memberUuid, accessToken } = session.user as MemberSignInResType;
    return {
      ...headers,
      "Member-Uuid": memberUuid,
      Authorization: `Bearer ${accessToken}`,
    };
  }
  return headers;
}
