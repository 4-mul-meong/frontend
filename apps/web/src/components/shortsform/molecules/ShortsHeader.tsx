import React from "react";
import { DeleteShorts } from "@/components/common/icons";

function ShortsHrader() {
  return (
    <div>
      <div className="flex justify-between px-[28px] py-7 items-center">
        <div className="text-[#47D0BF] text-[20px] space-x-2">
          <span>#</span>
          <span>쇼츠 만들기</span>
        </div>
        <button type="button">
          <DeleteShorts />
        </button>
      </div>
    </div>
  );
}

export default ShortsHrader;
