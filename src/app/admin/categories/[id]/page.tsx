"use client";

import { POST_FORM_MODE } from "@/app/_constants/const";
import { Category } from "@/app/_types/Category";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CategoryForm } from "../_components/CategoryForm";

export default function AdminCategoriesIdPage() {
  const [name, setName] = useState<string>("");
  const { id } = useParams();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // カテゴリーを更新します。
    await fetch(`/api/admin/categories/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    alert("カテゴリーを更新しました。");
  };

  const handleDeleteCategory = async () => {
    if (!confirm("カテゴリーを削除しますか？")) return;

    await fetch(`/api/admin/categories/${id}`, {
      method: "DELETE",
    });

    alert("カテゴリーを削除しました。");

    router.push("/admin/categories");
  };

  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch(`/api/admin/categories/${id}`);
      const { category }: { category: Category } = await res.json();
      setName(category.name);
    };

    fetcher();
  }, [id]);

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
      />
    </div>
  );
}
