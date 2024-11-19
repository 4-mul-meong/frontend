import { createFeed } from "@/actions/feed";
import { CommonLayout } from "@/components/common/molecules";
import FeedWriteFrom from "@/components/feedform/organisms/FeedWriteFrom";

function page() {
  const handleCreateFeed = async (feedFormData: FormData): Promise<void> => {
    "use server";
    try {
      const res = (await createFeed(feedFormData)) as boolean;
      if (!res) {
        // console.error("Feed creation failed");
      }
    } catch (error) {
      // console.error("Error in createFeed:", error);
    }
  };

  return (
    <CommonLayout.Contents>
      <FeedWriteFrom handleCreateFeed={handleCreateFeed} />
    </CommonLayout.Contents>
  );
}

export default page;
