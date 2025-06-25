import { useForm } from "react-hook-form";
import { userApi, type TAddress } from "../../features/api/userApi";

type AddressModalProps = {
  isOpen: boolean;
  onClose: () => void;
  address: TAddress | null;
  userId: number;
  onSuccess: () => void;
};

type AddressFormData = {
  streetAddress1: string;
  streetAddress2: string;
  city: string;
  state: string;
  zipCode: string;
  deliveryInstructions: string;
  isDefault: boolean;
};

export const AddressModal = ({
  isOpen,
  onClose,
  address,
  userId,
  onSuccess,
}: AddressModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<AddressFormData>({
    defaultValues: {
      streetAddress1: address?.streetAddress1 || "",
      streetAddress2: address?.streetAddress2 || "",
      city: address?.city?.name || "",
      state: address?.city?.state?.code || "",
      zipCode: address?.zipCode || "",
      deliveryInstructions: address?.deliveryInstructions || "",
      isDefault: false,
    },
  });

  const [updateAddress] = userApi.useUpdateUserAddressMutation();
  const [createAddress] = userApi.useCreateUserAddressMutation();

  const onSubmit = async (data: AddressFormData) => {
    try {
      const addressData = {
        streetAddress1: data.streetAddress1,
        streetAddress2: data.streetAddress2,
        city: {
          name: data.city,
          state: {
            code: data.state,
            name: data.state,
          },
        },
        zipCode: data.zipCode,
        deliveryInstructions: data.deliveryInstructions,
        isDefault: data.isDefault,
      };

      if (address) {
        await updateAddress({
          userId,
          addressId: address.id,
          address: addressData,
        }).unwrap();
      } else {
        await createAddress({
          userId,
          address: addressData,
        }).unwrap();
      }

      onSuccess();
    } catch (err) {
      console.error("Failed to save address:", err);
      alert("Failed to save address. Please try again later.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-base-100 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">
              {address ? "Edit Address" : "Add New Address"}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              &times;
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              {/* Street Address 1 */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Street Address 1</span>
                </label>
                <input
                  type="text"
                  className={`input input-bordered ${
                    errors.streetAddress1 && "input-error"
                  }`}
                  {...register("streetAddress1", {
                    required: "Street address is required",
                  })}
                />
                {errors.streetAddress1 && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {errors.streetAddress1.message}
                    </span>
                  </label>
                )}
              </div>

              {/* Street Address 2 */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Street Address 2 (Optional)</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  {...register("streetAddress2")}
                />
              </div>

              {/* City/State/Zip */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">City</span>
                  </label>
                  <input
                    type="text"
                    className={`input input-bordered ${
                      errors.city && "input-error"
                    }`}
                    {...register("city", {
                      required: "City is required",
                    })}
                  />
                  {errors.city && (
                    <label className="label">
                      <span className="label-text-alt text-error">
                        {errors.city.message}
                      </span>
                    </label>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">State</span>
                  </label>
                  <select
                    className={`select select-bordered ${
                      errors.state && "select-error"
                    }`}
                    {...register("state", {
                      required: "State is required",
                    })}
                  >
                    <option value="">Select State</option>
                    <option value="CA">California</option>
                    <option value="NY">New York</option>
                    <option value="TX">Texas</option>
                    {/* Add more states as needed */}
                  </select>
                  {errors.state && (
                    <label className="label">
                      <span className="label-text-alt text-error">
                        {errors.state.message}
                      </span>
                    </label>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">ZIP Code</span>
                  </label>
                  <input
                    type="text"
                    className={`input input-bordered ${
                      errors.zipCode && "input-error"
                    }`}
                    {...register("zipCode", {
                      required: "ZIP code is required",
                      pattern: {
                        value: /^\d{5}(-\d{4})?$/,
                        message: "Invalid ZIP code",
                      },
                    })}
                  />
                  {errors.zipCode && (
                    <label className="label">
                      <span className="label-text-alt text-error">
                        {errors.zipCode.message}
                      </span>
                    </label>
                  )}
                </div>
              </div>

              {/* Delivery Instructions */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">
                    Delivery Instructions (Optional)
                  </span>
                </label>
                <textarea
                  className="textarea textarea-bordered"
                  {...register("deliveryInstructions")}
                  rows={3}
                />
              </div>

              {/* Default Address */}
              <div className="form-control">
                <label className="label cursor-pointer justify-start gap-3">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary"
                    {...register("isDefault")}
                  />
                  <span className="label-text">Set as default address</span>
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="btn btn-ghost"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={!isDirty}
              >
                Save Address
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};