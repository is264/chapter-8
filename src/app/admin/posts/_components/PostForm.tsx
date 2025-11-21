import { POST_FORM_MODE } from "@/app/_constants/const";
import { Category } from "@/app/_types/Category";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/utils/supabase";
import { Label } from "@radix-ui/react-label";
import { ChangeEvent, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { CategorySelect } from "./CategorySelect";

interface PostFormProps {
  mode: POST_FORM_MODE;
  title: string;
  setTitle: (title: string) => void;
  content: string;
  setContent: (content: string) => void;
  thumbnailImageKey: string;
  setThumbnailImageKey: (thumbnailUrl: string) => void;
  selectedCategories: Category[];
  setSelectedCategories: (categories: Category[]) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onDelete?: () => void;
  disabled: boolean;
}

export const PostForm = ({
  mode,
  title,
  setTitle,
  content,
  setContent,
  thumbnailImageKey,
  setThumbnailImageKey,
  selectedCategories,
  setSelectedCategories,
  onSubmit,
  onDelete,
  disabled,
}: PostFormProps) => {
  const [thumbnailImageUrl, setThumbnailImageUrl] = useState<null | string>(
    null
  );

  const handleImageChange = async (
    event: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    if (!event.target.files || event.target.files.length == 0) {
      // 画像が選択されていないのでreturn
      return;
    }

    const file = event.target.files[0]; // 選択された画像を取得

    const filePath = `private/${uuidv4()}`; // ファイルパスを指定

    // Supabaseに画像をアップロード
    const { data, error } = await supabase.storage
      .from("post_thumbnail") // ここでバケット名を指定
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    // アップロードに失敗したらエラーを表示して終了
    if (error) {
      alert(error.message);
      return;
    }

    // data.pathに、画像固有のkeyが入っているので、thumbnailImageKeyに格納する
    setThumbnailImageKey(data.path);
  };

  // DBに保存しているthumbnailImageKeyを元に、Supabaseから画像のURLを取得する
  useEffect(() => {
    if (!thumbnailImageKey) return;

    const fetcher = async () => {
      const {
        data: { publicUrl },
      } = await supabase.storage
        .from("post_thumbnail")
        .getPublicUrl(thumbnailImageKey);

      setThumbnailImageUrl(publicUrl);
    };

    fetcher();
  }, [thumbnailImageKey]);

  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <div className="grid w-full items-center gap-1">
        <Label htmlFor="title">タイトル</Label>
        <Input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={disabled}
        />
      </div>
      <div className="grid w-full gap-1">
        <Label htmlFor="content">内容</Label>
        <Textarea
          id="content"
          rows={10}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={disabled}
        />
      </div>
      <div className="grid w-full items-center gap-1">
        <Label htmlFor="thumbnailImageKey">サムネイルURL</Label>
        <Input
          type="file"
          id="thumbnailImageKey"
          onChange={handleImageChange}
          disabled={disabled}
          accept="image/*"
        />
        {thumbnailImageUrl && (
          <img
            src={thumbnailImageUrl}
            alt="thumbnail"
            width={180}
            height={180}
          />
        )}
      </div>
      <div className="grid w-full items-center gap-1">
        <Label htmlFor="categories">カテゴリー</Label>
        <CategorySelect
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          disabled={disabled}
        />
      </div>
      <div className="w-100 space-y-1">
        <Button
          type="submit"
          className="bg-indigo-700 hover:bg-indigo-800 text-white"
          disabled={disabled}
        >
          {mode === POST_FORM_MODE.CREATE ? "作成" : "更新"}
        </Button>
        {mode === POST_FORM_MODE.EDIT && (
          <Button
            type="button"
            className="bg-red-600 hover:bg-red-700 text-white ms-3"
            onClick={onDelete}
            disabled={disabled}
          >
            削除
          </Button>
        )}
      </div>
    </form>
  );
};
