import Image from "next/image";
import { DeleteButton } from "@/components/common/icons";

interface ImagePreviewProps {
  url: string;
  onDelete: (url: string) => void;
}

function ImagePreview({ url, onDelete }: ImagePreviewProps) {
  return (
    <div className="relative w-[110px] h-[140px]">
      <Image
        src={url}
        alt="Selected preview"
        className="object-cover rounded-lg"
        width={120}
        height={150}
        style={{ objectFit: "cover" }}
      />
      <button
        type="button"
        onClick={() => onDelete(url)}
        className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white opacity-0 hover:opacity-100 transition-opacity rounded-lg"
      >
        <DeleteButton />
      </button>
    </div>
  );
}

export default ImagePreview;
