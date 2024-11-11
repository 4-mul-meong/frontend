"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ContentInput, ImagesInput, TagsInput, TitleInput } from "../molecule";

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
    .max(5, "이미지는 최대 5개까지 업로드할 수 있습니다"),
});

export type FormData = z.infer<typeof formSchema>;

function FeedForm() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { title: "", content: "", tags: [], images: [] },
  });

  const tags = watch("tags");
  const images = watch("images");

  const onSubmit = async (data: FormData) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);
    data.tags.forEach((tag) => formData.append("tags", tag));
    data.images.forEach((image) => formData.append("images", image));

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("데이터 전송에 실패했습니다.");
      }
    } catch {
      // 에러 처리 로직 (예: 사용자에게 알림)
    }
  };

  return (
    <div className="w-full bg-[#FDFCFC] h-auto px-[28px]">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          void handleSubmit(onSubmit)();
        }}
        className="pt-[25px] flex flex-col gap-[25px] pb-[80px]"
        method="POST"
        encType="multipart/form-data"
      >
        <TitleInput register={register} error={errors.title} />
        <ContentInput register={register} error={errors.content} />
        <TagsInput tags={tags} setValue={setValue} error={errors.tags} />
        <ImagesInput
          images={images}
          setValue={setValue}
          error={errors.images}
        />
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
