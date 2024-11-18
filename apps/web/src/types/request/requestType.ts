export interface CreateFeedType {
  memberUuid: string;
  title: string;
  content: string;
  categoryId: number;
  hashtags: Hashtag[];
  mediaList: Media[];
}

export interface Media {
  mediaId: string;
  mediaType: string;
  mediaUrl: string;
}

export interface Hashtag {
  name: string;
}
