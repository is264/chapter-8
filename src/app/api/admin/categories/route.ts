import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import { CategoryRequestBody } from "@/app/_types/CategoryRequestBody";

/**
 * カテゴリーの一覧を取得するAPI
 * @returns レスポンス
 */
export const GET = async () => {
  try {
    // Categoryテーブルのレコードを取得
    const categories = await prisma.category.findMany({
      // 作成日時の降順
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ status: "OK", categories }, { status: 200 });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ status: error.message }, { status: 400 });
  }
};

/**
 * カテゴリーの作成を行うAPI
 * @param request - リクエスト
 * @returns レスポンス
 */
export const POST = async (request: NextRequest) => {
  try {
    // リクエストのbodyを取得
    const body = await request.json();
    const { name }: CategoryRequestBody = body;

    // Categoryテーブルにレコードを作成
    const data = await prisma.category.create({
      data: {
        name,
      },
    });

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
