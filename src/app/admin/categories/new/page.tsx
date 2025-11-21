"use client";

import { POST_FORM_MODE } from "@/app/_constants/const";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import { CategoryRequestBody } from "@/app/_types/CategoryRequestBody";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CategoryForm } from "../_components/CategoryForm";

export default function AdminCategoriesNewPage() {
  const [name, setName] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const router = useRouter();

  const { token } = useSupabaseSession();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) return;

    try {
      setIsSubmitting(true);
      const requestBody: CategoryRequestBody = {
        name,
      };

      await fetch("/api/admin/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(requestBody),
      });

      alert("カテゴリーを作成しました。");
      router.push(`/admin/categories`);
    } catch (error) {
      alert("カテゴリーの作成に失敗しました");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-xl font-bold">カテゴリー作成</h1>
      </div>
      <CategoryForm
        mode={POST_FORM_MODE.CREATE}
        name={name}
        setName={setName}
        onSubmit={handleSubmit}
        disabled={isSubmitting}
      />
    </div>
  );
}
