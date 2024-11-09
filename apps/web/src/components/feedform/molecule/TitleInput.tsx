import type { UseFormRegister } from "react-hook-form";
import type { FormData } from "../organisms/FeedForm"; // FeedForm 위치에 맞게 수정하세요

interface TitleInputProps {
  register: UseFormRegister<FormData>;
  error?: { message?: string };
}

function TitleInput({ register, error }: TitleInputProps) {
  return (
    <div>
      <label htmlFor="headline" className="block text-sm font-bold">
        제목
      </label>
      <input
        id="headline"
        type="text"
        {...register("title")}
        className="w-full px-3 py-2 border rounded"
      />
      {error ? <p className="text-red-500 text-sm">{error.message}</p> : null}
    </div>
  );
}

export default TitleInput;
