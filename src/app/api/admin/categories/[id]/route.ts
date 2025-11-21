import { CategoryRequestBody } from "@/app/_types/CategoryRequestBody";
import { supabase } from "@/utils/supabase";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

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
  const token = request.headers.get("Authorization") ?? "";

  // supabaseに対してtokenを送る
  const { error } = await supabase.auth.getUser(token);
  // 送ったtokenが正しくない場合、errorが返却されるので、クライアントにもエラーを返す
  if (error)
    return NextResponse.json({ status: error.message }, { status: 400 });

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
  const token = request.headers.get("Authorization") ?? "";

  // supabaseに対してtokenを送る
  const { error } = await supabase.auth.getUser(token);
  // 送ったtokenが正しくない場合、errorが返却されるので、クライアントにもエラーを返す
  if (error)
    return NextResponse.json({ status: error.message }, { status: 400 });

  const { id } = params;

  const { name }: CategoryRequestBody = await request.json();

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
  const token = request.headers.get("Authorization") ?? "";

  // supabaseに対してtokenを送る
  const { error } = await supabase.auth.getUser(token);
  // 送ったtokenが正しくない場合、errorが返却されるので、クライアントにもエラーを返す
  if (error)
    return NextResponse.json({ status: error.message }, { status: 400 });

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
