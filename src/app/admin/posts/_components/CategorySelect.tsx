import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import { Category } from "@/app/_types/Category";
import { MultiSelect } from "@/components/multi-select";
import { useEffect, useState } from "react";

interface CategorySelectProps {
  selectedCategories: Category[];
  setSelectedCategories: (categories: Category[]) => void;
  disabled: boolean;
}

export const CategorySelect = ({
  selectedCategories = [],
  setSelectedCategories,
  disabled,
}: CategorySelectProps) => {
  const [categories, setCategories] = useState<Category[]>([]);

  const { token } = useSupabaseSession();

  const handleChange = (values: string[]) => {
    const newSelectedCategories = categories.filter((category) =>
      values.includes(category.id.toString())
    );
    setSelectedCategories(newSelectedCategories);
  };

  useEffect(() => {
    if (!token) return;

    const fetcher = async () => {
      const res = await fetch("/api/admin/categories", {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      const { categories } = await res.json();
      setCategories(categories || []);
    };

    fetcher();
  }, [token]);

  return (
    <MultiSelect
      options={categories.map((category) => ({
        label: category.name,
        value: category.id.toString(),
      }))}
      placeholder=""
      searchable={false}
      hideSelectAll={true}
      onValueChange={handleChange}
      defaultValue={selectedCategories.map((category) =>
        category.id.toString()
      )}
      className="shadow-sm"
      animationConfig={{
        badgeAnimation: "none",
        popoverAnimation: "none",
        optionHoverAnimation: "none",
      }}
      disabled={disabled}
    />
  );
};
