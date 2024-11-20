export interface CreateFeedType {
  memberUuid: string; // 회원 UUID
  title: string; // 피드 제목
  content: string; // 피드 내용
  categoryId: number; // 카테고리 ID
  hashtags: FeedHashtag[]; // 해시태그 목록
  mediaList: FeedMedia[]; // 미디어 목록
}

export interface FeedHashtag {
  name: string; // 해시태그 이름
}

export interface FeedMedia {
  mediaType: "IMAGE" | "VIDEO"; // 미디어 타입 (e.g., "IMAGE", "VIDEO")
  mediaUrl: string; // 미디어 URL
  description: string; // 미디어 설명
}
