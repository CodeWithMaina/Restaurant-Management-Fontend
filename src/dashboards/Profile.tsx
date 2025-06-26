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
  Camera,
  Star,
  Calendar,
  ShoppingBag
} from "lucide-react";
import type { RootState } from "../app/store";
import { userApi } from "../features/api/userApi";
import { Loading } from "../components/Loading";
import type { TUserFormData } from "../types/user.types";
import type { TAddress } from "../types/address.types";

// type FormData = {
//   name: string;
//   contactPhone: string;
//   email: string;
// };

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
  const [activeTab, setActiveTab] = useState('profile');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<TUserFormData>({
    defaultValues: {
      name: userData?.name || "",
      contactPhone: userData?.contactPhone || "",
      email: userData?.email || "",
    },
  });

  const [updateUser] = userApi.useUpdatingUserDataMutation();

  // Cloudinary
  // const cloud_name="";
  // const preset_key="";

  const onSubmit = async (data: TUserFormData) => {
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
      alert('Failed to update profile. Please try again later.');
    }
  };

  const handleEditToggle = () => {
    if (editMode) {
      reset();
    }
    setEditMode(!editMode);
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
    // { id: 'security', label: 'Security', icon: Shield },
    // { id: 'preferences', label: 'Preferences', icon: Settings }
  ];

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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center gap-6 p-6 bg-gray-800/50 rounded-2xl border border-gray-700/50">
            {/* Profile Picture */}
            <div className="relative group">
              <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center border-4 border-yellow-400/20">
                <User className="w-12 h-12 text-gray-400" />
              </div>
              <button className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="w-6 h-6 text-white" />
              </button>
              {userData?.userType === 'admin' && (
                <div className="absolute -top-2 -right-2 bg-yellow-400 rounded-full p-1">
                  <Star className="w-4 h-4 text-black fill-black" />
                </div>
              )}
            </div>

            {/* User Info */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold text-white">{userData?.name}</h1>
                <span className="px-3 py-1 bg-yellow-400/20 text-yellow-400 text-sm font-medium rounded-full capitalize">
                  {userData?.userType}
                </span>
              </div>
              <p className="text-gray-400 mb-3">{userData?.email}</p>
              <div className="flex flex-wrap gap-4 text-sm text-gray-300">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Member since {new Date(userData?.createdAt || '').getFullYear()}
                </span>
                <span className="flex items-center gap-1">
                  <ShoppingBag className="w-4 h-4" />
                  {userData?.orders?.length || 0} orders
                </span>
              </div>
            </div>

            {/* Action Button */}
            <button 
              onClick={handleEditToggle}
              className="px-6 py-3 bg-yellow-400 text-black font-medium rounded-xl hover:bg-yellow-500 transition-colors flex items-center gap-2"
            >
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
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-gray-800/50 p-1 rounded-xl border border-gray-700/50">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-yellow-400 text-black'
                      : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {activeTab === 'profile' && (
              <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50">
                <h2 className="text-xl font-semibold text-white mb-6">Personal Information</h2>
                
                {editMode ? (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          <User className="w-4 h-4 inline mr-2" />
                          Full Name
                        </label>
                        <input
                          type="text"
                          className={`w-full px-4 py-3 bg-gray-700 border ${
                            errors.name ? "border-red-500" : "border-gray-600"
                          } rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 transition-colors`}
                          {...register("name", { required: "Name is required" })}
                        />
                        {errors.name && (
                          <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          <Phone className="w-4 h-4 inline mr-2" />
                          Phone Number
                          {userData?.phoneVerified && (
                            <Check className="w-4 h-4 inline ml-2 text-green-400" />
                          )}
                        </label>
                        <input
                          type="tel"
                          className={`w-full px-4 py-3 bg-gray-700 border ${
                            errors.contactPhone ? "border-red-500" : "border-gray-600"
                          } rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 transition-colors`}
                          {...register("contactPhone", {
                            required: "Phone is required",
                            pattern: {
                              value: /^[0-9]{10,15}$/,
                              message: "Invalid phone number",
                            },
                          })}
                        />
                        {errors.contactPhone && (
                          <p className="mt-1 text-sm text-red-400">{errors.contactPhone.message}</p>
                        )}
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          <Mail className="w-4 h-4 inline mr-2" />
                          Email Address
                          {userData?.emailVerified && (
                            <Check className="w-4 h-4 inline ml-2 text-green-400" />
                          )}
                        </label>
                        <input
                          type="email"
                          className={`w-full px-4 py-3 bg-gray-700 border ${
                            errors.email ? "border-red-500" : "border-gray-600"
                          } rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 transition-colors`}
                          {...register("email", {
                            required: "Email is required",
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: "Invalid email address",
                            },
                          })}
                        />
                        {errors.email && (
                          <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-6 border-t border-gray-700">
                      <button
                        type="button"
                        onClick={handleEditToggle}
                        className="px-6 py-3 border border-gray-600 text-gray-300 font-medium rounded-xl hover:bg-gray-700/50 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-3 bg-yellow-400 text-black font-medium rounded-xl hover:bg-yellow-500 transition-colors flex items-center gap-2"
                        disabled={!isDirty}
                      >
                        <Check className="w-5 h-5" />
                        Save Changes
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="grid md:grid-cols-2 gap-6">
                    {[
                      { icon: User, label: 'Full Name', value: userData?.name },
                      { icon: Phone, label: 'Phone Number', value: userData?.contactPhone, verified: userData?.phoneVerified },
                      { icon: Mail, label: 'Email Address', value: userData?.email, verified: userData?.emailVerified },
                      { icon: User, label: 'Account Type', value: userData?.userType, capitalize: true }
                    ].map((field, index) => {
                      const Icon = field.icon;
                      return (
                        <div key={index} className="p-4 bg-gray-700/30 rounded-xl">
                          <div className="flex items-center gap-2 mb-2">
                            <Icon className="w-5 h-5 text-yellow-400" />
                            <span className="text-sm font-medium text-gray-300">{field.label}</span>
                            {field.verified && (
                              <Check className="w-4 h-4 text-green-400" />
                            )}
                          </div>
                          <p className={`text-white font-medium ${field.capitalize ? 'capitalize' : ''}`}>
                            {field.value}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'addresses' && (
              <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-white">Delivery Addresses</h2>
                  <button
                    onClick={() => setShowAddressForm(true)}
                    className="px-4 py-2 bg-yellow-400 text-black font-medium rounded-lg hover:bg-yellow-500 transition-colors flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add Address
                  </button>
                </div>

                {showAddressForm && (
                  <div className="mb-6 p-4 bg-gray-700/30 rounded-xl border border-gray-600">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-medium text-white">Add New Address</h3>
                      <button
                        onClick={() => setShowAddressForm(false)}
                        className="p-1 hover:bg-gray-600 rounded-lg transition-colors"
                      >
                        <X className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <input
                        type="text"
                        placeholder="Street Address"
                        className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400"
                      />
                      <input
                        type="text"
                        placeholder="Apt, Suite, etc."
                        className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400"
                      />
                      <input
                        type="text"
                        placeholder="City"
                        className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400"
                      />
                      <input
                        type="text"
                        placeholder="ZIP Code"
                        className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400"
                      />
                    </div>
                    
                    <textarea
                      placeholder="Delivery instructions (optional)"
                      rows={3}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 mb-4"
                    />
                    
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => setShowAddressForm(false)}
                        className="px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700/50 transition-colors"
                      >
                        Cancel
                      </button>
                      <button className="px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition-colors">
                        Save Address
                      </button>
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  {userData?.addresses?.length ? (
                    userData.addresses.map((address: TAddress) => (
                      <div key={address.id} className="p-4 bg-gray-700/30 rounded-xl border border-gray-600/50 hover:border-gray-500/50 transition-colors">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-yellow-400/10 rounded-lg">
                              <Home className="w-5 h-5 text-yellow-400" />
                            </div>
                            <div>
                              <h3 className="font-medium text-white">{address.streetAddress1}</h3>
                              {address.streetAddress2 && (
                                <p className="text-sm text-gray-400">{address.streetAddress2}</p>
                              )}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button className="p-2 text-gray-400 hover:text-yellow-400 hover:bg-yellow-400/10 rounded-lg transition-colors">
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-300 mb-2">
                          {address.city.name}, {address.city.state.code} {address.zipCode}
                        </p>
                        
                        {address.deliveryInstructions && (
                          <div className="pt-3 border-t border-gray-600">
                            <p className="text-sm text-gray-400">
                              <strong>Instructions:</strong> {address.deliveryInstructions}
                            </p>
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="p-4 bg-gray-700/30 rounded-xl border border-gray-600/50 text-center">
                      <MapPin className="w-8 h-8 mx-auto text-gray-500 mb-2" />
                      <p className="text-gray-400">No addresses saved yet</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Account Stats */}
            <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-white mb-4">Account Overview</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Total Orders</span>
                  <span className="font-semibold text-yellow-400">{userData?.orders?.length || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Account Status</span>
                  <span className="font-semibold text-green-400 capitalize">{userData?.userType}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Member Since</span>
                  <span className="font-semibold text-white">
                    {new Date(userData?.createdAt || '').getFullYear()}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            {/* <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center gap-3 p-3 text-left text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-lg transition-colors">
                  <Bell className="w-5 h-5 text-yellow-400" />
                  <span>Notification Settings</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 text-left text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-lg transition-colors">
                  <Lock className="w-5 h-5 text-yellow-400" />
                  <span>Privacy & Security</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 text-left text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-lg transition-colors">
                  <CreditCard className="w-5 h-5 text-yellow-400" />
                  <span>Payment Methods</span>
                </button>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};