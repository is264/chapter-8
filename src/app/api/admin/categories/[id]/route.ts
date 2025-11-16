import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

/**
 * カテゴリーの更新時のリクエストbodyの型
 */
interface UpdateCategoryRequestBody {
  /** カテゴリー名 */
  name: string;
}

/**
 * カテゴリーの詳細を取得するAPI
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
    // idを指定してCategoryテーブルからレコードを取得
    const category = await prisma.category.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    return NextResponse.json({ status: "OK", category }, { status: 200 });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ status: error.message }, { status: 400 });
  }
};

/**
 * カテゴリーの更新を行うAPI
 * @param request - リクエスト
 * @param params - リクエストパラメータ
 * @returns レスポンス
 */
export const PUT = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;

  const { name }: UpdateCategoryRequestBody = await request.json();

  try {
    // idを指定してCategoryテーブルのレコードを更新
    const category = await prisma.category.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name,
      },
    });

    return NextResponse.json({ status: "OK", category }, { status: 200 });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ status: error.message }, { status: 400 });
  }
};

/**
 * カテゴリーの削除を行うAPI
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
    // idを指定してCategoryテーブルからレコードを削除
    await prisma.category.delete({
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
