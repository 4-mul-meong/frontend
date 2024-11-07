import FormButton from "../atoms/FormButton";
import { HeadLineInput, ImageInput, PostInput, TagsInput } from "../molecule";

function CreateForm() {
  return (
    <div className=" w-full bg-[#D7E8FF] h-auto px-[28px]">
      <form
        method="POST"
        className="pt-[25px] flex flex-col gap-[25px] pb-[80px]"
        action=""
      >
        <HeadLineInput />
        <PostInput />
        <TagsInput />
        <ImageInput />
        <FormButton />
      </form>
    </div>
  );
}

export default CreateForm;
