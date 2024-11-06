"use client";
import Image from "next/image";
import React, { useState } from "react";

function ImageInput() {
  const [images, setImages] = useState<string[]>([]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const imageUrls = Array.from(files).map((file) =>
        URL.createObjectURL(file),
      );
      setImages(imageUrls); // 선택한 이미지 URL을 상태에 저장
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <label htmlFor="imageUpload" className="font-bold">
        Upload Images
      </label>
      <input
        type="file"
        id="imageUpload"
        multiple
        accept="image/*"
        onChange={handleImageChange}
        className="py-2"
      />
      <div className="flex gap-4 flex-wrap mt-4">
        {images.map((imageUrl) => (
          <div key={imageUrl} className="relative">
            <Image
              src={imageUrl}
              alt={`Preview ${imageUrl + 1}`}
              className="w-32 h-32 object-cover rounded-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageInput;
