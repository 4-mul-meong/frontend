import type { UseFormSetValue } from "react-hook-form";
import type { FormData } from "../organisms/FeedForm"; // FeedForm 위치에 맞게 수정하세요

interface TagsInputProps {
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
  setValue: UseFormSetValue<FormData>;
  error?: { message?: string };
}

function TagsInput({ tags, setTags, setValue, error }: TagsInputProps) {
  const handleAddTag = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && event.currentTarget.value) {
      event.preventDefault();
      const newTag = event.currentTarget.value.trim();
      if (tags.length < 10) {
        setTags([...tags, newTag]);
        setValue("tags", [...tags, newTag]);
      }
      event.currentTarget.value = "";
    }
  };

  return (
    <div>
      <label htmlFor="tag" className="block text-sm font-bold">
        태그
      </label>
      <input
        id="tag"
        type="text"
        onKeyDown={handleAddTag}
        className="w-full px-3 py-2 border rounded"
        placeholder="태그를 입력하고 엔터를 누르세요"
      />
      <div className="flex flex-wrap gap-2 mt-2">
        {tags.map((tag) => (
          <span key={tag} className="px-2 py-1 text-sm bg-gray-200 rounded">
            {tag}
          </span>
        ))}
      </div>
      {error ? <p className="text-red-500 text-sm">{error.message}</p> : null}
    </div>
  );
}

export default TagsInput;
