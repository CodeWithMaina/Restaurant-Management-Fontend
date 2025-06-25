import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type UserType = "admin" | "customer" | "driver" | "restaurant_owner";

type User = {
  name: string;
  contactPhone: string;
  email: string;
  userType: UserType;
};

type Order = {
  deliveryAddressId: number;
  userId: number;
  driverId: number;
  price: string; 
  finalPrice: string; 
  comment: string | null;
};

export type Comment = {
  id: number;
  orderId: number;
  userId: number;
  commentText: string;
  isComplaint: boolean;
  isPraise: boolean;
  createdAt: string; 
  updatedAt: string;
  order: Order;
  user: User;
};
// type CommentsResponse = Comment[];
type CommentWithoutTimestamps = Omit<Comment, "createdAt" | "updatedAt">;
export const commentApi = createApi({
  reducerPath: "commentApi",
  tagTypes: ["Comment"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/",
  }),
  endpoints: (builder) => ({
    //fetching comments
    fetchComments: builder.query<CommentWithoutTimestamps[], void>({
      query: () => "comment",
      providesTags: ["Comment"],
    }),
    //fetching comments by restaurant id
    fetchCommentsByRestaurantId: builder.query<CommentWithoutTimestamps[], void>({
      query: (restaurantId) => `comment/restaurant/${restaurantId}`,
      providesTags: ["Comment"],
    }),
    // Deleting a comment
    deleteComment: builder.mutation<void, number>({
      query: (id) => ({
        url: `comment/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Comment"],
    }),
    // Updating a comment
    updateComment: builder.mutation<
      CommentWithoutTimestamps,
      Partial<CommentWithoutTimestamps> & { id: number }
    >({
      query: ({ id, ...patch }) => ({
        url: `comment/${id}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: ["Comment"],
    }),
  }),
});
