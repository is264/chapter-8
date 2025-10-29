import Link from "next/link";

export const Header = () => {
  return (
    <header className="flex justify-between items-center h-[72px] p-6 bg-[#333] text-white font-bold">
      <h1>
        <Link href="/">Blog</Link>
      </h1>
      <nav className="flex items-center gap-4">
        <Link href="/contact">お問い合わせ</Link>
      </nav>
    </header>
  );
};
