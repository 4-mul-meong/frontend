import { FeedTabHeader } from "@/components/feed-tab/organisms";

export default function layout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <>
      <FeedTabHeader />
      {children}
    </>
  );
}
