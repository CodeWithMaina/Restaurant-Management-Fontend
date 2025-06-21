import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { TCategoryItemResponse } from "../../types/category.types";


export const categoryApi = createApi({
    reducerPath:"categoryApi",
    baseQuery: fetchBaseQuery({baseUrl:"http://localhost:5000/api/"}),
    endpoints: (builder)=>({
        fetchCategory: builder.query<TCategoryItemResponse, void>({
            query:()=> 'category',
        })
    })
})