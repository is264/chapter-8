"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../../_constants/api";
import type { Post } from "../../_types/Post";

type PostPageProps = {
  params: {
    id: string;
  };
};

export default function PostPage({ params }: PostPageProps) {
  const { id } = params;
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch(`${API_BASE_URL}/posts/${id}`);
      const data = await res.json();
      setPost(data.post);
      setIsLoading(false);
    };
    fetcher();
  }, [id]);

  if (isLoading) {
    return (
      <div className="w-[800px] mx-auto my-10 text-center text-2xl">
        読込中...
      </div>
    );
  }

  if (!post) {
    return (
      <div className="w-[800px] mx-auto my-10 text-center text-2xl">
        記事が見つかりませんでした
      </div>
    );
  }

  return (
    <div className="w-[800px] mx-auto my-10 p-4">
      <div>
        <Image
          src={post.thumbnailUrl}
          alt={post.title}
          width={800}
          height={400}
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between">
          <div className="text-xs text-[#888888]">
            {new Date(post.createdAt).toLocaleDateString()}
          </div>
          <div className="flex justify-end gap-2">
            {post.categories.map((category: string) => {
              return (
                <span
                  key={category}
                  className="text-xs text-[#0066cc] border border-[#0066cc] rounded-sm px-2 py-1"
                >
                  {category}
                </span>
              );
            })}
          </div>
        </div>
        <div className="text-2xl mt-2 mb-4">{post.title}</div>
        <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
      </div>
    </div>
  );
}
