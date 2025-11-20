"use client";

import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import { Category } from "@/app/_types/Category";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { token } = useSupabaseSession();

  useEffect(() => {
    if (!token) return;

    const fetcher = async () => {
      const res = await fetch(`/api/admin/categories`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      const data = await res.json();
      setCategories(data.categories || []);
      setIsLoading(false);
    };
    fetcher();
  }, [token]);

  return (
    <div className="w-full p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-xl font-bold">カテゴリー一覧</h1>
        <Link
          href="/admin/categories/new"
          className="py-2 px-4 bg-blue-500 text-white font-bold rounded-md"
        >
          新規作成
        </Link>
      </div>
      {isLoading ? (
        <div className="p-4">Loading...</div>
      ) : (
        <ul>
          {categories.map((category) => (
            <li key={category.id} className="border-b border-gray-200">
              <Link
                href={`/admin/categories/${category.id}`}
                className="block hover:bg-gray-100 p-4"
              >
                <div className="text-xl font-bold">{category.name}</div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
