import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { options } from "@/app/api/auth/[...nextauth]/authOption";
import { CommonLayout } from "@/components/common/atoms";
import { ProfilePage } from "@/components/profile/page";

interface PageProps {
  params: {
    nickname: string;
  };
}

export default async function page({ params: { nickname } }: PageProps) {
  const decodedNickname = decodeURI(nickname);
  const session = await getServerSession(options);
  if (session?.user) {
    const { nickname: myNickname } = session.user as { nickname: string };
    if (decodedNickname === myNickname) redirect("/profile/me");
  }

  return (
    <CommonLayout.Contents className="bg-white flex flex-col gap-[20px]">
      <ProfilePage {...{ nickname: decodedNickname }} />
    </CommonLayout.Contents>
  );
}
