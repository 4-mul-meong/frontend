import { getFeed } from "@/actions/feed";
import { CommentList } from "@/components/comments/templates";
import { CommonLayout } from "@/components/common/molecules";
import Feed from "@/components/feed/organisms/Feed";

interface PageProps {
  params: {
    feedUuid: string;
  };
}

export default async function page({ params }: PageProps) {
  const feed = await getFeed(params.feedUuid);
  return (
    <CommonLayout.Contents className="bg-[#EEE] flex flex-col gap-[20px]">
      <Feed {...feed} detail />
      <CommentList
        targetType="feeds"
        isRecomment={false}
        feedUuid={params.feedUuid}
      />
    </CommonLayout.Contents>
  );
}
