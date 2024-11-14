import { z } from "zod";

export const feedFormSchema = z.object({
  title: z
    .string()
    .min(1, "제목은 필수 항목입니다")
    .max(100, "제목은 100자 이하여야 합니다"),
  content: z
    .string()
    .min(1, "내용은 필수 항목입니다")
    .max(500, "내용은 500자 이하여야 합니다"),
  tags: z.array(z.string()).max(5, "태그는 최대 5개까지 입력할 수 있습니다"),
  images: z
    .array(z.instanceof(File))
    .max(4, "이미지는 최대 4개까지 업로드할 수 있습니다"),
});

export type FeedFormData = z.infer<typeof feedFormSchema>;
