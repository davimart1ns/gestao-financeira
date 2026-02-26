import { Category } from "@/types/Category";
import { Button } from "./ui/button";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

export default function CategoryCard({ category, onEdit, onDelete }: {
    category: Category;
    onEdit: (cat: Category) => void;
    onDelete: (cat: Category) => void;

}) {
    return (
        <div className="flex items-center justify-between p-2 border rounded-lg">
            <div className="flex items-center gap-2">
                <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: category.color || '#3b82f6'}}/>
                <span>{category.name}</span>
                {category.transactions_count > 0 && (
                    <span className="text-xs text-gray-500">
                        ({category.transactions_count})
                    </span>
                )}
            </div>

            <div className="flex gap-1">
                <Button variant={'ghost'} size="icon" onClick={() => onEdit(category)}>
                    <PencilIcon className="w-4 h-4"/>
                </Button>
                <Button variant={'ghost'} size="icon" onClick={() => onDelete(category)}>
                    <TrashIcon className="w-4 h-4"/>
                </Button>
            </div>

        </div>
    )
}