import { z } from "zod";

export const ShortsFormSchema = z.object({
  // 제목: 필수, 최대 50자
  headline: z
    .string()
    .nonempty("제목은 필수입니다.")
    .max(50, "제목은 최대 50자까지 가능합니다."),

  // 내용: 필수, 최대 50자
  post: z
    .string()
    .nonempty("내용은 필수입니다.")
    .max(50, "내용은 최대 50자까지 가능합니다."),

  // 태그: 최대 5개 선택 가능
  tags: z
    .array(z.string().nonempty("빈 태그는 허용되지 않습니다."))
    .max(5, "태그는 최대 5개까지 선택할 수 있습니다."),
});
