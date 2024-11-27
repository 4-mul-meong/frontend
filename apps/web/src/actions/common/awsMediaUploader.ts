"use client";

let videoUploaded = false; // 전역 변수로 비디오 업로드 상태를 추적

async function uploadFileToS3(file: File, folder = "") {
  // 비디오 파일 업로드 제한 확인
  if (file.type.startsWith("video/") && videoUploaded) {
    throw new Error("비디오는 하나만 업로드할 수 있습니다.");
  }

  // 파일 크기 제한: 25MB 이하
  const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25MB
  if (file.size > MAX_FILE_SIZE) {
    throw new Error("파일 크기는 25MB 이하여야 합니다.");
  }

  // 영상 길이 제한: 1분 이하 (영상 파일일 경우만)
  if (file.type.startsWith("video/")) {
    const videoDuration = await getVideoDuration(file);
    if (videoDuration > 60) {
      // 60초 초과 시 에러
      throw new Error("영상 길이는 1분 이하여야 합니다.");
    }
  }

  const formData = new FormData();
  const fileName = folder ? `${folder}/${file.name}` : file.name; // 폴더가 있으면 파일 이름에 포함

  formData.append("fileName", fileName);
  formData.append("fileType", file.type);

  interface UploadResponse {
    imageUrl: string;
  }

  // FileReader를 사용하여 파일을 Base64로 변환
  const base64File = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Failed to read file"));
  });

  // Base64 데이터에서 파일 데이터만 추출
  const base64Data = base64File.split(",")[1];
  formData.append("fileContent", base64Data);

  // API 호출
  const res = await fetch("/api/s3/client/feed", {
    method: "POST",
    body: JSON.stringify({
      fileName,
      fileType: file.type,
      fileContent: base64Data,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to upload file");
  }

  const data = (await res.json()) as UploadResponse;

  // 비디오 업로드 상태 갱신
  if (file.type.startsWith("video/")) {
    videoUploaded = true;
  }

  // 콘솔에 URL 출력
  // console.log("Uploaded file URL:", data.imageUrl);

  return data.imageUrl;
}

// 영상 길이를 계산하는 함수
async function getVideoDuration(file: File): Promise<number> {
  return new Promise((resolve, reject) => {
    const videoElement = document.createElement("video");
    videoElement.preload = "metadata";

    videoElement.onloadedmetadata = () => {
      window.URL.revokeObjectURL(videoElement.src); // 메모리 정리
      resolve(videoElement.duration); // 영상 길이(초 단위) 반환
    };

    videoElement.onerror = () => {
      reject(new Error("Failed to load video metadata"));
    };

    videoElement.src = URL.createObjectURL(file); // 로컬 파일 경로 생성
  });
}

async function deleteFileFromS3(fileUrl: string, fileType: string) {
  const res = await fetch("/api/s3/client/feed", {
    method: "DELETE",
    body: JSON.stringify({
      fileUrl,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to delete file");
  }

  // 비디오 삭제 시 업로드 상태 초기화
  if (fileType.startsWith("video/")) {
    videoUploaded = false;
  }

  return true;
}

export { uploadFileToS3, deleteFileFromS3 };
