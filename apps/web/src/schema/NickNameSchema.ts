import { z } from "zod";

export const NickNameSchema = z
  .string()
  .min(3, "닉네임은 3자 이상이어야 합니다.") // 최소 길이 3자
  .max(15, "닉네임은 15자 이하이어야 합니다.") // 최대 길이 15자
  .regex(
    /^[a-zA-Z0-9가-힣#]+$/,
    "닉네임은 영문, 숫자, 한글, #만 포함할 수 있습니다.",
  );

// 닉네임 검증용 타입
export type NicknameType = z.infer<typeof NickNameSchema>;
