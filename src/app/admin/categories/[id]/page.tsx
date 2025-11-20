"use client";

import { POST_FORM_MODE } from "@/app/_constants/const";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import { Category } from "@/app/_types/Category";
import { CategoryRequestBody } from "@/app/_types/CategoryRequestBody";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CategoryForm } from "../_components/CategoryForm";

export default function AdminCategoriesIdPage() {
  const [name, setName] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { id } = useParams();
  const router = useRouter();

  const { token } = useSupabaseSession();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) return;

    try {
      const requestBody: CategoryRequestBody = {
        name,
      };

      // カテゴリーを更新します。
      await fetch(`/api/admin/categories/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(requestBody),
      });

      alert("カテゴリーを更新しました。");
    } catch (error) {
      alert("カテゴリーの更新に失敗しました");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteCategory = async () => {
    if (!confirm("カテゴリーを削除しますか？")) return;

    if (!token) return;

    try {
      setIsSubmitting(true);
      await fetch(`/api/admin/categories/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      alert("カテゴリーを削除しました。");

      router.push("/admin/categories");
    } catch (error) {
      alert("カテゴリーの削除に失敗しました");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (!token) return;

    const fetcher = async () => {
      const res = await fetch(`/api/admin/categories/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      const { category }: { category: Category } = await res.json();
      setName(category.name);
    };

    fetcher();
  }, [id, token]);

  return (
    <div className="w-full p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-xl font-bold">カテゴリー編集</h1>
      </div>
      <CategoryForm
        mode={POST_FORM_MODE.EDIT}
        name={name}
        setName={setName}
        onSubmit={handleSubmit}
        onDelete={handleDeleteCategory}
        disabled={isSubmitting}
      />
    </div>
  );
}
