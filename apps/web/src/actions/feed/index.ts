import { randomUUID } from "node:crypto";
import type { CommonRes, Pagination } from "@/types/common";
import { commonPaginationRes, commonRes } from "@/types/common/dummy";
import type { Feed } from "@/types/contents";
import type {
  CreateFeedType,
  FeedHashtag,
  Media,
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
// 피드폼
export async function createFeed(feedFormData: FormData): Promise<boolean> {
  try {
    // 환경 변수 확인
    if (!BASE_API_URL) {
      throw new Error("BASE_API_URL is not defined.");
    }

    // FormData에서 값 추출 및 가공
    const memberUuid = (feedFormData.get("memberUuid") as string) || "unknown";
    const title = (feedFormData.get("title") as string) || "";
    const content = (feedFormData.get("content") as string) || "";
    const categoryName = (feedFormData.get("categoryName") as string) || "";

    // tags를 해시태그 배열로 변환
    const tags = feedFormData.get("tags") as string;
    const hashtags: FeedHashtag[] = tags
      ? tags.split(",").map((tag) => ({ name: tag.trim() }))
      : [];

    const feedImgs = feedFormData.getAll("feedImg") as File[];
    const mediaList: Media[] = [];

    feedImgs.forEach((file) => {
      const mediaUuid = randomUUID(); // 랜덤 UUID 생성

      if (file.type.startsWith("image/")) {
        mediaList.push({
          mediaUuid, // 생성된 UUID 사용
          mediaType: "IMAGE",
          assets: {
            IMAGE: {
              mediaUrl: `image/${mediaUuid}.jpg`, // 경로 지정
              description: file.name,
            },
          },
        });
      } else if (file.type.startsWith("video")) {
        mediaList.push({
          mediaUuid, // 생성된 UUID 사용
          mediaType: "VIDEO",
          assets: {
            VIDEO_THUMBNAIL: {
              mediaUrl: `video/processed/${mediaUuid}/Thumbnails/${mediaUuid}.0000000.jpg`,
              description: `${file.name} thumbnail`,
            },
            STREAMING_360: {
              mediaUrl: `video/processed/${mediaUuid}/HLS/${mediaUuid}_360.m3u8`,
              description: `${file.name} 360p`,
            },
            STREAMING_540: {
              mediaUrl: `video/processed/${mediaUuid}/HLS/${mediaUuid}_540.m3u8`,
              description: `${file.name} 540p`,
            },
            STREAMING_720: {
              mediaUrl: `video/processed/${mediaUuid}/HLS/${mediaUuid}_720.m3u8`,
              description: `${file.name} 720p`,
            },
            VIDEO_MP4: {
              mediaUrl: `video/processed/${mediaUuid}/MP4/${mediaUuid}.mp4`,
              description: file.name,
            },
          },
        });
      }
    });

    // payload 생성
    const payload: CreateFeedType = {
      memberUuid,
      title,
      content,
      categoryName, // 카테고리 이름
      visibility: "VISIBLE", // 초기 "VISIBLE"로 설정
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

    // API 응답 처리
    const { isSuccess } = (await res.json()) as CommonRes<null>;
    // console.log(isSuccess);
    return isSuccess;
  } catch (error) {
    // console.error("Request failed:", error);
    return false;
  }
}
