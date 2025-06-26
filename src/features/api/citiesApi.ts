// features/api/citiesApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { TCity } from "../../types/city.types";

export const citiesApi = createApi({
  reducerPath: 'citiesApi',
  tagTypes: ['City'],
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/' }),
  endpoints: (builder) => ({
    // Fetch all cities
    fetchCities: builder.query<TCity[], void>({
      query: () => 'city',
      providesTags: ['City'],
    }),
    
    // Fetch cities by state ID
    fetchCitiesByState: builder.query<TCity[], number>({
      query: (stateId) => `city?stateId=${stateId}`,
      providesTags: (result, error, stateId) => [
        { type: 'City', id: stateId }
      ],
    }),
    
    // Create a new city
    createCity: builder.mutation<TCity, Partial<TCity>>({
      query: (newCity) => ({
        url: 'city',
        method: 'POST',
        body: newCity,
      }),
      invalidatesTags: ['City'],
    }),
    
    // Update a city
    updateCity: builder.mutation<TCity, Partial<TCity> & { id: number }>({
      query: ({ id, ...patch }) => ({
        url: `city/${id}`,
        method: 'PUT',
        body: patch,
      }),
      invalidatesTags: ['City'],
    }),
    
    // Delete a city
    deleteCity: builder.mutation<void, number>({
      query: (id) => ({
        url: `city/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['City'],
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useFetchCitiesQuery,
  useFetchCitiesByStateQuery,
  useCreateCityMutation,
  useUpdateCityMutation,
  useDeleteCityMutation,
} = citiesApi;