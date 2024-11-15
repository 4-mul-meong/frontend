'use client';
import { Button } from '@repo/ui/shadcn/button';
import FeedCreateFormFields from './FeedCreateFormFields';

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
      onSubmit={(event) => {
        void onSubmit(event);
      }}
    >
      <FeedCreateFormFields />
      <Button type="submit">등록</Button>
    </form>
  );
}

export default FeedWriteFrom;
