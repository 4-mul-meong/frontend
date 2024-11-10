import React from "react";
import { DownloadImage } from "@/components/common/icons";

interface UploadButtonProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function UploadButton({ onChange }: UploadButtonProps) {
  return (
    <label
      htmlFor="img"
      className="w-full flex items-center justify-center border-dotted border-2 border-gray-300 p-4 rounded-xl bg-[#F1F4F9] h-[110px]"
    >
      <DownloadImage />
      <span className="text-blue-500 font-medium">Upload attachment</span>
      <input
        id="img"
        type="file"
        multiple
        onChange={onChange}
        className="hidden"
      />
    </label>
  );
}

export default UploadButton;
