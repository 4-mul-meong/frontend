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
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { title: "", content: "", tags: [], images: [] },
  });

  const tags = watch("tags");
  const images = watch("images");

  // S3 업로드 함수
  const uploadImageToS3 = async (imageFile: File): Promise<string | null> => {
    const fileContent = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;
        if (typeof result === "string") {
          resolve(result.split(",")[1]);
        } else {
          reject(new Error("파일을 Base64로 변환하는 중 오류가 발생했습니다."));
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(imageFile);
    });

    const response = await fetch("/api/s3/client/feed", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fileName: imageFile.name,
        fileType: imageFile.type,
        fileContent,
      }),
    });

    interface S3UploadResponse {
      imageUrl: string;
    }

    if (response.ok) {
      const result = (await response.json()) as S3UploadResponse;
      // console.log("S3 업로드 성공:", result.imageUrl);
      return result.imageUrl;
    }
    // console.error("S3 업로드 실패");
    return null;
  };

  const onSubmit = async (data: FormData) => {
    const uploadResults = await Promise.all(data.images.map(uploadImageToS3));

    if (uploadResults.some((url) => url === null)) {
      // console.error("일부 이미지가 S3에 업로드되지 않았습니다.");
    } else {
      // console.log("모든 이미지가 성공적으로 S3에 업로드되었습니다.");
    }

    reset();
  };

  return (
    <div className="w-full bg-[#FDFCFC] h-auto px-[28px]">
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
