import { apiSlice } from "../../app/api/apiSlice";

export const signInUser = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userData) => ({
        url: "http://localhost:3001/api/v1/user/signup",
        method: "POST",
        body: { ...userData },
      }),
    }),
  }),
});

export const { useRegisterMutation } = signInUser;
