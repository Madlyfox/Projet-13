import { apiSlice } from "../../app/api/apiSlice";

export const updateData = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    update: builder.mutation({
      query: (newUserData) => ({
        url: "http://localhost:3001/api/v1/user/profile",
        method: "PUT",
        body: { ...newUserData },
      }),
    }),
  }),
});

export const { useUpdateMutation } = updateData;
