import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { email: null, token: null, firstName: null, lastName: null },
  reducers: {
    setCredentials: (state, action) => {
      const { email } = action.payload;
      const accessToken = action.payload.body.token;
      state.email = email;
      state.token = accessToken;
    },
    setToken: (state, action) => {
      const { token } = action.payload;
      console.log(action.payload);
      console.log(token);
      state.token = token;
    },
    setUserData: (state, action) => {
      const { email, firstName, lastName } = action.payload.body;

      state.email = email;
      state.firstName = firstName;
      state.lastName = lastName;
    },
    updateUserData: (state, action) => {
      const { firstName, lastName } = action.payload.body;
      state.firstName = firstName;
      state.lastName = lastName;
    },
    logout: (state, action) => {
      state.email = null;
      state.token = null;
    },
  },
});

export const { setCredentials, setToken, setUserData, updateUserData, logout } =
  authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.email;
export const selectCurrentToken = (state) => state.auth.token;
export const selectCurrentData = (state) => state.auth;
