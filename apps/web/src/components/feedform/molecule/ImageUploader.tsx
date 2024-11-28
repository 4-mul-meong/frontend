"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  DeleteButton,
  DownloadImage,
  PushImage,
} from "@/components/common/icons";
import {
  deleteFileFromS3,
  uploadFileToS3,
} from "@/actions/common/awsMediaUploader";

function ImageUploader() {
  const [imagePreviews, setImagePreviews] = useState<
    { preview: string | null; s3Url: string | null; fileType: string | null }[]
  >([
    { preview: null, s3Url: null, fileType: null },
    { preview: null, s3Url: null, fileType: null },
    { preview: null, s3Url: null, fileType: null },
    { preview: null, s3Url: null, fileType: null },
  ]); // 4개의 슬롯 초기화

  const captureVideoFrame = (video: HTMLVideoElement): Promise<string> => {
    return new Promise((resolve) => {
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg"));
      }
    });
  };

  const handleFeedImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { files } = e.target;
    if (!files || files.length === 0) return;

    const file = files[0];
    const fileType = file.type;
    const s3Url = await uploadFileToS3(file, "feed");

    if (!s3Url) return;

    let preview = "";

    if (fileType.startsWith("video")) {
      const video = document.createElement("video");
      video.src = URL.createObjectURL(file);
      video.currentTime = 0.5; // 첫 번째 프레임 캡처
      video.onloadeddata = async () => {
        preview = await captureVideoFrame(video);
        setImagePreviews((prev) => {
          const index = prev.findIndex((item) => item.preview === null); // 첫 번째 빈 슬롯 찾기
          if (index === -1) return prev; // 빈 슬롯이 없으면 그대로 반환
          const updated = [...prev];
          updated[index] = { preview, s3Url, fileType }; // 파일 타입 포함
          return updated;
        });
      };
    } else if (fileType.startsWith("image")) {
      preview = URL.createObjectURL(file);
      setImagePreviews((prev) => {
        const index = prev.findIndex((item) => item.preview === null); // 첫 번째 빈 슬롯 찾기
        if (index === -1) return prev; // 빈 슬롯이 없으면 그대로 반환
        const updated = [...prev];
        updated[index] = { preview, s3Url, fileType }; // 파일 타입 포함
        return updated;
      });
    }
  };

  const handleDeleteImage = async (
    s3Url: string | null,
    fileType: string | null,
    index: number,
  ) => {
    try {
      if (s3Url && fileType) {
        const res = await deleteFileFromS3(s3Url, fileType);
        if (!res) throw new Error("Failed to delete from S3");
      }

      // 이미지 삭제 후 해당 슬롯 비우기
      setImagePreviews((prev) => {
        const updated = [...prev];
        updated[index] = { preview: null, s3Url: null, fileType: null }; // 슬롯 초기화
        return updated;
      });
    } catch (error) {
      // console.error("Error deleting image:", error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* 업로드 라벨 */}
      <label
        htmlFor="feedImg"
        className="items-center gap-2 w-full flex justify-center border-dotted border-2 border-gray-300 p-4 rounded-xl bg-[#F1F4F9] h-[110px] cursor-pointer"
      >
        <DownloadImage />
        <span className="text-gray-600 text-[16px]">Upload attachment</span>
      </label>

      {/* 파일 입력 */}
      <input
        type="file"
        id="feedImg"
        name="feedImg"
        className="hidden"
        accept="image/*,video/*"
        multiple
        onChange={(e) => {
          void handleFeedImage(e);
        }}
      />

      {/* 이미지 미리보기 */}
      <div className="flex gap-4 mt-4 flex-wrap w-full justify-center">
        {imagePreviews.map(({ preview, s3Url, fileType }, index) => (
          <div
            key={s3Url || `placeholder-${index}`}
            className="relative w-[120px] h-[150px] bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 border-dashed border-2 overflow-hidden"
          >
            {preview ? (
              // 이미지 또는 비디오 미리보기
              <>
                <Image
                  src={preview}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-full object-cover"
                  width={150}
                  height={120}
                />
                {/* 삭제 버튼 */}
                <button
                  type="button"
                  onClick={() => void handleDeleteImage(s3Url, fileType, index)} // fileType 전달
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white opacity-0 hover:opacity-100 transition-opacity"
                >
                  <DeleteButton />
                </button>
              </>
            ) : (
              // 이미지가 없는 경우
              <PushImage />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageUploader;
