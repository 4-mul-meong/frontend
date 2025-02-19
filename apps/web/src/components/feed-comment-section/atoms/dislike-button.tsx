import type { UseMutationResult } from "@tanstack/react-query";
import { ThumbsDown } from "lucide-react";
import { ButtonWithAuth } from "@/components/common/atoms";
// import { formatToNumAbbrs } from '@/functions/utils';

interface FeedDislikeButtonProps {
  dislikeCount: number;
  dislikeStatus: {
    data: boolean | undefined;
    mutation: UseMutationResult<
      void,
      Error,
      void,
      {
        prevLikeStatus: boolean | undefined;
        prevDislikeStatus: boolean | undefined;
      }
    >;
  };
}

export function DislikeButton({
  // dislikeCount,
  dislikeStatus,
}: FeedDislikeButtonProps) {
  return (
    <ButtonWithAuth
      className="flex gap-[0.5rem] items-center"
      onClick={() => dislikeStatus.mutation.mutate()}
    >
      <span>
        <ThumbsDown
          size="1rem"
          className={dislikeStatus.data ? "text-pink-300" : "text-slate-400"}
        />
      </span>
      {/* <span className="text-xs text-slate-400">
        {formatToNumAbbrs(
          Number(dislikeCount) + Number(dislikeStatus.data || 0)
        )}
      </span> */}
    </ButtonWithAuth>
  );
}
