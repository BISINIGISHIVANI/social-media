import { createSlice } from "@reduxjs/toolkit";
import { login, signup } from "../asyncThunk/authThunk";
import { editProfile } from "../asyncThunk/userThunk";
import { toast } from "react-toastify";
const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  isLoading: false
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  },
  extraReducers: {
    [signup.pending]: (state) => {
      state.isLoading = true;
    },
    [signup.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.user = action.payload.data.createdUser;
      state.token = action.payload.data.encodedToken;
    },
    [signup.rejected]: (action,state) => {
      state.error=action.payload;
      toast.error(action.payload.data.errors[0])
    },
    [login.fulfilled]: (state, action) => {
      state.user = action.payload.data.foundUser;
      state.token = action.payload.data.encodedToken;
      localStorage.setItem(
        "user",
        JSON.stringify(action.payload.data.foundUser)
      );
      localStorage.setItem("token", action.payload.data.encodedToken);
    },
    [login.rejected]: (state, action) => {
      state.error=action.payload;
      toast.error(action.payload.data.errors[0])
    },
    [editProfile.fulfilled]: (state, action) => {
      state.user = action.payload.data.user;
    }
  }
});
export const { logoutUser } = authSlice.actions;
export const { reducer: authReducer } = authSlice;
