import type { UseFormSetValue } from "react-hook-form";
import Image from "next/image";
import type { FormData } from "../organisms/FeedForm"; // FeedForm 위치에 맞게 수정하세요

interface ImagesInputProps {
  images: File[];
  setValue: UseFormSetValue<FormData>;
  error?: { message?: string };
}

function ImagesInput({ images, setValue, error }: ImagesInputProps) {
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length + images.length <= 5) {
      setValue("images", [...images, ...files]);
    }
  };

  return (
    <div>
      <label htmlFor="img" className="block text-sm font-bold">
        이미지 업로드
      </label>
      <input
        id="img"
        type="file"
        multiple
        onChange={handleImageChange}
        className="w-full px-3 py-2 border rounded"
      />
      <div className="grid grid-cols-5 gap-2 mt-2">
        {images.slice(0, 10).map((image) => (
          <div key={image.name} className="w-full h-24">
            <Image
              width={100}
              height={100}
              src={URL.createObjectURL(image)}
              alt={`preview-${image.name}`}
              className="w-full h-full object-cover rounded"
            />
          </div>
        ))}
      </div>
      {error ? <p className="text-red-500 text-sm">{error.message}</p> : null}
    </div>
  );
}

export default ImagesInput;
