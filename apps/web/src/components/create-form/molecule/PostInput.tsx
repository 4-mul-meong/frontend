import React from "react";

function PostInput() {
  return (
    // 포스트
    <div className="flex flex-col gap-[10px]">
      <label htmlFor="Post">Post</label>
      <textarea
        id="Post"
        name="Post"
        wrap="hard"
        rows={4}
        cols={50}
        className="w-full h-[116px] rounded-lg outline-none ring-0 focus:outline-none focus:ring-0  focus:bg-[#F1F4F9]"
      />
    </div>
  );
}

export default PostInput;
