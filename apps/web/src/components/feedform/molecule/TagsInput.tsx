import type { UseFormSetValue } from "react-hook-form";
import type { FormData } from "../organisms/FeedForm";

interface TagsInputProps {
  tags: string[];
  setValue: UseFormSetValue<FormData>;
  error?: { message?: string };
}

function TagsInput({ tags, setValue, error }: TagsInputProps) {
  const handleAddTag = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && event.currentTarget.value) {
      event.preventDefault();
      const newTag = event.currentTarget.value.trim();
      if (tags.length < 10 && newTag && !tags.includes(newTag)) {
        setValue("tags", [...tags, newTag]);
      }
      event.currentTarget.value = "";
    }
  };

  return (
    <div className="flex flex-col gap-[12px]">
      <label htmlFor="tag" className="block text-sm font-bold">
        태그
      </label>
      <input
        id="tag"
        type="text"
        onKeyDown={handleAddTag}
        className="w-full h-[55px] rounded-lg bg-[#F1F4F9] border-2 px-2 focus:bg-[#D4D4D4]"
        placeholder="태그를 입력하고 엔터를 누르세요"
      />
      <div className="flex flex-wrap gap-2 mt-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="text-[#217EFD] text-[12px] border-[1px] rounded-2xl border-[#217EFD] px-3 py-2"
          >
            {tag}
          </span>
        ))}
      </div>
      {error ? <p className="text-red-500 text-sm">{error.message}</p> : null}
    </div>
  );
}

export default TagsInput;
