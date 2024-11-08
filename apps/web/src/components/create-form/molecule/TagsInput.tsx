"use client";
import { useState } from "react";

function TagsInput() {
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && inputValue.trim()) {
      event.preventDefault();
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="flex flex-col gap-[10px]">
      <label htmlFor="Tags">Tags</label>
      <input
        type="text"
        id="Tags"
        name="Tags"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full h-[55px] rounded-lg items-center outline-none ring-0 focus:outline-none focus:ring-0 focus:bg-[#F1F4F9]"
        placeholder="태그를 입력해주세요."
      />
      <div className="mt-2 flex gap-3 flex-wrap">
        {tags.map((tag) => (
          <div
            key={tag}
            className="text-[#217EFD] text-[12px] border-[1px] rounded-2xl border-solid border-[#217EFD] px-3 py-2 flex gap-[3px] items-center"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className=" text-[#217EFD] focus:outline-none"
              aria-label="Remove Tag"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TagsInput;
