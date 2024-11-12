import type { UseFormRegister } from "react-hook-form";
import type { FormData } from "../organisms/FeedForm";

interface ContentInputProps {
  register: UseFormRegister<FormData>;
  error?: { message?: string };
}

function ContentInput({ register, error }: ContentInputProps) {
  return (
    <div className="flex flex-col gap-[12px]">
      <label htmlFor="post" className="block text-sm font-bold">
        내용
      </label>
      <textarea
        id="post"
        {...register("content")}
        className="w-full h-[116px] border-2 outline-none rounded-lg bg-[#F1F4F9] p-2 focus:bg-[#D4D4D4]"
        rows={4}
        placeholder="내용을 입력해주세요"
      />
      {error ? <p className="text-red-500 text-sm">{error.message}</p> : null}
    </div>
  );
}

export default ContentInput;
