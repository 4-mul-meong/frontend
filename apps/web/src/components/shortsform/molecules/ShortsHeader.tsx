import React from "react";
import { DeleteShorts } from "@/components/common/icons";

function ShortsHeader() {
  return (
    <div>
      <div className="flex justify-between  pt-7 pb-4 items-center">
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

export default ShortsHeader;
