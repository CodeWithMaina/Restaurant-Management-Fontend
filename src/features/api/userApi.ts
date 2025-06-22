import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { TUser } from "../../types/user.types";


export const userApi = createApi({
    reducerPath:"userApi",
    baseQuery: fetchBaseQuery({baseUrl:"http://localhost:5000/api/"}),
    tagTypes: ['User'],
    endpoints:(builder) => ({
        // Fetch a user data by ID
        fetchUserById: builder.query({
            query: (userIdPayLoad)=>`users/${userIdPayLoad}`
        }),
        // Updating User Data
        updatingUserData: builder.mutation<TUser,{userId: number; user:Partial<TUser>}>({
            query: ({userId, user})=>({
                url:`users/${userId}`,
                method:'PUT',
                body:user
            }),
            invalidatesTags: ['User']
        })
    })
})