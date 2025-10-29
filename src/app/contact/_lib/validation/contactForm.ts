import { z } from "zod";

export const contactSchema: z.ZodSchema = z.object({
  name: z
    .string()
    .min(1, "名前は必須です。")
    .max(30, "名前は30文字以内で入力してください。"),
  email: z
    .string()
    .min(1, "メールアドレスは必須です。")
    .email("正しいメールアドレスを入力してください。"),
  message: z
    .string()
    .min(1, "本文は必須です。")
    .max(500, "本文は500文字以内で入力してください。"),
});
