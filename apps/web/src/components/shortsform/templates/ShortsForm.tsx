import VideoInput from "../organisms/VideoInput";
import ShortsHrader from "../molecules/ShortsHeader";
// import Content from "../organisms/Content";

function ShortsForm() {
  return (
    <div className="text-[#646464] w-full">
      <ShortsHrader />
      <VideoInput />
      {/* <Content /> */}
    </div>
  );
}

export default ShortsForm;
