"use client";
import { useState } from "react";
import ShortsButton from "@/components/common/icons/ShortsButton";
import ShortsText from "../atoms/ShortsText";

function VideoUploader() {
  const [videoPreview, setVideoPreview] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setVideoPreview(previewUrl);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {videoPreview ? (
        <div className="flex items-center justify-center w-full h-[550px] bg-black rounded-xl overflow-hidden">
          <video
            src={videoPreview}
            controls
            className="w-full h-full object-cover"
          >
            {/* 캡션 제공을 위한 track 태그 추가 */}
            <track
              kind="captions"
              src="captions.vtt" // 자막 파일 경로
              srcLang="en"
              label="English"
              default
            />
          </video>
        </div>
      ) : (
        <>
          <ShortsText />
          <label
            htmlFor="ShortsVideo"
            className="flex flex-col items-center gap-2 w-full justify-center border-dotted border-2 border-gray-300 p-4 rounded-xl bg-[#F1F4F9] h-[180px] cursor-pointer"
          >
            <ShortsButton />
            <span className="text-black text-[16px]">Upload attachment</span>
            <span className="text-gray-600 text-[13px]">
              Drag and drop here
            </span>
          </label>
        </>
      )}

      {/* 파일 입력 */}
      <input
        type="file"
        id="ShortsVideo"
        name="ShortsVideo"
        accept="video/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}

export default VideoUploader;
