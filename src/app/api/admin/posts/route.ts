import { PostRequestBody } from "@/app/_types/PostRequestBody";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

/**
 * POSTの一覧を取得するAPI
 * @returns レスポンス
 */
export const GET = async () => {
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

/**
 * POSTの作成を行うAPI
 * @param request - リクエスト
 * @returns レスポンス
 */
export const POST = async (request: NextRequest) => {
  try {
    // リクエストのbodyを取得
    const body = await request.json();
    const { title, content, categories, thumbnailUrl }: PostRequestBody = body;

    // POSTテーブルにレコードを作成
    const data = await prisma.post.create({
      data: {
        title,
        content,
        thumbnailUrl,
      },
    });

    // PostCategoryテーブルにレコードを作成
    // ※sqlite以外ではcreateManyというメソッドを使う
    for (const category of categories) {
      await prisma.postCategory.create({
        data: {
          categoryId: category.id,
          postId: data.id,
        },
      });
    }

    return NextResponse.json({
      status: "OK",
      message: "作成しました",
      id: data.id,
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ status: error.message }, { status: 400 });
    }
  }
};
