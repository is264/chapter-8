import { POST_FORM_MODE } from "@/app/_constants/const";
import { Category } from "@/app/_types/Category";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-label";
import { CategorySelect } from "./CategorySelect";

interface PostFormProps {
  mode: POST_FORM_MODE;
  title: string;
  setTitle: (title: string) => void;
  content: string;
  setContent: (content: string) => void;
  thumbnailUrl: string;
  setThumbnailUrl: (thumbnailUrl: string) => void;
  selectedCategories: Category[];
  setSelectedCategories: (categories: Category[]) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onDelete?: () => void;
}
export const PostForm = ({
  mode,
  title,
  setTitle,
  content,
  setContent,
  thumbnailUrl,
  setThumbnailUrl,
  selectedCategories,
  setSelectedCategories,
  onSubmit,
  onDelete,
}: PostFormProps) => {
  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <div className="grid w-full items-center gap-1">
        <Label htmlFor="title">タイトル</Label>
        <Input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="grid w-full gap-1">
        <Label htmlFor="content">内容</Label>
        <Textarea
          id="content"
          rows={10}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <div className="grid w-full items-center gap-1">
        <Label htmlFor="thumbnailUrl">サムネイルURL</Label>
        <Input
          type="text"
          id="thumbnailUrl"
          value={thumbnailUrl}
          onChange={(e) => setThumbnailUrl(e.target.value)}
        />
      </div>
      <div className="grid w-full items-center gap-1">
        <Label htmlFor="categories">カテゴリー</Label>
        <CategorySelect
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
        />
      </div>
      <div className="w-100 space-y-1">
        <Button
          type="submit"
          className="bg-indigo-700 hover:bg-indigo-800 text-white"
        >
          {mode === POST_FORM_MODE.CREATE ? "作成" : "更新"}
        </Button>
        {mode === POST_FORM_MODE.EDIT && (
          <Button
            type="button"
            className="bg-red-600 hover:bg-red-700 text-white ms-3"
            onClick={onDelete}
          >
            削除
          </Button>
        )}
      </div>
    </form>
  );
};
