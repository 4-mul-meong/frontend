import React from "react";
import ShortsButton from "@/components/common/icons/ShortsButton";
import ShortsText from "../atoms/ShortsText";

function VideoUploader() {
  return (
    <div className="flex flex-col gap-6">
      <ShortsText />
      <label
        htmlFor="feedImg"
        className="flex flex-col items-center gap-2 w-full justify-center border-dotted border-2 border-gray-300 p-4 rounded-xl bg-[#F1F4F9] h-[180px] cursor-pointer"
      >
        <ShortsButton />
        <span className="text-black text-[16px]">Upload attachment</span>
        <span className="text-gray-600 text-[13px]">Drag and drop here</span>
      </label>

      {/* 파일 입력 */}
      <input type="file" id="feedImg" name="feedImg" className="hidden" />
    </div>
  );
}

export default VideoUploader;
