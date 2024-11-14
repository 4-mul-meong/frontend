// feedForm.tsx
"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { uploadFileToS3 } from "@/actions/common/awsMediaUploader";
import { DownloadImage, PushImage } from "@/components/common/icons";
import {
  CategoryInput,
  ContentInput,
  TagsInput,
  TitleInput,
} from "../molecule";

// Zod 유효성 검사 스키마에 category 추가
const formSchema = z.object({
  title: z
    .string()
    .min(1, "제목은 필수 항목입니다")
    .max(100, "제목은 100자 이하여야 합니다"),
  content: z
    .string()
    .min(1, "내용은 필수 항목입니다")
    .max(500, "내용은 500자 이하여야 합니다"),
  tags: z.array(z.string()).max(5, "태그는 최대 5개까지 입력할 수 있습니다"),
  images: z
    .array(z.instanceof(File))
    .max(4, "이미지는 최대 4개까지 업로드할 수 있습니다"),
  category: z.string().nonempty("카테고리를 선택하세요"), // 추가된 category 필드
});

// FormData 타입 정의에 category 포함
export type FormData = z.infer<typeof formSchema>;

function FeedForm() {
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      tags: [],
      images: [],
      category: "",
    },
  });

  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const tags = watch("tags");

  const handleFeedImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { files } = e.target;
    if (!files || files.length === 0) return;

    const file = files[0];
    const res = await uploadFileToS3(file, "feed");

    if (res) {
      setValue("images", [...watch("images"), file]);

      const previewUrl = URL.createObjectURL(file);
      setImagePreviews((prev) => [...prev, previewUrl].slice(0, 4));
    }
  };

  const onSubmit = async (data: FormData) => {
    await Promise.all(
      data.images.map((image) => uploadFileToS3(image, "feed")),
    );
    setImagePreviews([]);
  };

  return (
    <div className="w-full bg-[#FDFCFC] h-full px-[28px]">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          void handleSubmit(onSubmit)();
        }}
        className="pt-[25px] flex flex-col gap-[25px] pb-[80px]"
      >
        <TitleInput register={register} error={errors.title} />
        <ContentInput register={register} error={errors.content} />
        <CategoryInput register={register} error={errors.category} />
        <TagsInput
          tags={tags}
          setValue={setValue}
          trigger={trigger}
          error={errors.tags}
        />

        <div className="flex flex-col items-center">
          <label
            htmlFor="feedImg"
            className="items-center gap-2 w-full flex justify-center border-dotted border-2 border-gray-300 p-4 rounded-xl bg-[#F1F4F9] h-[110px]"
          >
            <DownloadImage />
            <span className="text-gray-600 text-[16px]">Upload attachment</span>
          </label>
          <input
            type="file"
            id="feedImg"
            name="feedImg"
            className="hidden"
            onChange={(e) => {
              void handleFeedImage(e);
            }}
          />

          <div className="flex gap-4 mt-4 flex-wrap w-full justify-center">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={imagePreviews[index] || index}
                className="w-[120px] h-[150px] bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 border-dashed border-2 overflow-hidden"
              >
                {imagePreviews[index] ? (
                  <Image
                    src={imagePreviews[index]}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover"
                    width={100}
                    height={100}
                  />
                ) : (
                  <PushImage />
                )}
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="text-[20px] bg-[#47D0BF] py-[18px] rounded-lg text-white text-center"
        >
          Upload now
        </button>
      </form>
    </div>
  );
}

export default FeedForm;
