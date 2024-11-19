import type { CommonRes, Pagination } from "@/types/common";
import { commonPaginationRes, commonRes } from "@/types/common/dummy";
import type { Feed } from "@/types/contents";
import type {
  CreateFeedType,
  FeedHashtag,
  FeedMedia,
} from "@/types/request/requestType";

const API_SERVER = process.env.JSON_SERVER;
const BASE_API_URL = process.env.BASE_API_URL;

interface GetAllFeedParam {
  pageSize: number;
  pageNo: number;
}

export async function getAllFeed(
  { pageSize, pageNo }: GetAllFeedParam = { pageSize: 3, pageNo: 0 },
): Promise<Pagination<Feed>> {
  const res: Response = await fetch(`${API_SERVER}/feeds`, {
    cache: "no-cache",
  });

  const feeds = (await res.json()) as Feed[];

  // const {isSuccess, result} = await res.json() as CommonPaginationRes<Feed>;
  const { isSuccess, result } = commonPaginationRes({
    content: feeds,
    pageSize,
    pageNo,
  });

  if (!isSuccess) {
    throw Error();
  }

  // eslint-disable-next-line no-console -- for test
  console.log(result);
  return result;
}

export async function getFeed(feedUuid: string): Promise<Feed> {
  const res: Response = await fetch(
    `${API_SERVER}/feeds?feedUuid=${feedUuid}`,
    {
      cache: "no-cache",
    },
  );

  const feed = (await res.json()) as Feed[];

  // const {isSuccess, result} = await res.json() as CommonPaginationRes<Feed>;
  const { isSuccess, result } = commonRes(feed);

  if (!isSuccess) {
    throw Error();
  }

  // eslint-disable-next-line no-console -- for test
  console.log(result);
  return result[0];
}

// -- feed form
export async function createFeed(feedFormData: FormData): Promise<boolean> {
  // console.log("feedFormData:", feedFormData);

  try {
    // 환경 변수 확인
    if (!BASE_API_URL) {
      throw new Error("BASE_API_URL is not defined.");
    }

    // FormData에서 값 추출 및 가공
    const memberUuid = feedFormData.get("memberUuid") || "unknown";
    const title = feedFormData.get("title") || "";
    const content = feedFormData.get("content") || "";
    const categoryId = Number(feedFormData.get("categoryId")) || 0;

    // tags를 해시태그 배열로 변환
    const tags = feedFormData.get("tags") as string; // 'ㅁㄴㅇㄴㅁㅇ'
    const hashtags: FeedHashtag[] = tags
      ? tags.split(",").map((tag) => ({ name: tag.trim() }))
      : [];

    // feedImg를 미디어 리스트로 변환
    const feedImg = feedFormData.get("feedImg");
    const mediaList: FeedMedia[] =
      feedImg && feedImg instanceof File
        ? [
            {
              mediaUrl: "https://example.com/uploaded-image-path", // 파일 업로드 후 URL 경로를 지정
              mediaType: "IMAGE",
              description: feedImg.name,
            },
          ]
        : [];

    // payload 생성
    const payload: CreateFeedType = {
      memberUuid: memberUuid as string,
      title: title as string,
      content: content as string,
      categoryId,
      hashtags,
      mediaList,
    };

    // console.log("Payload to be sent:", JSON.stringify(payload, null, 2));

    // API 호출
    const res = await fetch(`${BASE_API_URL}/feed-service/auth/v1/feeds`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const { isSuccess } = (await res.json()) as CommonRes<null>;
    // console.log("API Result:", isSuccess);

    return isSuccess;
  } catch (error) {
    // console.error("Request failed:", error);
    return false;
  }
}
