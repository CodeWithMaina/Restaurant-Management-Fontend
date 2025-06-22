import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const authApi = createApi({
    reducerPath:"authApi",
    baseQuery: fetchBaseQuery({baseUrl:"http://localhost:5000/api/"}),
    endpoints: (builder)=>({
        registerUser: builder.mutation({
            query:(registerPayload)=>({
                url: 'register',
                method: 'POST',
                body: registerPayload
            }),
        }),
        loginUser: builder.mutation({
            query:(loginPayload)=>({
                url: 'login',
                method: 'POST',
                body: loginPayload
            }),
        }),
    })
})