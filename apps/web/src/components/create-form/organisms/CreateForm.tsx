import React from "react";
import HeadLineInput from "../molecule/HeadLineInput";
import PostInput from "../molecule/PostInput";
import TagsInput from "../molecule/TagsInput";
import ImageInput from "../molecule/ImageInput";

function CreateForm() {
  return (
    <div className="relative w-[600px] bg-white ">
      <form
        className="pt-[30px] flex flex-col gap-8 px-7 w-full bg-[#D7E8FF] "
        action=""
      >
        <HeadLineInput />
        <PostInput />
        <TagsInput />
        <ImageInput />
        <div className="absolute bottom-0 left-0 w-full px-7">
          <button
            className="text-[20px] bg-[#47D0BF] w-full h-[64px] items-center"
            type="submit"
          >
            Upload now
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateForm;
