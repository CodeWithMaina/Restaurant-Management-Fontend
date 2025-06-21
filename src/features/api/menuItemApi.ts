import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { MenuItemsResponse } from "../../types/menuItem.types";


export const menuItemApi = createApi({
    reducerPath:"menuItemApi",
    baseQuery: fetchBaseQuery({baseUrl:"http://localhost:5000/api/"}),
    endpoints: (builder)=>({
        fetchMenuItem: builder.query<MenuItemsResponse, void>({
            query: ()=> 'menu_item',
        })
    })
})