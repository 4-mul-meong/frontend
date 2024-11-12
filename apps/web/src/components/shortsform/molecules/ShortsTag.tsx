"use client";
import React, { useState } from "react";

function ShortsTag() {
  const [values, setValues] = useState<string[]>([]);

  const handleAddValue = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && event.currentTarget.value) {
      event.preventDefault();
      const newValue = event.currentTarget.value.trim();
      if (values.length < 10 && newValue && !values.includes(newValue)) {
        setValues([...values, newValue]);
      }
      event.currentTarget.value = "";
    }
  };

  return (
    <div className="flex flex-col gap-[12px]">
      <label htmlFor="value" className="block text-sm font-bold">
        Tags
      </label>
      <input
        id="value"
        type="text"
        onKeyDown={handleAddValue}
        className="w-full h-[55px] rounded-lg bg-[#F1F4F9] border-2 px-2 focus:bg-[#D4D4D4] outline-none "
        placeholder="값을 입력하고 엔터를 누르세요"
      />
      <div className="flex flex-wrap gap-2 mt-2">
        {values.map((value) => (
          <span
            key={value}
            className="text-[#217EFD] text-[12px] border-[1px] rounded-2xl border-[#217EFD] px-3 py-2"
          >
            {value}
          </span>
        ))}
      </div>
    </div>
  );
}

export default ShortsTag;
