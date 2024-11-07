"use client";
import { useState } from "react";
import { Check } from "@/components/common/icons";

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
        placeholder="Enter 키로 태그 추가"
      />

      {/* 태그 목록 표시 */}
      <div className="flex flex-wrap gap-2 mt-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className=" px-4 py-2 rounded-2xl text-[12px] border-2 border-[#217EFD] flex gap-[8px]"
          >
            <Check />
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default TagsInput;
