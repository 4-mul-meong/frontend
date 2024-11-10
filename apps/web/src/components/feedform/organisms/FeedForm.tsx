"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ContentInput, ImagesInput, TagsInput, TitleInput } from "../molecule";

// z
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

// FormData 타입을 외부에서 사용하도록 export
export type FormData = z.infer<typeof formSchema>;

function FeedForm() {
  const {
    register,
    // handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { title: "", content: "", tags: [], images: [] },
  });

  const [tags, setTags] = useState<string[]>([]);
  const images = watch("images");

  // const onSubmit = () => {
  //   // 데이터를 서버로 전송하는 로직
  // };

  return (
    <div className="w-full bg-[#FDFCFC] h-auto px-[28px]">
      <form
        // onSubmit={handleSubmit(onSubmit)}
        className="pt-[25px] flex flex-col gap-[25px] pb-[80px]"
        method="POST"
        encType="multipart/form-data"
      >
        <TitleInput register={register} error={errors.title} />
        <ContentInput register={register} error={errors.content} />
        <TagsInput
          tags={tags}
          setTags={setTags}
          setValue={setValue}
          error={errors.tags}
        />
        <ImagesInput
          images={images}
          setValue={setValue}
          error={errors.images}
        />
        <button
          type="submit"
          className="text-[20px] bg-[#47D0BF] py-[18px] rounded-lg text-white text-center"
        >
          UPload now
        </button>
      </form>
    </div>
  );
}

export default FeedForm;
