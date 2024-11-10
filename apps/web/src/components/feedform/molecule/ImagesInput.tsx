"use client";
import React, { useMemo, useState } from "react";
import type { UseFormSetValue } from "react-hook-form";
import { PushImage } from "@/components/common/icons";
import type { FormData } from "../organisms/FeedForm";
import UploadButton from "../atoms/UploadButton";
import PreviewImage from "../atoms/PreviewImage";

interface ImagesInputProps {
  images: File[];
  setValue: UseFormSetValue<FormData>;
  error?: { message?: string };
}

interface Preview {
  url: string;
  key: string;
  name: string;
}

function ImagesInput({ images, setValue, error }: ImagesInputProps) {
  const [previewUrls, setPreviewUrls] = useState<Preview[]>([]);
  const INITIAL_PLACEHOLDERS = 4;
  const MAX_UPLOAD_COUNT = 10;

  const placeholderKeys = useMemo(
    () =>
      Array.from({ length: INITIAL_PLACEHOLDERS }, () =>
        Math.random().toString(36).substr(2, 9),
      ),
    [],
  );

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files ? Array.from(event.target.files) : [];
    const newFiles = files.slice(0, MAX_UPLOAD_COUNT - images.length);
    const newPreviews = newFiles.map((file) => ({
      url: URL.createObjectURL(file),
      key: file.name || String(file.lastModified),
      name: file.name,
    }));

    setPreviewUrls((prevUrls) => [...prevUrls, ...newPreviews]);
    setValue("images", [...images, ...newFiles]);

    return () =>
      newPreviews.forEach((preview) => URL.revokeObjectURL(preview.url));
  };

  const handleDelete = (url: string, index: number) => {
    const updatedPreviews = previewUrls.filter(
      (preview) => preview.url !== url,
    );
    setPreviewUrls(updatedPreviews);

    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setValue("images", updatedImages);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* 파일 업로드 버튼 */}
      <UploadButton onChange={handleImageChange} />

      {/* 이미지 미리보기 및 플레이스 홀더 */}
      <div className="flex flex-wrap gap-4 mt-4 justify-center">
        {previewUrls.map((preview, index) => (
          <PreviewImage
            key={preview.key}
            url={preview.url}
            name={preview.name}
            index={index}
            onDelete={handleDelete}
          />
        ))}
        {/* 플레이스 홀더 */}
        {Array.from({ length: INITIAL_PLACEHOLDERS - previewUrls.length }).map(
          (_, index) => (
            <div
              key={placeholderKeys[index]}
              className="w-[120px] h-[150px] bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 border-dashed border-2"
            >
              <PushImage />
            </div>
          ),
        )}
      </div>

      {/* 파일 이름 리스트 */}
      <div className="mt-4">
        {previewUrls.map((preview) => (
          <div key={preview.key} className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M8 2a2 2 0 00-2 2v12a2 2 0 002 2h4a2 2 0 002-2V8l-4-4H8zm2 5V3.5L13.5 7H10z" />
            </svg>
            <span className="text-gray-700 text-sm">{preview.name}</span>
          </div>
        ))}
      </div>

      {/* 에러 메시지 */}
      {error ? (
        <p className="text-red-500 text-sm mt-2">{error.message}</p>
      ) : null}
    </div>
  );
}

export default ImagesInput;
