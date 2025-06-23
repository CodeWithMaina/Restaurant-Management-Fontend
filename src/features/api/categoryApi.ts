import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { TCategoryItemResponse } from "../../types/category.types";


export const categoryApi = createApi({
    reducerPath:"categoryApi",
    tagTypes: ["Category"],
    baseQuery: fetchBaseQuery({baseUrl:"http://localhost:5000/api/"}),
    endpoints: (builder)=>({
        //Fetching All Categories
        fetchCategory: builder.query<TCategoryItemResponse, void>({
            query:()=> 'category',
        }),

        //Fetching Category By ID
        fetchCategoryById: builder.query({
            query: (categoryId)=> ({
                url:`category/${categoryId}`,
            })
        })

    })
})