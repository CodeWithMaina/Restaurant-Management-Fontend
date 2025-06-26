import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import type { TUser } from "../../types/user.types";

// types/user.types.ts

// State type
export type TState = {
  id: number;
  code: string;
  name: string;
};

// City type
export type TCity = {
  id: number;
  name: string;
  stateId: number;
  state: TState;
};

// Address type
export type TAddress = {
  id: number;
  streetAddress1: string;
  streetAddress2: string | null;
  city: TCity;
  cityId: number;
  zipCode: string;
  deliveryInstructions: string | null;
  userId: number;
  createdAt: string;
  updatedAt: string;
};

// Comment type
export type TComment = {
  id: number;
  commentText: string;
  isPraise: boolean;
  isComplaint: boolean;
  orderId: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
};

// Order Item type
export type TOrderItem = {
  id: number;
  menuItemId: number;
  orderId: number;
  quantity: number;
  price: string;
  itemPrice: string;
  comment: string | null;
};

// Order Status type
export type TOrderStatus = {
  id: number;
  orderId: number;
  statusCatalogId: number;
  createdAt: string;
};

// Order type
export type TOrder = {
  id: number;
  userId: number;
  restaurantId: number;
  deliveryAddressId: number;
  driverId: number | null;
  finalPrice: string;
  price: string;
  discount: string;
  comment: string | null;
  estimatedDeliveryTime: string;
  actualDeliveryTime: string | null;
  createdAt: string;
  updatedAt: string;
  orderItems: TOrderItem[];
  statuses: TOrderStatus[];
};

// Restaurant type
export type TRestaurant = {
  id: number;
  name: string;
  streetAddress: string;
  cityId: number;
  zipCode: string;
  createdAt: string;
  updatedAt: string;
};

// Owned Restaurant type
export type TOwnedRestaurant = {
  id: number;
  restaurantId: number;
  ownerId: number;
  restaurant: TRestaurant;
};

// User type
export type TUser = {
  id: number;
  name: string;
  email: string;
  contactPhone: string;
  confirmationCode: string;
  password: string;
  userType: "customer" | "driver" | "restaurant_owner" | "admin";
  phoneVerified: boolean;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  addresses: TAddress[];
  comments: TComment[];
  orders: TOrder[];
  ownedRestaurants: TOwnedRestaurant[];
  driver: null;
};

// For forms and API responses
export type TUserProfile = Pick<
  TUser,
  "id" | "name" | "email" | "contactPhone" | "userType"
> & {
  phoneVerified: boolean;
  emailVerified: boolean;
};

// For address forms
export type TAddressFormData = {
  streetAddress1: string;
  streetAddress2?: string;
  city: string;
  state: string;
  zipCode: string;
  deliveryInstructions?: string;
  isDefault: boolean;
};

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/" }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    // Fetch all users
    fetchAllUsers: builder.query<TUser[], void>({
      query: () => "users",
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: "User" as const, id })), "User"]
          : ["User"],
    }),
    // Fetch a user data by ID
    fetchUserById: builder.query({
      query: (userId) => `users/${userId}`,
    }),
    // Updating User Data
    updatingUserData: builder.mutation<
      TUser,
      { userId: number; user: Partial<TUser> }
    >({
      query: ({ userId, user }) => ({
        url: `users/${userId}`,
        method: "PUT",
        body: user,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});
