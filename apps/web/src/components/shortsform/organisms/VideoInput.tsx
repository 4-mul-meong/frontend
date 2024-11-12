import ShortsText from "../atoms/ShortsText";
import Video from "../molecules/Video";

function VideoInput() {
  return (
    <div className="bg-white px-[28px] mx-auto w-[calc(100%-56px)] rounded-b-xl">
      <div className="px-[28px] py-[30px]">
        <ShortsText />
        {/* 동영상 인풋  */}
        <Video />
        <button
          className="mt-6 bg-[#47D0BF] text-white w-full py-3 rounded-lg h-[64]"
          type="button"
        >
          Upload now
        </button>
      </div>
    </div>
  );
}

export default VideoInput;
