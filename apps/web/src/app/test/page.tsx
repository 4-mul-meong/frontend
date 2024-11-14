import { CommonLayout } from "@/components/common/molecules";
import FeedForm from "@/components/feedform/organisms/feedForm";

function page() {
  return (
    <CommonLayout.Contents>
      <FeedForm />
    </CommonLayout.Contents>
  );
}

export default page;
