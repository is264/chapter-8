"use client";

import { POST_FORM_MODE } from "@/app/_constants/const";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import { Category } from "@/app/_types/Category";
import { PostRequestBody } from "@/app/_types/PostRequestBody";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PostForm } from "../_components/PostForm";

export default function AdminPostsNewPage() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [thumbnailImageKey, setThumbnailImageKey] = useState<string>("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const router = useRouter();

  const { token } = useSupabaseSession();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) return;

    try {
      setIsSubmitting(true);
      const requestBody: PostRequestBody = {
        title,
        content,
        categories,
        thumbnailImageKey,
      };
      await fetch("/api/admin/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(requestBody),
      });

      alert("記事を作成しました。");
      router.push(`/admin/posts`);
    } catch (error: unknown) {
      alert("記事の作成に失敗しました");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
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
        thumbnailImageKey={thumbnailImageKey}
        setThumbnailImageKey={setThumbnailImageKey}
        selectedCategories={categories}
        setSelectedCategories={setCategories}
        onSubmit={handleSubmit}
        disabled={isSubmitting}
      />
    </div>
  );
}
