"use client";

import Swal from "sweetalert2";

let videoUploaded = false; // 전역 변수로 비디오 업로드 상태를 추적

async function uploadFileToS3(file: File, folder = ""): Promise<string | null> {
  try {
    // 비디오 파일 업로드 제한 확인
    if (file.type.startsWith("video/") && videoUploaded) {
      await Swal.fire({
        icon: "warning",
        title: "업로드 제한",
        text: "비디오는 하나만 업로드할 수 있습니다.",
      });
      return null;
    }

    // 파일 크기 제한: 25MB 이하
    const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25MB
    if (file.size > MAX_FILE_SIZE) {
      await Swal.fire({
        icon: "error",
        title: "파일 크기 초과",
        text: "파일 크기는 25MB 이하여야 합니다.",
      });
      return null;
    }

    // 영상 길이 제한: 1분 이하 (영상 파일일 경우만)
    if (file.type.startsWith("video/")) {
      const videoDuration = await getVideoDuration(file);
      if (videoDuration > 60) {
        await Swal.fire({
          icon: "error",
          title: "영상 길이 초과",
          text: "영상 길이는 1분 이하여야 합니다.",
        });
        return null;
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
      reader.onerror = () => reject(new Error("파일 읽기 실패"));
    });

    // Base64 데이터에서 파일 데이터만 추출
    const base64Data = base64File.split(",")[1];

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
      throw new Error("파일 업로드 실패");
    }

    // 응답을 명시적으로 타입 선언
    const data = (await res.json()) as UploadResponse;

    // 업로드 성공 메시지
    await Swal.fire({
      icon: "success",
      title: "업로드 성공",
      text: "파일이 성공적으로 업로드되었습니다.",
    });

    // 비디오 업로드 상태 갱신
    if (file.type.startsWith("video/")) {
      videoUploaded = true;
    }

    return data.imageUrl; // 업로드된 파일 URL 반환
  } catch (error) {
    // SweetAlert2로 에러 메시지 표시
    await Swal.fire({
      icon: "error",
      title: "업로드 실패",
      text:
        error instanceof Error
          ? error.message
          : "알 수 없는 에러가 발생했습니다.",
    });
    return null;
  }
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
      reject(new Error("영상 메타데이터를 로드할 수 없습니다."));
    };

    videoElement.src = URL.createObjectURL(file); // 로컬 파일 경로 생성
  });
}

async function deleteFileFromS3(
  fileUrl: string,
  fileType: string,
): Promise<boolean> {
  try {
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
      throw new Error("파일 삭제 실패");
    }

    // 비디오 삭제 시 업로드 상태 초기화
    if (fileType.startsWith("video/")) {
      videoUploaded = false;
    }

    // SweetAlert2로 성공 메시지 표시
    await Swal.fire({
      icon: "success",
      title: "삭제 성공",
      text: "파일이 성공적으로 삭제되었습니다.",
    });

    return true;
  } catch (error) {
    // SweetAlert2로 에러 메시지 표시
    await Swal.fire({
      icon: "error",
      title: "삭제 실패",
      text:
        error instanceof Error
          ? error.message
          : "알 수 없는 에러가 발생했습니다.",
    });
    return false;
  }
}

export { uploadFileToS3, deleteFileFromS3 };
