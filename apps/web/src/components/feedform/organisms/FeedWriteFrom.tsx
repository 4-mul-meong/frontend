"use client";

import { Button } from "@repo/ui/shadcn/button";
import Swal from "sweetalert2";
import { useRef } from "react";
import FeedCreateFormFields from "./FeedCreateFormFields";

function FeedWriteFrom({
  handleCreateFeed,
}: {
  handleCreateFeed: (feedFormData: FormData) => Promise<void>;
}) {
  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // 기본 form 제출 방지
    const formData = new FormData(event.target as HTMLFormElement);

    try {
      await handleCreateFeed(formData);

      // 성공 메시지 띄우기
      await Swal.fire({
        icon: "success",
        title: "제출 성공",
        text: "폼이 성공적으로 제출되었습니다!",
      });

      // 입력값 리셋
      formRef.current?.reset();
    } catch (error) {
      // 에러 메시지 띄우기
      await Swal.fire({
        icon: "error",
        title: "제출 실패",
        text:
          error instanceof Error
            ? error.message
            : "알 수 없는 에러가 발생했습니다.",
      });
    }
  };

  return (
    <form
      ref={formRef}
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
