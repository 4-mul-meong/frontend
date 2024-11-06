"use client";
import React, { useState } from "react";
import { Check } from "@/components/common/icons";

function TagsInput() {
  const tags = ["니모", "바다", "모험", "친구"];
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleTagClick = (tag: string) => {
    setSelectedTags((prevSelectedTags) =>
      prevSelectedTags.includes(tag)
        ? prevSelectedTags.filter((t) => t !== tag)
        : [...prevSelectedTags, tag],
    );
  };

  return (
    <div className="flex flex-col gap-[10px]">
      <label htmlFor="Tags">Tags</label>
      <input
        type="text"
        id="Tags"
        name="Tags"
        className="w-full h-[55px] rounded-lg items-center outline-none ring-0 focus:outline-none focus:ring-0 focus:bg-[#F1F4F9]"
      />
      <div className="flex gap-2 flex-wrap mt-2">
        {tags.map((tag) => (
          <span
            key={tag}
            role="button"
            tabIndex={0}
            onClick={() => handleTagClick(tag)}
            onKeyDown={(e) => e.key === "Enter" && handleTagClick(tag)}
            className={`flex px-4 py-1 rounded-full items-center gap-2 cursor-pointer ${
              selectedTags.includes(tag)
                ? "bg-[#D7E8FF] border border-[#217EFD]"
                : "bg-gray-200"
            }`}
          >
            {selectedTags.includes(tag) && <Check />}
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default TagsInput;
