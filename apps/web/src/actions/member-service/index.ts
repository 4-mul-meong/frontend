"use server";
import { getHeaders, processResponse } from "../common";

const API_SERVER = process.env.BASE_API_URL;
const PREFIX = "member-service";

export async function getMemberNickname({
  memberUuid,
}: {
  memberUuid: string;
}) {
  const URI = `${API_SERVER}/${PREFIX}/v1/members/${memberUuid}/nickname`;

  const res: Response = await fetch(URI, {
    headers: await getHeaders(),
    method: "GET",
    cache: "no-cache",
  });

  return processResponse<string, false>({ res });
}
