"use client";

import { POST_FORM_MODE } from "@/app/_constants/const";
import { Category } from "@/app/_types/Category";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PostForm } from "../_components/PostForm";

export default function AdminPostsNewPage() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [thumbnailUrl, setThumbnailUrl] = useState<string>("");
  const [categories, setCategories] = useState<Category[]>([]);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 記事を作成します。
    await fetch("/api/admin/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content, thumbnailUrl, categories }),
    });

    alert("記事を作成しました。");
    router.push(`/admin/posts`);
  };

  return (
    <div className="w-full p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-xl font-bold">記事作成</h1>
      </div>
      <PostForm
        mode={POST_FORM_MODE.CREATE}
        title={title}
        setTitle={setTitle}
        content={content}
        setContent={setContent}
        thumbnailUrl={thumbnailUrl}
        setThumbnailUrl={setThumbnailUrl}
        selectedCategories={categories}
        setSelectedCategories={setCategories}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
