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
  /** サムネイル画像のキー */
  thumbnailImageKey: string;
  /** 作成日時 */
  createdAt: string;
}
