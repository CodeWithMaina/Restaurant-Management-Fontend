import { useState, useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Pencil, Trash2, X, Check } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { menuItemApi } from "../../features/api/menuItemApi";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";

// Define the menu item type based on your API response
type MenuItem = {
  id: number;
  name: string;
  restaurantId: number;
  categoryId: number;
  description: string;
  ingredients: string;
  price: number;
  active: boolean;
  createdAt?: string;
  updatedAt?: string;
};

const menuItemSchema = z.object({
  name: z.string().min(1, "Name is required"),
  restaurantId: z.number().min(1, "Restaurant is required"),
  categoryId: z.number().min(1, "Category is required"),
  description: z.string().min(1, "Description is required"),
  ingredients: z.string().min(1, "Ingredients are required"),
  price: z
    .union([
      z.number().positive("Price must be positive"),
      z.string().regex(/^\d+(\.\d{1,2})?$/, "Invalid price format"),
    ])
    .transform((val) => (typeof val === "string" ? parseFloat(val) : val))
    .pipe(z.number().positive("Price must be positive")), // Ensure output is number
  active: z.boolean().default(true),
});

type MenuItemFormValues = {
  name: string;
  restaurantId: number;
  categoryId: number;
  description: string;
  ingredients: string;
  price: number; // This should be number only after transformation
  active: boolean;
};

// Mock data - replace with actual data from your backend/context
const categories = [
  { id: 1, name: "Appetizers" },
  { id: 2, name: "Main Courses" },
  { id: 3, name: "Desserts" },
  { id: 4, name: "Beverages" },
  { id: 5, name: "Sides" },
];

const restaurants = [
  { id: 1, name: "Main Restaurant" },
  { id: 2, name: "Downtown Location" },
];

