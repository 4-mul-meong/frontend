export interface CreateFeedType {
  memberUuid: string;
  title: string;
  content: string;
  categoryId: number;
  hashtags: Hashtag[];
  mediaList: Media[];
}

export interface Media {
  mediaId: string; // 백엔드에서 따로 uuid 부여하지 않기로 했다고 함
  mediaType: string;
  mediaUrl: string;
}

export interface Hashtag {
  name: string;
}
