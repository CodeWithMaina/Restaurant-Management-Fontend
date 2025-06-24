import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type Order = {
  id: number;
  orderItems: OrderItem[];
  user: User;
  comments: Comment[]; 
  statuses: OrderStatus[]; 
  driver: Driver;
  deliveryAddress: DeliveryAddress;
  restaurant: Restaurant;
  createdAt: string;
  updatedAt: string;
};

type DeliveryAddress = {
  cityId: number;
  city: City;
  deliveryInstructions: string;
  id: number;
  streetAddress1: string;
  streetAddress2: string | null; 
  zipCode: string;
};

type City = {
  id: number;
  name: string;
  state: State;
};

type State = {
  id: number;
  name: string;
  code: string;
};

type MenuItemCategory = {
  id: number;
  name: string;
};

type Restaurant = {
  id: number;
  name: string;
  streetAddress: string;
  zipCode: string;
  cityId: number;
};

type Driver = {
  id: number;
  carMake: string;
  carModel: string;
  carYear: number;
  userId: number;
  user: User;
};

type StatusCatalog = {
  id: number;
  name: string;
};

type OrderStatus = {
  id: number;
  orderId: number;
  statusCatalog: StatusCatalog;
  createdAt: string;
};

type Comment = {
  id: number;
  orderId: number;
  userId: number;
  user: User;
  commentText: string;
  isComplaint: boolean;
  isPraise: boolean;
  createdAt: string;
};

type OrderItem = {
  id: number;
  orderId: number;
  quantity: number;
  price: string;
  menuItem: MenuItem;
};

type User = {
  id: number;
  name: string;
  contactPhone: string;
  email: string;
  userType: string;
};

type MenuItem = {
  id: number;
  name: string;
  description: string;
  ingredients: string;
  price: string;
  category: MenuItemCategory;
  restaurantId: number;
};

type UpdateOrderPayload = {
  id: number;
  changes: Partial<Order>;
};

type UpdateStatusPayload = {
  id: number;
  status: string;
};

type AddCommentPayload = {
  orderId: number;
  commentText: string;
  isComplaint?: boolean;
  isPraise?: boolean;
};

export const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://localhost:5000/api/',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    }
  }),
  tagTypes: ['Order', 'Orders'],
  endpoints: (builder) => ({
    // Fetch all orders
    fetchOrders: builder.query<Order[], void>({
      query: () => 'orders',
      providesTags: (result) => 
        result 
          ? [...result.map(({ id }) => ({ type: 'Order' as const, id })), 'Orders']
          : ['Orders'],
    }),

    // Fetch orders by restaurant ID
    fetchOrdersByRestaurantId: builder.query<Order[], number>({
      query: (restaurantId) => `orders/restaurant/${restaurantId}`,
      providesTags: (result) => 
        result 
          ? [...result.map(({ id }) => ({ type: 'Order' as const, id })), 'Orders']
          : ['Orders'],
    }),

    // Fetch single order by ID
    fetchOrderById: builder.query<Order, number>({
      query: (id) => `orders/${id}`,
      providesTags: (result, error, id) => [{ type: 'Order', id }],
    }),

    // Create new order
    createOrder: builder.mutation<Order, Partial<Order>>({
      query: (newOrder) => ({
        url: 'orders',
        method: 'POST',
        body: newOrder,
      }),
      invalidatesTags: ['Orders'],
    }),

    // Update order
    updateOrder: builder.mutation<Order, UpdateOrderPayload>({
      query: ({ id, changes }) => ({
        url: `orders/${id}`,
        method: 'PUT',
        body: changes,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Order', id },
        'Orders',
      ],
    }),

    // Update order status
    updateOrderStatus: builder.mutation<Order, UpdateStatusPayload>({
      query: ({ id, status }) => ({
        url: `orders/${id}/status`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Order', id },
        'Orders',
      ],
    }),

    // Delete order
    deleteOrder: builder.mutation<void, number>({
      query: (id) => ({
        url: `orders/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Order', id },
        'Orders',
      ],
    }),

    // Add comment to order
    addOrderComment: builder.mutation<Comment, AddCommentPayload>({
      query: ({ orderId, ...commentData }) => ({
        url: `orders/${orderId}/comments`,
        method: 'POST',
        body: commentData,
      }),
      invalidatesTags: (result, error, { orderId }) => [
        { type: 'Order', id: orderId },
      ],
    }),

    // Fetch order status history
    fetchOrderStatusHistory: builder.query<OrderStatus[], number>({
      query: (orderId) => `orders/${orderId}/status-history`,
      providesTags: (result, error, orderId) => [
        { type: 'Order', id: orderId },
      ],
    }),
  }),
});

// Export hooks for usage in functional components
// export const {
//   useFetchOrdersQuery,
//   useFetchOrdersByRestaurantIdQuery,
//   useFetchOrderByIdQuery,
//   useCreateOrderMutation,
//   useUpdateOrderMutation,
//   useUpdateOrderStatusMutation,
//   useDeleteOrderMutation,
//   useAddOrderCommentMutation,
//   useFetchOrderStatusHistoryQuery,
// } = orderApi;