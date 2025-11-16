import { PrismaClient } from "../generated/prisma/client";
import { join } from "path";

// DATABASE_URLが相対パスの場合、絶対パスに変換
function getDatabaseUrl(): string {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    throw new Error("DATABASE_URL environment variable is not set");
  }

  // 相対パスの場合（file:で始まり、絶対パスではない場合）
  if (dbUrl.startsWith("file:") && !dbUrl.startsWith("file:/")) {
    // file:プロトコルを除去してパスを取得
    let relativePath = dbUrl.replace(/^file:/, "");
    // ./で始まる場合は除去
    if (relativePath.startsWith("./")) {
      relativePath = relativePath.substring(2);
    }
    // プロジェクトルートからの絶対パスを生成
    const absolutePath = join(process.cwd(), relativePath);
    return `file:${absolutePath}`;
  }

  // すでに絶対パスの場合はそのまま返す
  return dbUrl;
}

// Prisma Clientを絶対パスで初期化
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: getDatabaseUrl(),
    },
  },
});

export default prisma;

