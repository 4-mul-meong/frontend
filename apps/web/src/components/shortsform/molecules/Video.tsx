"use client";
import React, { useRef, useState } from "react";
import { ShortsDelete } from "@/components/common/icons";

function Video() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [videoURL, setVideoURL] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("video/")) {
      const url = URL.createObjectURL(file);
      setVideoURL(url);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      handleClick();
    }
  };

  return (
    <div className="mt-6 border-2 border-dashed border-[#C0D3DF] bg-[#F7FAFC] rounded-lg p-8 cursor-pointer">
      <input
        ref={fileInputRef}
        className="hidden"
        accept="video/*"
        type="file"
        onChange={handleFileChange}
      />
      <div
        className="flex flex-col items-center"
        onClick={handleClick}
        onKeyPress={handleKeyPress}
        tabIndex={0}
        role="button"
        aria-label="Upload video"
      >
        <div className="text-[#47D0BF] text-4xl mb-4">
          <ShortsDelete />
        </div>
        <p className="text-black text-[18px]">Upload new product</p>
        <p className="text-[13px] text-[#809FB8]">Drag and drop here</p>
      </div>

      {/* 동영상 미리보기 */}
      {videoURL ? (
        <div className="mt-4">
          <video controls src={videoURL} className="w-full rounded-lg">
            <track
              kind="captions"
              src=""
              srcLang="en"
              label="English"
              default
            />
          </video>
        </div>
      ) : null}
    </div>
  );
}

export default Video;
