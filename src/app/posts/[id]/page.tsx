"use client";

import type { MicroCmsPost } from "@/app/_types/MicroCmsPost";
import Image from "next/image";
import { useEffect, useState } from "react";
import { MICROCMS_API_BASE_URL } from "../../_constants/api";

type PostPageProps = {
  params: {
    id: string;
  };
};

export default function PostPage({ params }: PostPageProps) {
  const { id } = params;
  const [post, setPost] = useState<MicroCmsPost>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch(`${MICROCMS_API_BASE_URL}/posts/${id}`, {
        headers: {
          "X-MICROCMS-API-KEY": process.env.NEXT_PUBLIC_MICROCMS_API_KEY as string,
        },
      });
      const data = await res.json();
      setPost(data);
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
          src={post.thumbnail.url}
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
        <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
      </div>
    </div>
  );
}
