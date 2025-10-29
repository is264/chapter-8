"use client";

import { useState } from "react";
import { ZodError } from "zod";
import { API_BASE_URL } from "../_constants/api";
import { ErrorMessage } from "./_components/ErrorMessage";
import { FormGroup } from "./_components/FormGroup";
import { Input } from "./_components/Input";
import { Label } from "./_components/Label";
import { TextArea } from "./_components/TextArea";
import { contactSchema } from "./_lib/validation/contactForm";

type Form = {
  name: string;
  email: string;
  message: string;
};

export default function ContactPage() {
  const [form, setForm] = useState<Form>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  /**
   * 入力フォーム更新時のハンドラー
   */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
  };

  /**
   * 入力フォームクリア時のハンドラー
   */
  const handleClear = () => {
    setForm({
      name: "",
      email: "",
      message: "",
    });
    setErrors({});
  };

  /**
   * 送信ボタンクリック時のハンドラー
   */
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      // 入力フォームのバリデーション
      contactSchema.parse(form);
      setIsSubmitting(true);
      // 入力フォーム送信
      await fetch(`${API_BASE_URL}/contacts`, {
        method: "POST",
        body: JSON.stringify(form),
      });
      // 送信完了メッセージ表示
      alert("送信しました。");
      // 入力フォームクリア
      handleClear();
    } catch (error) {
      if (error instanceof ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.issues.forEach((err) => {
          if (!fieldErrors[err.path[0] as string]) {
            // 最初のエラーのみ保持
            fieldErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(fieldErrors);
      } else {
        console.error("送信エラー:", error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-[800px] mx-auto my-10">
      <div className="mb-10 text-xl font-bold">問い合わせフォーム</div>
      <div className="">
        <form>
          <FormGroup>
            <Label htmlFor="name">名前</Label>
            <div className="flex-1">
              <Input
                type="text"
                id="name"
                value={form.name}
                onChange={handleChange}
                disabled={isSubmitting}
              />
              <ErrorMessage message={errors.name} />
            </div>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="email">メールアドレス</Label>
            <div className="flex-1">
              <Input
                type="email"
                id="email"
                value={form.email}
                onChange={handleChange}
                disabled={isSubmitting}
              />
              <ErrorMessage message={errors.email} />
            </div>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="message">本文</Label>
            <div className="flex-1">
              <TextArea
                id="message"
                rows={8}
                value={form.message}
                onChange={handleChange}
                disabled={isSubmitting}
              />
              <ErrorMessage message={errors.message} />
            </div>
          </FormGroup>
          <div className="flex justify-center items-center gap-4">
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-black text-white font-bold px-4 py-2 rounded-md"
            >
              送信
            </button>
            <button
              type="button"
              onClick={handleClear}
              disabled={isSubmitting}
              className="bg-gray-200 text-black font-bold px-4 py-2 rounded-md"
            >
              クリア
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
