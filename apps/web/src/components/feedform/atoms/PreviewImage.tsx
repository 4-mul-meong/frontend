import React from "react";
import Image from "next/image";
import { DeleteButton } from "@/components/common/icons";

interface PreviewImageProps {
  url: string;
  name: string;
  index: number;
  onDelete: (url: string, index: number) => void;
}

function PreviewImage({ url, index, onDelete }: PreviewImageProps) {
  return (
    <div className="relative w-[120px] h-[150px] flex items-center justify-center border border-gray-300 rounded-lg overflow-hidden">
      <Image
        width={120}
        height={150}
        src={url}
        alt={`preview-${index}`}
        className="rounded-lg object-cover"
        style={{ width: "100%", height: "100%" }}
      />
      <button
        type="button"
        onClick={() => onDelete(url, index)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white rounded-full p-1"
      >
        <DeleteButton />
      </button>
    </div>
  );
}

export default PreviewImage;
