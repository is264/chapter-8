/**
 * POSTの作成、更新時のリクエストbodyの型
 */
export type PostRequestBody = {
  /** タイトル */
  title: string;
  /** 内容 */
  content: string;
  /** カテゴリー */
  categories: { id: number }[];
  /** サムネイル画像のキー */
  thumbnailImageKey: string;
};
