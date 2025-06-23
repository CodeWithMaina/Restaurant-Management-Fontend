import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import {
  Edit2,
  X,
  Check,
  MapPin,
  Phone,
  Mail,
  User,
  Home,
  Plus,
  Trash2,
} from "lucide-react";
import type { RootState } from "../app/store";
import { userApi } from "../features/api/userApi";
import { Loading } from "../components/Loading";
import type { TAddress } from "../types/user.types";

type FormData = {
  name: string;
  contactPhone: string;
  email: string;
};

export const Profile = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const parsedUser = typeof user === "string" ? JSON.parse(user) : user;
  const userId: number = parsedUser?.userId;

  const {
    data: userData,
    isLoading,
    isError,
    refetch,
  } = userApi.useFetchUserByIdQuery(userId, { skip: !userId });

  const [editMode, setEditMode] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<FormData>({
    defaultValues: {
      name: userData?.name || "",
      contactPhone: userData?.contactPhone || "",
      email: userData?.email || "",
    },
  });

  const [updateUser] = userApi.useUpdatingUserDataMutation();

  const onSubmit = async (data: FormData) => {
    try {
      await updateUser({
        userId: userId,
        user: {
          name: data.name,
          contactPhone: data.contactPhone,
          email: data.email,
        },
      }).unwrap();
      refetch();
      setEditMode(false);
    } catch (err) {
      console.error("Failed to update user:", err);
      console.error('Failed to update user:', err);
        alert('Failed to update profile. Please try again later.');
    }
  };

  const handleEditToggle = () => {
    if (editMode) {
      reset();
    }
    setEditMode(!editMode);
  };

  if (isLoading) return <Loading />;
  if (isError)
    return (
      <div className="alert alert-error shadow-lg">
        <div>
          <X className="h-6 w-6" />
          <span>Error loading profile data</span>
        </div>
      </div>
    );

  return (
    <div className="container w-[100%]">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold flex items-center gap-2">
          <User className="w-8 h-8" />
          Profile Information
        </h2>
        <button onClick={handleEditToggle} className="btn btn-primary gap-2">
          {editMode ? (
            <>
              <X className="w-5 h-5" />
              Cancel
            </>
          ) : (
            <>
              <Edit2 className="w-5 h-5" />
              Edit Profile
            </>
          )}
        </button>
      </div>

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          {editMode ? (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name Field */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Full Name
                    </span>
                  </label>
                  <input
                    type="text"
                    className={`input input-bordered ${
                      errors.name && "input-error"
                    }`}
                    {...register("name", { required: "Name is required" })}
                  />
                  {errors.name && (
                    <label className="label">
                      <span className="label-text-alt text-error">
                        {errors.name.message}
                      </span>
                    </label>
                  )}
                </div>

                {/* Phone Field */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Phone Number
                      {userData?.phoneVerified && (
                        <span className="badge badge-success gap-1">
                          <Check className="w-3 h-3" />
                          Verified
                        </span>
                      )}
                    </span>
                  </label>
                  <input
                    type="tel"
                    className={`input input-bordered ${
                      errors.contactPhone && "input-error"
                    }`}
                    {...register("contactPhone", {
                      required: "Phone is required",
                      pattern: {
                        value: /^[0-9]{10,15}$/,
                        message: "Invalid phone number",
                      },
                    })}
                  />
                  {errors.contactPhone && (
                    <label className="label">
                      <span className="label-text-alt text-error">
                        {errors.contactPhone.message}
                      </span>
                    </label>
                  )}
                </div>

                {/* Email Field */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email
                      {userData?.emailVerified && (
                        <span className="badge badge-success gap-1">
                          <Check className="w-3 h-3" />
                          Verified
                        </span>
                      )}
                    </span>
                  </label>
                  <input
                    type="email"
                    className={`input input-bordered ${
                      errors.email && "input-error"
                    }`}
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                  />
                  {errors.email && (
                    <label className="label">
                      <span className="label-text-alt text-error">
                        {errors.email.message}
                      </span>
                    </label>
                  )}
                </div>

                {/* User Type (Readonly) */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">User Type</span>
                  </label>
                  <div className="input input-bordered flex items-center">
                    {userData?.userType}
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={handleEditToggle}
                  className="btn btn-ghost gap-2"
                >
                  <X className="w-5 h-5" />
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary gap-2"
                  disabled={!isDirty}
                >
                  <Check className="w-5 h-5" />
                  Save Changes
                </button>
              </div>
            </form>
          ) : (
            <>
              {/* View Mode */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Name */}
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-base-200">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Full Name
                    </h3>
                    <p className="text-lg font-medium">{userData?.name}</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-base-200">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-medium text-gray-500">
                        Phone Number
                      </h3>
                      {userData?.phoneVerified && (
                        <span className="badge badge-success gap-1">
                          <Check className="w-3 h-3" />
                          Verified
                        </span>
                      )}
                    </div>
                    <p className="text-lg font-medium">
                      {userData?.contactPhone}
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-base-200">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-medium text-gray-500">
                        Email
                      </h3>
                      {userData?.emailVerified && (
                        <span className="badge badge-success gap-1">
                          <Check className="w-3 h-3" />
                          Verified
                        </span>
                      )}
                    </div>
                    <p className="text-lg font-medium">{userData?.email}</p>
                  </div>
                </div>

                {/* User Type */}
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-base-200">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      User Type
                    </h3>
                    <p className="text-lg font-medium capitalize">
                      {userData?.userType}
                    </p>
                  </div>
                </div>
              </div>

              {/* Addresses Section */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    <MapPin className="w-6 h-6" />
                    Addresses
                  </h3>
                  <button
                    onClick={() => setShowAddressForm(true)}
                    className="btn btn-sm btn-primary gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add Address
                  </button>
                </div>

                {showAddressForm && (
                  <div className="card bg-base-200 p-4 mb-4">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-medium">Add New Address</h4>
                      <button
                        onClick={() => setShowAddressForm(false)}
                        className="btn btn-circle btn-sm btn-ghost"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    {/* Address form would go here */}
                    <div className="flex justify-end gap-2">
                      <button className="btn btn-ghost">Cancel</button>
                      <button className="btn btn-primary">Save Address</button>
                    </div>
                  </div>
                )}

                {userData?.addresses?.length ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {userData.addresses.map((address: TAddress) => (
                      <div key={address.id} className="card bg-base-200">
                        <div className="card-body p-4">
                          <div className="flex justify-between items-start">
                            <div className="flex items-center gap-2 mb-2">
                              <Home className="w-5 h-5 text-primary" />
                              <h4 className="card-title">
                                {address.streetAddress1}
                              </h4>
                            </div>
                            <div className="flex gap-2">
                              <button className="btn btn-circle btn-sm btn-ghost">
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button className="btn btn-circle btn-sm btn-ghost text-error">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          {address.streetAddress2 && (
                            <p className="text-sm">{address.streetAddress2}</p>
                          )}
                          <p className="text-sm">
                            {address.city.name}, {address.city.state.code}{" "}
                            {address.zipCode}
                          </p>
                          {address.deliveryInstructions && (
                            <div className="mt-3 pt-3 border-t border-base-300">
                              <p className="text-sm font-medium">
                                Delivery Instructions:
                              </p>
                              <p className="text-sm">
                                {address.deliveryInstructions}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="alert alert-info">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5" />
                      <span>No addresses saved yet.</span>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
