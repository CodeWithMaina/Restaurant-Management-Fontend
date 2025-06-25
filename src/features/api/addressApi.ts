// features/api/addressApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { TAddress, TAddressFormData } from './userApi';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const addressApi = createApi({
  reducerPath: 'addressApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/users`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Address'],
  endpoints: (builder) => ({
    // Get all addresses for a user
    getAddresses: builder.query<TAddress[], number>({
      query: (userId) => `/${userId}/addresses`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Address' as const, id })),
              { type: 'Address', id: 'LIST' },
            ]
          : [{ type: 'Address', id: 'LIST' }],
    }),

    // Get a single address
    getAddress: builder.query<TAddress, { userId: number; addressId: number }>({
      query: ({ userId, addressId }) => `/${userId}/addresses/${addressId}`,
      providesTags: (result, error, { addressId }) => [
        { type: 'Address', id: addressId },
      ],
    }),

    // Create a new address
    createAddress: builder.mutation<
      TAddress,
      { userId: number; address: TAddressFormData }
    >({
      query: ({ userId, address }) => ({
        url: `/${userId}/addresses`,
        method: 'POST',
        body: address,
      }),
      invalidatesTags: [{ type: 'Address', id: 'LIST' }],
    }),

    // Update an existing address
    updateAddress: builder.mutation<
      TAddress,
      { userId: number; addressId: number; address: Partial<TAddressFormData> }
    >({
      query: ({ userId, addressId, address }) => ({
        url: `/${userId}/addresses/${addressId}`,
        method: 'PUT',
        body: address,
      }),
      invalidatesTags: (result, error, { addressId }) => [
        { type: 'Address', id: addressId },
      ],
    }),

    // Delete an address
    deleteAddress: builder.mutation<
      void,
      { userId: number; addressId: number }
    >({
      query: ({ userId, addressId }) => ({
        url: `/${userId}/addresses/${addressId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, { addressId }) => [
        { type: 'Address', id: addressId },
      ],
    }),

    // Set default address
    setDefaultAddress: builder.mutation<
      TAddress,
      { userId: number; addressId: number }
    >({
      query: ({ userId, addressId }) => ({
        url: `/${userId}/addresses/${addressId}/default`,
        method: 'PATCH',
      }),
      invalidatesTags: [{ type: 'Address', id: 'LIST' }],
    }),
  }),
});

