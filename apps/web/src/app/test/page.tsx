import React from "react";
import { CommonLayout } from "@/components/common/molecules";
import FeedForm from "@/components/feedform/organisms/FeedForm";

function page() {
  return (
    <CommonLayout.Contents className="">
      <FeedForm />
    </CommonLayout.Contents>
  );
}

export default page;
