// FeedForm.tsx
"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import ContentInput from "../molecule/ContentInput";
import ImagesInput from "../molecule/ImagesInput";
import TagsInput from "../molecule/TagsInput";
import TitleInput from "../molecule/TitleInput";

// formSchema 정의 및 FormData 타입 추론
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
  //   // 데이터를 서버로 전송하는 로직을 여기에 추가하세요.
  // };

  return (
    <form
      // onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 p-4 border rounded-lg w-full max-w-lg"
    >
      <TitleInput register={register} error={errors.title} />
      <ContentInput register={register} error={errors.content} />
      <TagsInput
        tags={tags}
        setTags={setTags}
        setValue={setValue}
        error={errors.tags}
      />
      <ImagesInput images={images} setValue={setValue} error={errors.images} />
      <button
        type="submit"
        className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-600"
      >
        제출
      </button>
    </form>
  );
}

export default FeedForm;
