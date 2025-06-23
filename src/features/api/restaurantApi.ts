import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Restaurant, RestaurantResponse } from "../../types/restaurant.types";

export const restaurantApi = createApi({
  reducerPath: "restaurantApi",
  baseQuery: fetchBaseQuery({ 
    baseUrl: "http://localhost:5000/api/",
    prepareHeaders: (headers) => {
      // Add authorization token if available
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    }
  }),
  tagTypes: ["Restaurant"],
  endpoints: (builder) => ({
    // Fetch restaurant by ID
    fetchRestaurantById: builder.query<RestaurantResponse, number>({
      query: (restaurantId) => `restaurant/${restaurantId}`,
      invalidatesTags: ["Restaurant"]
    }),

    // Create restaurant
    createRestaurant: builder.mutation<RestaurantResponse, Partial<Restaurant>>({
      query: (restaurantPayload) => ({
        url: 'restaurant',
        method: 'POST',
        body: restaurantPayload
      }),
      invalidatesTags: ["Restaurant"]
    }),

    // Update restaurant
    updateRestaurant: builder.mutation<RestaurantResponse, { 
      restaurantId: number; 
      restaurantItem: Partial<Restaurant> 
    }>({
      query: ({ restaurantId, restaurantItem }) => ({
        url: `restaurant/${restaurantId}`,
        method: 'PUT',
        body: restaurantItem
      }),
      invalidatesTags: ['Restaurant']
    }),

    // Delete restaurant
    deleteRestaurant: builder.mutation<void, number>({
      query: (restaurantId) => ({
        url: `restaurant/${restaurantId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ["Restaurant"]
    })
  })
});

// Export hooks for usage in components
export const { 
  useFetchRestaurantByIdQuery,
  useCreateRestaurantMutation,
  useUpdateRestaurantMutation,
  useDeleteRestaurantMutation
} = restaurantApi;