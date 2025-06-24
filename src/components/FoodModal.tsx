import { Check, X } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Category, MenuItemFormValues } from "../types/menuItem.types";
import { menuItemSchema } from "../validation/menuItem.validator";

interface FoodModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: SubmitHandler<MenuItemFormValues>;
  isSubmitting: boolean;
  editingId: number | null;
  restaurantId: number;
  categories: Category[];
}

export const FoodModal = ({
  isOpen,
  onClose,
  onSubmit,
  isSubmitting,
  editingId,
  restaurantId,
  categories
}: FoodModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(menuItemSchema),
    defaultValues: {
      active: true,
      restaurantId,
    },
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="card bg-base-100 shadow-xl w-full max-w-2xl mx-4">
        <div className="card-body">
          <h2 className="card-title text-base-content">
            {editingId ? "Edit Menu Item" : "Add New Menu Item"}
          </h2>
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base-content">Name*</span>
                </label>
                <input
                  type="text"
                  placeholder="Item name"
                  className={`input input-bordered ${errors.name ? "input-error" : ""}`}
                  {...register("name")}
                />
                {errors.name && (
                  <span className="text-error text-sm mt-1">{errors.name.message}</span>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base-content">Category*</span>
                </label>
                <select
                  className={`select select-bordered ${errors.categoryId ? "select-error" : ""}`}
                  {...register("categoryId", { valueAsNumber: true })}
                >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {errors.categoryId && (
                  <span className="text-error text-sm mt-1">{errors.categoryId.message}</span>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base-content">Price*</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    className={`input input-bordered pl-8 ${errors.price ? "input-error" : ""}`}
                    {...register("price", { valueAsNumber: true })}
                  />
                </div>
                {errors.price && (
                  <span className="text-error text-sm mt-1">{errors.price.message}</span>
                )}
              </div>

              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text text-base-content">Active</span>
                  <input
                    type="checkbox"
                    className="toggle toggle-primary"
                    {...register("active")}
                  />
                </label>
              </div>

              <div className="form-control md:col-span-2">
                <label className="label">
                  <span className="label-text text-base-content">Description*</span>
                </label>
                <textarea
                  placeholder="Item description"
                  className={`textarea textarea-bordered h-24 ${errors.description ? "textarea-error" : ""}`}
                  {...register("description")}
                />
                {errors.description && (
                  <span className="text-error text-sm mt-1">{errors.description.message}</span>
                )}
              </div>

              <div className="form-control md:col-span-2">
                <label className="label">
                  <span className="label-text text-base-content">Ingredients*</span>
                </label>
                <textarea
                  placeholder="List ingredients, separated by commas"
                  className={`textarea textarea-bordered h-24 ${errors.ingredients ? "textarea-error" : ""}`}
                  {...register("ingredients")}
                />
                <label className="label">
                  <span className="label-text-alt text-gray-500">Example: lettuce, croutons, cheese</span>
                </label>
                {errors.ingredients && (
                  <span className="text-error text-sm mt-1">{errors.ingredients.message}</span>
                )}
              </div>
            </div>

            <input type="hidden" {...register("restaurantId")} />

            <div className="flex justify-end gap-2 mt-4">
              <button
                type="button"
                onClick={onClose}
                className="btn btn-ghost"
                disabled={isSubmitting}
              >
                <X className="w-5 h-5 mr-2" />
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  <>
                    <Check className="w-5 h-5 mr-2" />
                    {editingId ? "Update" : "Save"}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};