// UserModal.tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { MapPin, Check, X, Save, Loader2 } from "lucide-react";
import type { TUser } from "../../features/api/userApi";

const userSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  contactPhone: z.string().min(10, "Phone must be at least 10 digits"),
});

type UserFormData = z.infer<typeof userSchema>;

interface UserModalProps {
  user: TUser;
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: UserFormData) => Promise<void>;
}

export const UserModal = ({ user, isOpen, onClose, onSave }: UserModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      contactPhone: user.contactPhone,
    },
  });

  const onSubmit = async (data: UserFormData) => {
    try {
      await onSave(data);
      toast.success("User updated successfully");
      onClose();
    } catch (error) {
      toast.error("Failed to update user");
      console.log(error)
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-base-100 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">User Details</h3>
            <button
              onClick={onClose}
              className="btn btn-sm btn-circle btn-ghost"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  className={`input input-bordered ${errors.name ? "input-error" : ""}`}
                  {...register("name")}
                />
                {errors.name && (
                  <span className="text-error text-sm">{errors.name.message}</span>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    className={`input input-bordered w-full ${errors.email ? "input-error" : ""}`}
                    {...register("email")}
                  />
                  <span className="absolute right-3 top-3">
                    {user.emailVerified ? (
                      <Check className="h-5 w-5 text-green-500" />
                    ) : (
                      <X className="h-5 w-5 text-red-500" />
                    )}
                  </span>
                </div>
                {errors.email && (
                  <span className="text-error text-sm">{errors.email.message}</span>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Phone</span>
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    className={`input input-bordered w-full ${errors.contactPhone ? "input-error" : ""}`}
                    {...register("contactPhone")}
                  />
                  <span className="absolute right-3 top-3">
                    {user.phoneVerified ? (
                      <Check className="h-5 w-5 text-green-500" />
                    ) : (
                      <X className="h-5 w-5 text-red-500" />
                    )}
                  </span>
                </div>
                {errors.contactPhone && (
                  <span className="text-error text-sm">{errors.contactPhone.message}</span>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">User Type</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  value={user.userType.replace('_', ' ')}
                  readOnly
                />
              </div>
            </div>

            {/* Address Section */}
            {user.addresses?.length > 0 && (
              <div className="mb-6">
                <h4 className="font-bold mb-2 flex items-center gap-2">
                  <MapPin className="h-5 w-5" /> Primary Address
                </h4>
                <div className="bg-base-200 p-4 rounded-lg">
                  <p>{user.addresses[0].streetAddress1}</p>
                  {user.addresses[0].streetAddress2 && (
                    <p>{user.addresses[0].streetAddress2}</p>
                  )}
                  <p>
                    {user.addresses[0].city.name}, {user.addresses[0].zipCode}
                  </p>
                  {user.addresses[0].deliveryInstructions && (
                    <p className="mt-2">
                      <span className="font-semibold">Delivery Instructions:</span>{" "}
                      {user.addresses[0].deliveryInstructions}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="stats bg-base-200">
                <div className="stat">
                  <div className="stat-title">Orders</div>
                  <div className="stat-value">{user.orders?.length || 0}</div>
                </div>
              </div>

              {user.userType === 'restaurant_owner' && (
                <div className="stats bg-base-200">
                  <div className="stat">
                    <div className="stat-title">Restaurants</div>
                    <div className="stat-value">{user.ownedRestaurants?.length || 0}</div>
                  </div>
                </div>
              )}

              <div className="stats bg-base-200">
                <div className="stat">
                  <div className="stat-title">Comments</div>
                  <div className="stat-value">{user.comments?.length || 0}</div>
                </div>
              </div>

              <div className="stats bg-base-200">
                <div className="stat">
                  <div className="stat-title">Member Since</div>
                  <div className="stat-value">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="btn btn-ghost"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-warning"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                <span className="ml-2">Save Changes</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};