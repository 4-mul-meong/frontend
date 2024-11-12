import React from "react";
import { ShortsPost, ShortsTag, ShortsTitle } from "../molecules";

function Content() {
  return (
    <div className="bg-white mx-auto w-[calc(100%-56px)] rounded-b-xl">
      <div className="px-[28px] py-[30px] flex flex-col gap-[22px]">
        <ShortsTitle />
        <ShortsPost />
        <ShortsTag />
      </div>
    </div>
  );
}

export default Content;
