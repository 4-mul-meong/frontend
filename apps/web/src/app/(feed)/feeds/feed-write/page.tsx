import { createFeed } from '@/actions/feed'
import { CommonLayout } from '@/components/common/molecules'
import FeedWriteFrom from '@/components/feedform/organisms/FeedWriteFrom'

function page() {

  const handleCreateFeed = async (feedFormData: FormData): Promise<void> => {
    'use server'
    const res = await createFeed(feedFormData) as boolean
    if (!res) {
      throw Error()
    }
  }

  return (
    <CommonLayout.Contents>
        <FeedWriteFrom handleCreateFeed={handleCreateFeed} />
    </CommonLayout.Contents>
  )
}

export default page
