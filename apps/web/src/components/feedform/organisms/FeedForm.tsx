"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { uploadFileToS3 } from "@/actions/common/awsMediaUploader";
import { DownloadImage } from "@/components/common/icons";
import { ContentInput, TagsInput, TitleInput } from "../molecule";

// Zod 유효성 검사 스키마
const formSchema = z.object({
  title: z
    .string()
    .min(1, "제목은 필수 항목입니다")
    .max(100, "제목은 100자 이하여야 합니다"),
  content: z
    .string()
    .min(1, "내용은 필수 항목입니다")
    .max(500, "내용은 500자 이하여야 합니다"),
  tags: z.array(z.string()).max(10, "태그는 최대 10개까지 입력할 수 있습니다"),
  images: z
    .array(z.instanceof(File))
    .max(4, "이미지는 최대 4개까지 업로드할 수 있습니다"),
});

export type FormData = z.infer<typeof formSchema>;

function FeedForm() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { title: "", content: "", tags: [], images: [] },
  });

  const tags = watch("tags");

  const handleFeedImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { files } = e.target;
    if (!files || files.length === 0) return;

    const res = await uploadFileToS3(files[0], "feed"); // "feed" 폴더로 업로드

    if (res) {
      setValue("images", [...watch("images"), files[0]]); // 폼 데이터에 파일 추가
    }
  };

  const onSubmit = async (data: FormData) => {
    await Promise.all(
      data.images.map((image) => uploadFileToS3(image, "feed")),
    );
    reset();
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
        <TagsInput tags={tags} setValue={setValue} error={errors.tags} />

        {/* 파일 업로드 버튼 */}
        <div className="flex flex-col items-center">
          <label
            htmlFor="feedImg"
            className="items-center gap-2 w-full flex  justify-center border-dotted border-2 border-gray-300 p-4 rounded-xl bg-[#F1F4F9] h-[110px]"
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
          {/* <div className="w-[120px] h-[150px] bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 border-dashed border-2">
            <PushImage />
          </div> */}
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
