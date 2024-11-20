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
    { preview: string | null; s3Url: string | null }[]
  >([
    { preview: null, s3Url: null },
    { preview: null, s3Url: null },
    { preview: null, s3Url: null },
    { preview: null, s3Url: null },
  ]); // 4개의 홀더 초기화

  const handleFeedImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { files } = e.target;
    if (!files || files.length === 0) return;

    const file = files[0];
    const s3Url = await uploadFileToS3(file, "feed");

    // console.log("Uploaded S3 URL:", s3Url);

    if (!s3Url) return;

    // 비어 있는 슬롯에 이미지 추가
    setImagePreviews((prev) => {
      const index = prev.findIndex((item) => item.preview === null); // 첫 번째 빈 슬롯 찾기
      if (index === -1) return prev; // 빈 슬롯이 없으면 그대로 반환
      const updated = [...prev];
      updated[index] = { preview: URL.createObjectURL(file), s3Url }; // 빈 슬롯에 이미지 추가
      return updated;
    });
  };

  const handleDeleteImage = async (s3Url: string | null, index: number) => {
    try {
      if (s3Url) {
        const res = await deleteFileFromS3(s3Url);
        if (!res) throw new Error("Failed to delete from S3");
      }
      // 이미지 삭제 후 해당 슬롯 비우기
      setImagePreviews((prev) => {
        const updated = [...prev];
        updated[index] = { preview: null, s3Url: null }; // 슬롯 초기화
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
        onChange={(e) => {
          void handleFeedImage(e);
        }}
      />

      {/* 이미지 미리보기 */}
      <div className="flex gap-4 mt-4 flex-wrap w-full justify-center">
        {imagePreviews.map(({ preview, s3Url }, index) => (
          <div
            key={s3Url || `placeholder-${index}`} // s3Url을 사용하고, 없는 경우 고유 플레이스홀더 ID 생성
            className="relative w-[120px] h-[150px] bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 border-dashed border-2 overflow-hidden"
          >
            {preview ? (
              // 이미지가 있는 경우
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
                  onClick={() => void handleDeleteImage(s3Url, index)}
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
