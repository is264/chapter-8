import { Category } from "./Category";

/**
 * POSTの型
 */
export interface Post {
  /** POST ID */
  id: number;
  /** タイトル */
  title: string;
  /** 内容 */
  content: string;
  /** カテゴリー */
  postCategories: { category: Category }[];
  /** サムネイルURL */
  thumbnailUrl: string;
  /** 作成日時 */
  createdAt: string;
}
