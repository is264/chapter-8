"use client";

import { NavItem } from "@/app/_types/NavItem";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems: NavItem[] = [
  { href: "/admin/posts", label: "記事一覧" },
  { href: "/admin/categories", label: "カテゴリー一覧" },
];

export const SideBer = () => {
  const pathname = usePathname();

  const isActive = (href: string): boolean => {
    return pathname === href || pathname?.startsWith(`${href}/`);
  };

  return (
    <div className="w-[280px] h-screen bg-gray-100">
      <nav>
        <ul>
          {navItems.map((item) => (
            <li
              key={item.href}
              className={clsx("hover:bg-blue-100", {
                "bg-blue-100": isActive(item.href),
              })}
            >
              <Link href={item.href} className="block p-4">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
