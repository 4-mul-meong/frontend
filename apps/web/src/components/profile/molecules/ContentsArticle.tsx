import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "@/components/common/atoms";
import type { ImageMedia, ShortsMedia, VideoMedia } from "@/types/media";

interface ContentsArticleProps {
  media?: ImageMedia | VideoMedia | ShortsMedia;
  title?: string;
  contentsUuid?: string;
}

export function ContentsArticle({
  media,
  title,
  contentsUuid,
}: ContentsArticleProps) {
  if (!title) return <Skeleton className="w-full aspect-square rounded-lg" />;

  if (media) {
    const { mediaUrl } =
      media.mediaType === "IMAGE"
        ? media.assets.IMAGE
        : media.assets.VIDEO_THUMBNAIL;

    const prefix = media.mediaType ? "feeds" : "shorts";

    return (
      <Link href={`/${prefix}/${contentsUuid}`}>
        <article
          className={`relative w-full ${media.mediaType ? "aspect-square" : "aspect-[9/16]"}`}
        >
          <Image
            src={`https://media.qua.world/${mediaUrl}`}
            alt={title}
            objectFit="cover"
            fill
          />
        </article>
      </Link>
    );
  }

  return (
    <article className="w-full aspect-square bg-teal-300 rounded-lg flex justify-center items-center overflow-hidden">
      <span className="text-md text-white font-bold break-keep m-[1rem] line-clamp-3">
        {title}
      </span>
    </article>
  );
}
