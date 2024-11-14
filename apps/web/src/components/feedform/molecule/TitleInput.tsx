import type { UseFormRegister } from "react-hook-form";
import type { FormData } from "../organisms/feedForm";

interface TitleInputProps {
  register: UseFormRegister<FormData>;
  error?: { message?: string };
}

function TitleInput({ register, error }: TitleInputProps) {
  return (
    <div className="flex flex-col gap-[12px]">
      <label htmlFor="headline" className="block text-sm font-bold">
        제목
      </label>
      <input
        id="headline"
        type="text"
        {...register("title")}
        placeholder="제목을 입력해주세요."
        className="w-full h-[55px] rounded-lg outline-none bg-[#F1F4F9] px-2 border-2 focus:bg-[#D4D4D4]"
      />
      {error ? <p className="text-red-500 text-sm">{error.message}</p> : null}
    </div>
  );
}

export default TitleInput;
