"use client";

import { supabase } from "@/utils/supabase";
import Link from "next/link";
import { useSupabaseSession } from "../_hooks/useSupabaseSession";

export const Header = () => {
  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  const { session, isLoading } = useSupabaseSession();

  return (
    <header className="flex justify-between items-center h-[72px] p-6 bg-[#333] text-white font-bold">
      <h1>
        <Link href="/">Blog</Link>
      </h1>
      {!isLoading && (
        <nav className="flex items-center gap-4">
          {session ? (
            <>
              <Link href="/admin">管理画面</Link>
              <button onClick={handleLogout}>ログアウト</button>
            </>
          ) : (
            <>
              <Link href="/contact">お問い合わせ</Link>
              <Link href="/login">ログイン</Link>
            </>
          )}
        </nav>
      )}
    </header>
  );
};
