import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Swal from "sweetalert2";
import { Plus, Search, Edit, Trash2, Eye, Building2 } from "lucide-react";
import { restaurantApi } from "../../features/api/restaurantApi";
import type {
  TRestaurant,
  TRestaurantFormData,
} from "../../types/restaurant.types";

export const Restaurants = () => {
  const {
    data: restaurants = [],
    error,
    isLoading,
  } = restaurantApi.useFetchRestaurantsQuery();
  const [deleteRestaurant] = restaurantApi.useDeleteRestaurantMutation();
  const [createRestaurant] = restaurantApi.useCreateRestaurantMutation();
  const [updateRestaurant] = restaurantApi.useUpdateRestaurantMutation();

  const [selectedRestaurant, setSelectedRestaurant] = useState<TRestaurant | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<TRestaurantFormData>();

  const filteredRestaurants = restaurants.filter(
    (restaurant) =>
      restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      restaurant.city.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle form submission (create or update)
  const onSubmit = async (data: TRestaurantFormData) => {
    try {
      if (isEditing && selectedRestaurant) {
        await updateRestaurant({
          restaurantId: selectedRestaurant.id,
          restaurantItem: data,
        }).unwrap();
        toast.success("Restaurant updated successfully!");
      } else {
        await createRestaurant(data).unwrap();
        toast.success("Restaurant created successfully!");
      }
      closeFormModal();
    } catch (err) {
      toast.error(`Failed to ${isEditing ? "update" : "create"} restaurant`);
    }
  };

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await deleteRestaurant(id).unwrap();
        toast.success("Restaurant deleted successfully!");
      } catch (err) {
        toast.error("Failed to delete restaurant");
      }
    }
  };

  const openDetailsModal = (restaurant: TRestaurant) => {
    setSelectedRestaurant(restaurant);
    setIsDetailsModalOpen(true);
  };

  const openCreateModal = () => {
    setIsEditing(false);
    reset();
    setIsFormModalOpen(true);
  };

  const openEditModal = (restaurant: TRestaurant) => {
    setSelectedRestaurant(restaurant);
    setIsEditing(true);
    setValue("name", restaurant.name);
    setValue("streetAddress", restaurant.streetAddress);
    setValue("zipCode", restaurant.zipCode);
    setValue("cityId", restaurant.city.id);
    setIsFormModalOpen(true);
  };

  const closeDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedRestaurant(null);
  };

  const closeFormModal = () => {
    setIsFormModalOpen(false);
    setSelectedRestaurant(null);
    setIsEditing(false);
    reset();
  };

  if (isLoading) return <div className="text-center py-8">Loading restaurants...</div>;
  if (error) return (
    <div className="text-center py-8 text-error">
      Error loading restaurants
    </div>
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Restaurants Management</h1>

      {/* Search and Create */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="join flex-1">
          <input
            type="text"
            placeholder="Search restaurants..."
            className="input input-bordered join-item w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="btn join-item">
            <Search size={18} />
          </button>
        </div>
        <button
          onClick={openCreateModal}
          className="btn btn-primary"
        >
          <Plus size={18} className="mr-1" /> Add Restaurant
        </button>
      </div>

      {/* Restaurants Table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Address</th>
              <th>City</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRestaurants.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  No restaurants found
                </td>
              </tr>
            ) : (
              filteredRestaurants.map((restaurant) => (
                <tr key={restaurant.id}>
                  <td>{restaurant.id}</td>
                  <td>{restaurant.name}</td>
                  <td>{restaurant.streetAddress}</td>
                  <td>
                    {restaurant.city.name}, {restaurant.city.state.name}
                  </td>
                  <td className="flex gap-2">
                    <button
                      onClick={() => openDetailsModal(restaurant)}
                      className="btn btn-info btn-sm"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      onClick={() => openEditModal(restaurant)}
                      className="btn btn-warning btn-sm"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(restaurant.id)}
                      className="btn btn-error btn-sm"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Restaurant Details Modal */}
      {isDetailsModalOpen && selectedRestaurant && (
        <div className="modal modal-open">
          <div className="modal-box max-w-2xl">
            <h3 className="font-bold text-lg">Restaurant Details</h3>
            <div className="py-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold">Basic Information</h4>
                  <div className="space-y-2">
                    <p>
                      <span className="font-medium">Name:</span>{" "}
                      {selectedRestaurant.name}
                    </p>
                    <p>
                      <span className="font-medium">Address:</span>{" "}
                      {selectedRestaurant.streetAddress}
                    </p>
                    <p>
                      <span className="font-medium">Zip Code:</span>{" "}
                      {selectedRestaurant.zipCode}
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold">Location</h4>
                  <div className="space-y-2">
                    <p>
                      <span className="font-medium">City:</span>{" "}
                      {selectedRestaurant.city.name}
                    </p>
                    <p>
                      <span className="font-medium">State:</span>{" "}
                      {selectedRestaurant.city.state.name} (
                      {selectedRestaurant.city.state.code})
                    </p>
                  </div>
                </div>
              </div>
              <div className="divider"></div>
              <div className="flex items-center gap-2">
                <Building2 size={20} className="text-amber-500" />
                <span className="font-medium">
                  Restaurant ID: {selectedRestaurant.id}
                </span>
              </div>
            </div>
            <div className="modal-action">
              <button onClick={closeDetailsModal} className="btn">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create/Edit Form Modal */}
      {isFormModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">
              {isEditing ? "Edit Restaurant" : "Add New Restaurant"}
            </h3>
            <div className="py-4">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-4">
                  <div>
                    <label className="label">
                      <span className="label-text">Restaurant Name</span>
                    </label>
                    <input
                      type="text"
                      className="input input-bordered w-full"
                      {...register("name", { required: "Name is required" })}
                    />
                    {errors.name && (
                      <span className="text-error text-sm">
                        {errors.name.message}
                      </span>
                    )}
                  </div>
                  <div>
                    <label className="label">
                      <span className="label-text">Street Address</span>
                    </label>
                    <input
                      type="text"
                      className="input input-bordered w-full"
                      {...register("streetAddress", {
                        required: "Address is required",
                      })}
                    />
                    {errors.streetAddress && (
                      <span className="text-error text-sm">
                        {errors.streetAddress.message}
                      </span>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="label">
                        <span className="label-text">Zip Code</span>
                      </label>
                      <input
                        type="text"
                        className="input input-bordered w-full"
                        {...register("zipCode", {
                          required: "Zip code is required",
                        })}
                      />
                      {errors.zipCode && (
                        <span className="text-error text-sm">
                          {errors.zipCode.message}
                        </span>
                      )}
                    </div>
                    <div>
                      <label className="label">
                        <span className="label-text">City ID</span>
                      </label>
                      <input
                        type="number"
                        className="input input-bordered w-full"
                        {...register("cityId", {
                          required: "City ID is required",
                          valueAsNumber: true,
                        })}
                      />
                      {errors.cityId && (
                        <span className="text-error text-sm">
                          {errors.cityId.message}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="modal-action">
                  <button
                    type="button"
                    onClick={closeFormModal}
                    className="btn"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="loading loading-spinner"></span>
                    ) : isEditing ? "Update" : "Create"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};