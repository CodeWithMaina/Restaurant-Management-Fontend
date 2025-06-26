import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ForgotPasswordRequest, ResetPasswordRequest } from "../../types/auth.types";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/" }),
  endpoints: (builder) => ({
    // Register User
    registerUser: builder.mutation({
      query: (registerPayload) => ({
        url: "register",
        method: "POST",
        body: registerPayload,
      }),
    }),
    // Login User
    loginUser: builder.mutation({
      query: (loginPayload) => ({
        url: "login",
        method: "POST",
        body: loginPayload,
      }),
    }),
    // Forgot Password
    forgotPassword: builder.mutation<void, ForgotPasswordRequest>({
      query: (credentials) => ({
        url: "/forgot-password",
        method: "POST",
        body: credentials,
      }),
    }),
    // Reset Password
    resetPassword: builder.mutation<void, ResetPasswordRequest>({
      query: (credentials) => ({
        url: "/password-reset",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});
