import { PostRequestBody } from "@/app/_types/PostRequestBody";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

/**
 * POSTの詳細を取得するAPI
 * @param request - リクエスト
 * @param params - リクエストパラメータ
 * @returns レスポンス
 */
export const GET = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;

  try {
    // idを指定してPostテーブルからレコードを取得
    const post = await prisma.post.findUnique({
      where: {
        id: parseInt(id),
      },
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
    });

    return NextResponse.json({ status: "OK", post: post }, { status: 200 });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ status: error.message }, { status: 400 });
  }
};

/**
 * POSTの更新を行うAPI
 * @param request - リクエスト
 * @param params - リクエストパラメータ
 * @returns レスポンス
 */
export const PUT = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;

  const { title, content, categories, thumbnailUrl }: PostRequestBody =
    await request.json();

  try {
    // idを指定してPostテーブルのレコードを更新
    const post = await prisma.post.update({
      where: {
        id: parseInt(id),
      },
      data: {
        title,
        content,
        thumbnailUrl,
      },
    });

    // PostCategoryテーブルのレコードを全て削除
    await prisma.postCategory.deleteMany({
      where: {
        postId: parseInt(id),
      },
    });

    // PostCategoryテーブルにレコードを作成
    // ※sqlite以外ではcreateManyというメソッドを使う
    for (const category of categories) {
      await prisma.postCategory.create({
        data: {
          postId: post.id,
          categoryId: category.id,
        },
      });
    }

    return NextResponse.json({ status: "OK", post: post }, { status: 200 });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ status: error.message }, { status: 400 });
  }
};

/**
 * POSTの削除を行うAPI
 * @param request - リクエスト
 * @param params - リクエストパラメータ
 * @returns レスポンス
 */
export const DELETE = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;

  try {
    // idを指定してPostテーブルからレコードを削除
    await prisma.post.delete({
      where: {
        id: parseInt(id),
      },
    });

    return NextResponse.json({ status: "OK" }, { status: 200 });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ status: error.message }, { status: 400 });
  }
};
