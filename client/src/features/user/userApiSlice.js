import { apiSlice } from "../../app/api/apiSlice";

export const fetchUserData = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    user: builder.mutation({
      query: (token) => ({
        url: "http://localhost:3001/api/v1/user/profile",
        method: "POST",
        body: { ...token },
      }),
    }),
  }),
});

export const { useUserMutation } = fetchUserData;
