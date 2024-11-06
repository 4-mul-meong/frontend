import React from "react";

function HeadLineInput() {
  return (
    // 제목
    <div className="flex flex-col gap-[10px]">
      <label htmlFor="Headline">Headline</label>
      <input
        type="text"
        id="Headline"
        name="Headline"
        className="w-full h-[55px] rounded-lg items-center outline-none ring-0 focus:outline-none focus:ring-0 focus:bg-[#F1F4F9]"
      />
    </div>
  );
}

export default HeadLineInput;
