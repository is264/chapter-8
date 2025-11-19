import { POST_FORM_MODE } from "@/app/_constants/const";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";

interface CategoryFormProps {
  mode: POST_FORM_MODE;
  name: string;
  setName: (name: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onDelete?: () => void;
  disabled: boolean;
}
export const CategoryForm = ({
  mode,
  name,
  setName,
  onSubmit,
  onDelete,
  disabled,
}: CategoryFormProps) => {
  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <div className="grid w-full items-center gap-1">
        <Label htmlFor="name">カテゴリー名</Label>
        <Input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
