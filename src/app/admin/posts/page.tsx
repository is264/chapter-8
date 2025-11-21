"use client";

import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import { Post } from "@/app/_types/Post";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { token } = useSupabaseSession();

  useEffect(() => {
    if (!token) return;

    const fetcher = async () => {
      const res = await fetch("/api/admin/posts", {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      const data = await res.json();
      setPosts(data.posts || []);
      setIsLoading(false);
    };
    fetcher();
  }, [token]);

  return (
    <div className="w-full p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-xl font-bold">記事一覧</h1>
        <Link
          href="/admin/posts/new"
          className="py-2 px-4 bg-blue-500 text-white font-bold rounded-md"
        >
          新規作成
        </Link>
      </div>
      {isLoading ? (
        <div className="p-4">Loading...</div>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post.id} className="border-b border-gray-200">
              <Link
                href={`/admin/posts/${post.id}`}
                className="block hover:bg-gray-100 p-4"
              >
                <div className="text-xl font-bold">{post.title}</div>
                <div className="text-sm text-gray-500">
                  {new Date(post.createdAt).toLocaleDateString()}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
