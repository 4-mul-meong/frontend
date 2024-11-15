import type { CommonRes, Pagination } from '@/types/common';
import { commonPaginationRes, commonRes } from '@/types/common/dummy';
import type { Feed } from '@/types/contents';
import { CreateFeedType } from '@/types/request/requestType';

const API_SERVER = process.env.JSON_SERVER;
const BASE_API_URL = process.env.BASE_API_URL;

interface GetAllFeedParam {
  pageSize: number;
  pageNo: number;
}

export async function getAllFeed(
  { pageSize, pageNo }: GetAllFeedParam = { pageSize: 3, pageNo: 0 }
): Promise<Pagination<Feed>> {
  const res: Response = await fetch(`${API_SERVER}/feeds`, {
    cache: 'no-cache',
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
      cache: 'no-cache',
    }
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

export async function createFeed(feedFormData: FormData): Promise<boolean> {
  console.log('feedFormData:', feedFormData);
  const payload = feedFormData as unknown as CreateFeedType;

  const res = await fetch(`${BASE_API_URL}/feed-service/auth/v1/feeds`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const { isSuccess, result } = (await res.json()) as CommonRes<null>;
  // eslint-disable-next-line no-console -- for test
  console.log(result);

  return isSuccess;
}
