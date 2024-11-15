import type { Hashtag, Media } from "../contents";

export interface CreateFeedType {
  memberUuid: string;
  title: string;
  content: string;
  categoryId: number;
  hashtags: Hashtag[];
  mediaList: Media[];
}