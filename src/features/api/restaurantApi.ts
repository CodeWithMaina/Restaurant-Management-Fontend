import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Restaurant, TRestaurant } from "../../types/restaurant.types";

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
    // Fetch all restaurants
    fetchRestaurants: builder.query<TRestaurant[], void>({
      query: () => 'restaurant',
      providesTags: (restaurants) => 
        restaurants ? 
          [...restaurants.map(({ id }) => ({ type: 'Restaurant' as const, id })), 'Restaurant'] 
          : ['Restaurant']
    }),
    // Fetch restaurant by ID
    fetchRestaurantById: builder.query<TRestaurant, number>({
      query: (restaurantId) => `restaurant/${restaurantId}`,
      providesTags: ["Restaurant"]
    }),

    // Create restaurant
    createRestaurant: builder.mutation<TRestaurant, Partial<Restaurant>>({
      query: (restaurantPayload) => ({
        url: 'restaurant',
        method: 'POST',
        body: restaurantPayload
      }),
      invalidatesTags: ["Restaurant"]
    }),

    // Update restaurant
    updateRestaurant: builder.mutation<TRestaurant, { 
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
  useFetchRestaurantsQuery,
  useFetchRestaurantByIdQuery,
  useCreateRestaurantMutation,
  useUpdateRestaurantMutation,
  useDeleteRestaurantMutation
} = restaurantApi;