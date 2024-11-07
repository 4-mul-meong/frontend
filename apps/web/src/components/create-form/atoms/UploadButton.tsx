import { DownloadImage } from "@/components/common/icons";

interface UploadButtonProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function UploadButton({ onChange }: UploadButtonProps) {
  return (
    <label
      htmlFor="imageform"
      className="flex items-center justify-center gap-[12px] w-full h-[110px] border-4 border-dashed border-gray-300 rounded-2xl bg-[#F1F4F9] cursor-pointer"
    >
      <DownloadImage />
      <span>Upload attachment</span>
      <input
        type="file"
        id="imageform"
        accept="image/*"
        multiple
        className="hidden"
        onChange={onChange}
      />
    </label>
  );
}

export default UploadButton;
