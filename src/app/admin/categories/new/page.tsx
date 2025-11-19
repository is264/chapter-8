"use client";

import { POST_FORM_MODE } from "@/app/_constants/const";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CategoryForm } from "../_components/CategoryForm";

export default function AdminCategoriesNewPage() {
  const [name, setName] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch("/api/admin/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    alert("カテゴリーを作成しました。");
    router.push(`/admin/categories`);
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
      />
    </div>
  );
}
