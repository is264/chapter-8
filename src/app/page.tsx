"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { MICROCMS_API_BASE_URL } from "./_constants/api";
import type { MicroCmsPost } from "./_types/MicroCmsPost";

export default function Home() {
  const [posts, setPosts] = useState<MicroCmsPost[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch(`${MICROCMS_API_BASE_URL}/posts`, {
        headers: {
          "X-MICROCMS-API-KEY": process.env.NEXT_PUBLIC_MICROCMS_API_KEY as string,
        },
      });
      const { contents } = await res.json();
      setPosts(contents);
      setIsLoading(false);
    };
    fetcher();
  }, []);

  if (isLoading) {
    return (
      <div className="w-[800px] mx-auto my-10 text-center text-2xl">
        読込中...
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-8 w-[800px] mx-auto my-10">
      {posts?.length > 0 ? (
        posts.map((post: MicroCmsPost) => {
          return (
            <li key={post.id} className="border border-[#ccc] p-4">
              <Link href={`/posts/${post.id}`}>
                <div className="flex justify-between">
                  <div className="text-xs text-[#888888]">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </div>
                  <div className="flex justify-end gap-2">
                    {post.categories.map((category) => {
                      return (
                        <span
                          key={category.id}
                          className="text-xs text-[#0066cc] border border-[#0066cc] rounded-sm px-2 py-1"
                        >
                          {category.name}
                        </span>
                      );
                    })}
                  </div>
                </div>
                <div className="text-2xl mt-2 mb-4">{post.title}</div>
                <div
                  className="line-clamp-2"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                ></div>
              </Link>
            </li>
          );
        })
      ) : (
        <div className="w-[800px] mx-auto my-10 text-center text-2xl">
          記事がありません
        </div>
      )}
    </ul>
  );
}
