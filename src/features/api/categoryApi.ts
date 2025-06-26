import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { TCategory } from "../../types/category.types";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  tagTypes: ["Category"],
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/" }),
  endpoints: (builder) => ({
    // Fetch all categories
    fetchCategories: builder.query<TCategory[], void>({
      query: () => 'category',
      providesTags: ['Category'],
    }),

    // Fetch category by ID
    fetchCategoryById: builder.query<TCategory, number>({
      query: (categoryId) => `category/${categoryId}`,
      providesTags: (result, error, id) => [{ type: 'Category', id }],
    }),

    // Create category
    createCategory: builder.mutation<TCategory, { name: string }>({
      query: (newCategory) => ({
        url: 'category',
        method: 'POST',
        body: newCategory,
      }),
      invalidatesTags: ['Category'],
    }),

    // Update category
    updateCategory: builder.mutation<TCategory, { id: number; name: string }>({
      query: ({ id, ...patch }) => ({
        url: `category/${id}`,
        method: 'PUT',
        body: patch,
      }),
      invalidatesTags: ['Category'],
    }),

    // Delete category
    deleteCategory: builder.mutation<void, number>({
      query: (id) => ({
        url: `category/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Category'],
    }),
  }),
});

export const {
  useFetchCategoriesQuery,
  useFetchCategoryByIdQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;