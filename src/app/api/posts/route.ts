import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

/**
 * POSTの一覧を取得するAPI
 * @param request - リクエスト
 * @returns レスポンス
 */
export const GET = async (request: NextRequest) => {
  try {
    // Postテーブルのレコードを全て取得
    const posts = await prisma.post.findMany({
      include: {
        postCategories: {
          include: {
            category: {
              select: {
                id: true, // カテゴリーID
                name: true, // カテゴリー名
              },
            },
          },
        },
      },
      // 作成日時の降順
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ status: "OK", posts: posts }, { status: 200 });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ status: error.message }, { status: 400 });
  }
};
