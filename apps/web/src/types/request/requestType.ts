export interface FeedHashtag {
  name: string; // 해시태그 이름
}

export interface MediaAsset {
  mediaUrl: string; // 미디어 URL
  description: string; // 설명
}

export interface MediaAssets {
  IMAGE?: MediaAsset; // 선택적: 이미지 자산
  VIDEO_THUMBNAIL?: MediaAsset; // 선택적: 비디오 썸네일
  STREAMING_360?: MediaAsset; // 선택적: 360p 스트리밍
  STREAMING_540?: MediaAsset; // 선택적: 540p 스트리밍
  STREAMING_720?: MediaAsset; // 선택적: 720p 스트리밍
  VIDEO_MP4?: MediaAsset; // 선택적: MP4 비디오 파일
}

export interface Media {
  mediaUuid: string; // 미디어 UUID
  mediaType: "IMAGE" | "VIDEO"; // 미디어 유형
  assets: MediaAssets; // 미디어 자산
}

export interface CreateFeedType {
  memberUuid: string; // 회원 UUID
  title: string; // 피드 제목
  content: string; // 피드 내용
  categoryName: string; // 카테고리 이름 (일반 문자열)
  visibility: "VISIBLE" | "HIDDEN"; // 공개 여부
  hashtags: FeedHashtag[]; // 해시태그 목록
  mediaList: Media[]; // 미디어 목록
}
