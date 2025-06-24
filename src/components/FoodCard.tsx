import { useState } from "react";
import { Pencil, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import type { Category, MenuItem } from "../types/menuItem.types";

interface FoodCardProps {
  item: MenuItem;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onToggleStatus: (id: number) => void;
  categories: Category[];
}

export const FoodCard = ({ 
  item, 
  onEdit, 
  onDelete, 
  onToggleStatus,
  categories
}: FoodCardProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={`card bg-base-100 shadow-md hover:shadow-lg transition-shadow ${!item.active ? "opacity-80" : ""}`}>
      <div className="card-body p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="card-title text-base-content">
              {item.name}
              {!item.active && (
                <span className="badge badge-neutral badge-sm ml-2">Inactive</span>
              )}
            </h3>
            <p className="text-gray-500">
              {categories.find(c => c.id === item.categoryId)?.name || "Uncategorized"}
            </p>
          </div>
          <span className="text-lg font-semibold text-yellow-400">
            ${typeof item.price === "string" ? parseFloat(item.price).toFixed(2) : item.price.toFixed(2)}
          </span>
        </div>

        {expanded && (
          <div className="mt-2">
            <p className="text-base-content">{item.description}</p>
            <div className="mt-2">
              <h4 className="text-sm font-semibold text-base-content">Ingredients:</h4>
              <p className="text-sm text-gray-600">{item.ingredients}</p>
            </div>
          </div>
        )}

        <div className="card-actions justify-between items-center mt-4">
          <button
            onClick={() => setExpanded(!expanded)}
            className="btn btn-sm btn-ghost"
          >
            {expanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
            {expanded ? "Less" : "More"}
          </button>
          
          <div className="flex gap-2">
            <button
              onClick={() => onToggleStatus(item.id)}
              className={`btn btn-sm ${item.active ? "btn-ghost" : "btn-outline"}`}
            >
              {item.active ? "Deactivate" : "Activate"}
            </button>
            <button
              onClick={() => onEdit(item.id)}
              className="btn btn-sm btn-ghost"
            >
              <Pencil className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(item.id)}
              className="btn btn-sm btn-ghost text-error"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};