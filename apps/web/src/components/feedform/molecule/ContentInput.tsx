import type { UseFormRegister } from "react-hook-form";
import type { FormData } from "../organisms/FeedForm"; // FeedForm 위치에 맞게 수정하세요

interface ContentInputProps {
  register: UseFormRegister<FormData>;
  error?: { message?: string };
}

function ContentInput({ register, error }: ContentInputProps) {
  return (
    <div>
      <label htmlFor="post" className="block text-sm font-bold">
        내용
      </label>
      <textarea
        id="post"
        {...register("content")}
        className="w-full px-3 py-2 border rounded"
        rows={4}
      />
      {error ? <p className="text-red-500 text-sm">{error.message}</p> : null}
    </div>
  );
}

export default ContentInput;
