import React from "react";
import ShortsWriteForm from "@/components/shortsform/templates/ShortsWriteForm";

function page() {
  return (
    // 나중에 shorts 페이지 안에 폴더에 만들어야 됨
    <main className="bg-[#E9E9E9] min-h-screen w-full">
      <ShortsWriteForm />
    </main>
  );
}

export default page;
