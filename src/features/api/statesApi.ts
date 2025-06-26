import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { TState } from "../../types/state.types";


export const statesApi = createApi({
    reducerPath: 'statesApi',
    tagTypes: ['State'],
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/' }),
    endpoints: (builder) => ({
        // fetch states
        fetchStates: builder.query<TState[], void>({
        query: () => 'state',
        providesTags: ['State'],
        }),
        // create state
        createState: builder.mutation<TState, Partial<TState>>({
        query: (newState) => ({
            url: 'state',
            method: 'POST',
            body: newState,
        }),
        invalidatesTags: ['State'],
        }),
        // update state
        updateState: builder.mutation<TState, Partial<TState> & { id: number }>({
        query: ({ id, ...patch }) => ({
            url: `state/${id}`,
            method: 'PUT',
            body: patch,
        }),
        invalidatesTags: ['State'],
        }),
        // delete state
        deleteState: builder.mutation<void, number>({
        query: (id) => ({
            url: `state/${id}`,
            method: 'DELETE',
        }),
        invalidatesTags: ['State'],
        }),
    }),
})