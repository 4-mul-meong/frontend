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

// // 해시태그 타입
// export interface Hashtag {
//   name: string; // 해시태그 이름
// }

// // 미디어 자산 타입
// export interface MediaAsset {
//   mediaUrl: string; // 미디어 URL
//   description: string; // 미디어 설명
// }

// // 미디어 타입
// export interface Media {
//   mediaUuid: string; // 미디어 UUID
//   mediaType: "IMAGE" | "VIDEO"; // 미디어 타입 (IMAGE 또는 VIDEO)
//   assets: {
//     IMAGE?: MediaAsset; // 선택적: 이미지 자산
//     VIDEO_THUMBNAIL?: MediaAsset; // 선택적: 비디오 썸네일
//     STREAMING_360?: MediaAsset; // 선택적: 360p 스트리밍
//     STREAMING_540?: MediaAsset; // 선택적: 540p 스트리밍
//     STREAMING_720?: MediaAsset; // 선택적: 720p 스트리밍
//     VIDEO_MP4?: MediaAsset; // 선택적: MP4 비디오 파일
//   };
// }

// // 게시물 데이터 타입
// export interface CreateFeedType {
//   memberUuid: string; // 사용자 UUID
//   title: string; // 게시물 제목
//   content: string; // 게시물 내용
//   categoryId: number; // 카테고리 ID
//   visibility: "VISIBLE" | "HIDDEN"; // 공개 여부 (VISIBLE 또는 HIDDEN)
//   hashtags: Hashtag[]; // 해시태그 배열
//   mediaList: Media[]; // 미디어 리스트 배열
// }
