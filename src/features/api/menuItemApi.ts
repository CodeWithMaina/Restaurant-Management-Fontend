import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { MenuItemsResponse } from "../../types/menuItem.types";


export const menuItemApi = createApi({
    reducerPath:"menuItemApi",
    baseQuery: fetchBaseQuery({baseUrl:"http://localhost:5000/api/"}),
    tagTypes:["MenuItem"],
    endpoints: (builder)=>({
        // Fetching Food Item
        fetchMenuItem: builder.query<MenuItemsResponse, void>({
            query: ()=> 'menu_item',
        }),

        // Creating Food Items
        createMenuItem: builder.mutation({
            query: (menuItemPayload)=> ({
                url:'menu_item',
                method:'POST',
                body: menuItemPayload
            }),
            invalidatesTags:["MenuItem"]
        }),

        //Updating Menu Item
        updateMenuItem: builder.mutation({
            query: ({menuItemId, menuItem})=>({
                url:`menu_item/${menuItemId}`,
                method:'PUT',
                body:menuItem
            }),
            invalidatesTags: ['MenuItem']
        }), 

        // Deleting Menu Item
        deleteMenuItem: builder.mutation({
            query: ({menuItemId})=>({
                url:`menu_item/${menuItemId}`,
                method: 'DELETE',

            })
        })
    })
})