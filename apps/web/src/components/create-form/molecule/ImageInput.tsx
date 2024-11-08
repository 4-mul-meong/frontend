"use client";
import { useState, useMemo } from "react";
import { ImagePreview, PlaceHolder, UploadButton } from "../atoms";

// map 고유한 키 값 생성
interface Preview {
  url: string;
  key: string;
}

function ImageInput() {
  const [previewUrls, setPreviewUrls] = useState<Preview[]>([]);
  const INITIAL_PLACEHOLDERS = 4; // 고정 개수
  const MAX_UPLOAD_COUNT = 10; // 이미지 최대 개수

  // INITIAL_PLACEHOLDERS 배열 키 값 생성
  const placeholderKeys = useMemo(
    () =>
      Array.from({ length: INITIAL_PLACEHOLDERS }, () =>
        Math.random().toString(36).substr(2, 9),
      ),
    [],
  );

  // 이미지 미리보기 로직
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files);
      const newPreviewUrls = fileArray.map((file) => ({
        url: URL.createObjectURL(file), // 파일 객체를 메모리 URL로 변환
        key: file.name || String(file.lastModified),
      }));

      setPreviewUrls((prevUrls) =>
        [...prevUrls, ...newPreviewUrls].slice(0, MAX_UPLOAD_COUNT),
      );

      return () =>
        // 메모리 누수 방지 로직
        newPreviewUrls.forEach((preview) => URL.revokeObjectURL(preview.url));
    }
  };

  // 미리보기 삭제 로직
  const handleDelete = (url: string) => {
    setPreviewUrls((prevUrls) =>
      prevUrls.filter((preview) => preview.url !== url),
    );
  };

  return (
    <div className="flex flex-col items-center w-full">
      {/* 파일 업로드 */}
      <UploadButton onChange={handleImageChange} />

      <div className="py-4 flex gap-3 flex-wrap justify-between">
        {/* 고정 플레이스 값 */}
        {Array.from({ length: INITIAL_PLACEHOLDERS }).map((_, index) => {
          return index < previewUrls.length ? (
            <ImagePreview
              key={previewUrls[index].key}
              url={previewUrls[index].url}
              onDelete={handleDelete}
            />
          ) : (
            <PlaceHolder key={placeholderKeys[index]} />
          );
        })}
        {previewUrls.slice(INITIAL_PLACEHOLDERS).map(({ url, key }) => (
          <ImagePreview key={key} url={url} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}

export default ImageInput;