export const Food = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  // Get restaurant id
  const { restaurantId } = useSelector((state: RootState) => state.auth);

  // API hooks with proper typing
  const {
    data: menuItemsData,
    isLoading,
    isError,
    refetch,
  } = menuItemApi.useFetchMenuItemQuery();

  console.log(menuItemsData);
  const [createMenuItem] = menuItemApi.useCreateMenuItemMutation();
  const [updateMenuItem] = menuItemApi.useUpdateMenuItemMutation();
  const [deleteMenuItem] = menuItemApi.useDeleteMenuItemMutation();

  // Cast the API response to our MenuItem type
  const menuItems: MenuItem[] = menuItemsData
    ? (menuItemsData as unknown as MenuItem[])
    : [];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<MenuItemFormValues>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(menuItemSchema) as any, // Temporary workaround
    defaultValues: {
      active: true,
      restaurantId: Number(restaurantId),
    },
  });

  useEffect(() => {
    if (isError) {
      toast.error("Failed to load menu items");
    }
  }, [isError]);

  const onSubmit: SubmitHandler<MenuItemFormValues> = async (data) => {
    try {
      if (editingId) {
        await updateMenuItem({
          menuItemId: editingId,
          menuItem: { ...data, id: editingId, restaurantId },
        }).unwrap();
        toast.success("Menu item updated successfully");
      } else {
        await createMenuItem({ ...data, restaurantId }).unwrap();
        toast.success("Menu item created successfully");
      }
      reset();
      setIsAdding(false);
      setEditingId(null);
      refetch();
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error("Error submitting form:", error);
    }
  };

  const handleEdit = (id: number) => {
    const itemToEdit = menuItems.find((item: MenuItem) => item.id === id);
    if (itemToEdit) {
      reset({
        ...itemToEdit,
        price:
          typeof itemToEdit.price === "string"
            ? parseFloat(itemToEdit.price)
            : itemToEdit.price,
      });
      setEditingId(id);
      setIsAdding(true);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteMenuItem({ menuItemId: id }).unwrap();
      toast.success("Menu item deleted successfully");
      refetch();
    } catch (error) {
      toast.error("Failed to delete menu item");
      console.error("Error deleting menu item:", error);
    }
  };

  const toggleStatus = async (id: number) => {
    const item = menuItems.find((i: MenuItem) => i.id === id);
    if (!item) return;

    try {
      await updateMenuItem({
        menuItemId: id,
        menuItem: { active: !item.active },
      }).unwrap();
      toast.success(`Menu item ${item.active ? "deactivated" : "activated"}`);
      refetch();
    } catch (error) {
      toast.error("Failed to update menu item status");
      console.error("Error toggling status:", error);
    }
  };

  const cancelForm = () => {
    reset();
    setIsAdding(false);
    setEditingId(null);
  };

  if (isLoading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="p-6 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-base-content">
          Menu Management
        </h1>

        {!isAdding ? (
          <button
            onClick={() => setIsAdding(true)}
            className="btn btn-primary mb-6"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Menu Item
          </button>
        ) : (
          <div className="card bg-base-100 shadow-md mb-6">
            <div className="card-body">
              <h2 className="card-title text-base-content">
                {editingId ? "Edit Menu Item" : "Add New Menu Item"}
              </h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-base-content">
                        Name*
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="Item name"
                      className={`input input-bordered ${
                        errors.name ? "input-error" : ""
                      }`}
                      {...register("name")}
                    />
                    {errors.name && (
                      <span className="text-error text-sm mt-1">
                        {errors.name.message}
                      </span>
                    )}
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-base-content">
                        Category*
                      </span>
                    </label>
                    <select
                      className={`select select-bordered ${
                        errors.categoryId ? "select-error" : ""
                      }`}
                      {...register("categoryId", { valueAsNumber: true })}
                    >
                      <option value="">Select a category</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                    {errors.categoryId && (
                      <span className="text-error text-sm mt-1">
                        {errors.categoryId.message}
                      </span>
                    )}
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-base-content">
                        Restaurant*
                      </span>
                    </label>
                    <select
                      className={`select select-bordered ${
                        errors.restaurantId ? "select-error" : ""
                      }`}
                      {...register("restaurantId", { valueAsNumber: true })}
                    >
                      {restaurants.map((restaurant) => (
                        <option key={restaurant.id} value={restaurant.id}>
                          {restaurant.name}
                        </option>
                      ))}
                    </select>
                    {errors.restaurantId && (
                      <span className="text-error text-sm mt-1">
                        {errors.restaurantId.message}
                      </span>
                    )}
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-base-content">
                        Price*
                      </span>
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                        $
                      </span>
                      <input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        className={`input input-bordered pl-8 ${
                          errors.price ? "input-error" : ""
                        }`}
                        {...register("price", { valueAsNumber: true })}
                      />
                    </div>
                    {errors.price && (
                      <span className="text-error text-sm mt-1">
                        {errors.price.message}
                      </span>
                    )}
                  </div>

                  <div className="form-control">
                    <label className="label cursor-pointer">
                      <span className="label-text text-base-content">
                        Active
                      </span>
                      <input
                        type="checkbox"
                        className="toggle toggle-primary"
                        {...register("active")}
                      />
                    </label>
                  </div>

                  <div className="form-control md:col-span-2">
                    <label className="label">
                      <span className="label-text text-base-content">
                        Description*
                      </span>
                    </label>
                    <textarea
                      placeholder="Item description"
                      className={`textarea textarea-bordered h-24 ${
                        errors.description ? "textarea-error" : ""
                      }`}
                      {...register("description")}
                    />
                    {errors.description && (
                      <span className="text-error text-sm mt-1">
                        {errors.description.message}
                      </span>
                    )}
                  </div>

                  <div className="form-control md:col-span-2">
                    <label className="label">
                      <span className="label-text text-base-content">
                        Ingredients*
                      </span>
                    </label>
                    <textarea
                      placeholder="List ingredients, separated by commas"
                      className={`textarea textarea-bordered h-24 ${
                        errors.ingredients ? "textarea-error" : ""
                      }`}
                      {...register("ingredients")}
                    />
                    <label className="label">
                      <span className="label-text-alt text-gray-500">
                        Example: lettuce, croutons, cheese
                      </span>
                    </label>
                    {errors.ingredients && (
                      <span className="text-error text-sm mt-1">
                        {errors.ingredients.message}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex justify-end gap-2 mt-4">
                  <button
                    type="button"
                    onClick={cancelForm}
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
        )}

        {menuItems.length > 0 ? (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-base-content mb-4">
              Menu Items ({menuItems.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {menuItems
                .filter((item) => item.restaurantId === restaurantId)
                .map((item) => (
                  <div
                    key={item.id}
                    className={`card bg-base-100 shadow-md hover:shadow-lg transition-shadow ${
                      !item.active ? "opacity-70" : ""
                    }`}
                  >
                    <div className="card-body">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="card-title text-base-content">
                            {item.name}
                            {!item.active && (
                              <span className="badge badge-neutral badge-sm ml-2">
                                Inactive
                              </span>
                            )}
                          </h3>
                          <p className="text-gray-500">
                            {categories.find((c) => c.id === item.categoryId)
                              ?.name || "Uncategorized"}
                          </p>
                        </div>
                        <span className="text-lg font-semibold text-base-content">
                          $
                          {typeof item.price === "string"
                            ? parseFloat(item.price).toFixed(2)
                            : item.price.toFixed(2)}
                        </span>
                      </div>

                      <div className="mt-2">
                        <p className="text-base-content">{item.description}</p>
                        <div className="mt-2">
                          <h4 className="text-sm font-semibold text-base-content">
                            Ingredients:
                          </h4>
                          <p className="text-sm text-gray-600">
                            {item.ingredients}
                          </p>
                        </div>
                      </div>

                      <div className="card-actions justify-between items-center mt-4">
                        <button
                          onClick={() => toggleStatus(item.id)}
                          className={`btn btn-sm ${
                            item.active ? "btn-ghost" : "btn-outline"
                          }`}
                        >
                          {item.active ? "Deactivate" : "Activate"}
                        </button>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(item.id)}
                            className="btn btn-sm btn-ghost"
                          >
                            <Pencil className="w-4 h-4 mr-1" />
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="btn btn-sm btn-ghost text-error"
                          >
                            <Trash2 className="w-4 h-4 mr-1" />
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No menu items added yet.</p>
            {!isAdding && (
              <button
                onClick={() => setIsAdding(true)}
                className="btn btn-primary mt-4"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Your First Item
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
