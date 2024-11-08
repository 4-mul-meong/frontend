import React from "react";
import CreateForm from "@/components/create-form/organisms/CreateForm";
import { CommonLayout } from "@/components/common/molecules";

function page() {
  return (
    <CommonLayout.Contents className="">
      <CreateForm />
    </CommonLayout.Contents>
  );
}

export default page;
