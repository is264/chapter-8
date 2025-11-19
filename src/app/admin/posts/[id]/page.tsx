"use client";

import { POST_FORM_MODE } from "@/app/_constants/const";
import { Category } from "@/app/_types/Category";
import { Post } from "@/app/_types/Post";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PostForm } from "../_components/PostForm";

export default function AdminPostsIdPage() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [thumbnailUrl, setThumbnailUrl] = useState<string>("");
  const [categories, setCategories] = useState<Category[]>([]);
  const { id } = useParams();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 記事を更新します。
    await fetch(`/api/admin/posts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content, thumbnailUrl, categories }),
    });

    alert("記事を更新しました。");
  };

  const handleDeletePost = async () => {
    if (!confirm("記事を削除しますか？")) return;

    await fetch(`/api/admin/posts/${id}`, {
      method: "DELETE",
    });

    alert("記事を削除しました。");

    router.push("/admin/posts");
  };

  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch(`/api/admin/posts/${id}`);
      const { post }: { post: Post } = await res.json();
      setTitle(post.title);
      setContent(post.content);
      setThumbnailUrl(post.thumbnailUrl);
      setCategories(post.postCategories.map((pc) => pc.category));
    };

    fetcher();
  }, [id]);

  return (
    <div className="w-full p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-xl font-bold">記事編集</h1>
      </div>
      <PostForm
        mode={POST_FORM_MODE.EDIT}
        title={title}
        setTitle={setTitle}
        content={content}
        setContent={setContent}
        thumbnailUrl={thumbnailUrl}
        setThumbnailUrl={setThumbnailUrl}
        selectedCategories={categories}
        setSelectedCategories={setCategories}
        onSubmit={handleSubmit}
        onDelete={handleDeletePost}
      />
    </div>
  );
}
