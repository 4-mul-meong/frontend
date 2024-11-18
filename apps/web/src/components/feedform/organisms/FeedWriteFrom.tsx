"use client";
import { Button } from "@repo/ui/shadcn/button";
import FeedCreateFormFields from "./FeedCreateFormFields";

function FeedWriteFrom({
  handleCreateFeed,
}: {
  handleCreateFeed: (feedFormData: FormData) => Promise<void>;
}) {
  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // 기본 form 제출 방지
    const formData = new FormData(event.target as HTMLFormElement);
    // const res = feedFormSchema.safeParse(Object.fromEntries(formData.entries()));
    try {
      await handleCreateFeed(formData);
    } catch (error) {
      // console.error("Error creating feed:", error);
    }
  };

  return (
    <form
      className="w-full bg-[#FDFCFC] h-full px-[28px]"
      onSubmit={(event) => {
        void onSubmit(event);
      }}
    >
      <div className="flex flex-col gap-2">
        <FeedCreateFormFields />
        <Button
          type="submit"
          className="text-[20px] bg-[#47D0BF] py-[25px] rounded-lg text-white text-center w-full mb-20"
        >
          Upload now
        </Button>
      </div>
    </form>
  );
}

export default FeedWriteFrom;
