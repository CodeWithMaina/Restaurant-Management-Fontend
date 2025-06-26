import { useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import Swal from "sweetalert2";
import { menuItemApi } from "../../features/api/menuItemApi";
import type { Category, MenuItemFormValues } from "../../types/menuItem.types";
import { FoodCard } from "../../components/FoodCard";
import { FoodModal } from "../../components/FoodModal";
import { Loading } from "../../components/Loading";

const categories: Category[] = [
  { id: 1, name: "Appetizers" },
  { id: 2, name: "Main Courses" },
  { id: 3, name: "Desserts" },
  { id: 4, name: "Beverages" },
  { id: 5, name: "Sides" },
];

interface MenuItemProps {
  restaurantId?: number; // Make restaurantId optional
}

export const MenuItem = ({ restaurantId }: MenuItemProps) => {
  const { data: allMenuItemsData, isLoading, isError, refetch } = 
    menuItemApi.useFetchMenuItemQuery();
  
  const [createMenuItem] = menuItemApi.useCreateMenuItemMutation();
  const [updateMenuItem] = menuItemApi.useUpdateMenuItemMutation();
  const [deleteMenuItem] = menuItemApi.useDeleteMenuItemMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleSubmit = async (data: MenuItemFormValues) => {
    try {
      const submissionData = restaurantId ? { ...data, restaurantId } : data;
      
      if (editingId) {
        await updateMenuItem({
          menuItemId: editingId,
          menuItem: { ...submissionData, id: editingId },
        }).unwrap();
        toast.success("Menu item updated successfully");
      } else {
        await createMenuItem(submissionData).unwrap();
        toast.success("Menu item created successfully");
      }
      setIsModalOpen(false);
      setEditingId(null);
      refetch();
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error("Error submitting form:", error);
    }
  };

  const handleEdit = (id: number) => {
    const itemToEdit = allMenuItemsData?.find(item => item.id === id);
    if (itemToEdit) {
      setEditingId(id);
      setIsModalOpen(true);
    }
  };

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f43f5e",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await deleteMenuItem({ menuItemId: id }).unwrap();
        toast.success("Menu item deleted successfully");
        refetch();
      } catch (error) {
        toast.error("Failed to delete menu item");
        console.error("Error deleting menu item:", error);
      }
    }
  };

  const handleToggleStatus = async (id: number) => {
    const item = allMenuItemsData?.find(i => i.id === id);
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

  if (isLoading) return <Loading/>;
  if (isError) return <div className="p-6 text-center text-error">Error loading menu items</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-base-content">Menu Management</h1>
        <button
          onClick={() => {
            setEditingId(null);
            setIsModalOpen(true);
          }}
          className="btn btn-primary"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Menu Item
        </button>
      </div>

      {allMenuItemsData?.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allMenuItemsData.map(item => (
            <FoodCard
              key={item.id}
              item={item}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onToggleStatus={handleToggleStatus}
              categories={categories}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">No menu items added yet.</p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn btn-primary"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Your First Item
          </button>
        </div>
      )}

      <FoodModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingId(null);
        }}
        onSubmit={handleSubmit}
        isSubmitting={false}
        editingId={editingId}
        restaurantId={restaurantId ?? 0}
        categories={categories}
      />
    </div>
  );
};