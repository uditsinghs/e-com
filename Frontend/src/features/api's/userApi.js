import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedIn, userLoggedOut } from "../Slices/userSlice";

const USER_API = "http://localhost:8080/api/v1/user/";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: USER_API,
    credentials: "include",
  }),
  tagTypes: ["user"],
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (inputData) => ({
        url: "register",
        method: "POST",
        body: inputData,
      }),
    }),
    loginUser: builder.mutation({
      query: (inputData) => ({
        url: "login",
        method: "POST",
        body: inputData,
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(userLoggedIn({ user: result.data.user }));
        } catch (error) {
          console.error(error);
        }
      },
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: "logout",
        method: "POST",
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          dispatch(userLoggedOut());
        } catch (error) {
          console.error(error);
        }
      },
    }),
    loadUser: builder.query({
      query: () => ({
        url: "me",
        method: "GET",
      }),
      providesTags: ["user"],
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(userLoggedIn({ user: result.data.user }));
        } catch (error) {
          console.error(error);
        }
      },
    }),
    addAddress: builder.mutation({
      query: (address) => ({
        url: "add-address",
        method: "POST",
        body: { address },
      }),
      invalidatesTags: ["user"],
    }),
    updateAddress: builder.mutation({
      query: (address) => ({
        url: "update-address",
        method: "PUT",
        body: { address },
      }),
      invalidatesTags: ["user"],
    }),
    deleteAddress: builder.mutation({
      query: () => ({
        url: "delete-address",
        method: "POST",
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLoadUserQuery,
  useLogoutUserMutation,
  useAddAddressMutation,
  useDeleteAddressMutation,
  useUpdateAddressMutation
} = userApi;