import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getAllUser = createAsyncThunk(
  "user/getAllUser",
  async (rejectWithValue) => {
    try {
      const response = await axios.get("/api/users");
      const data = { data: response.data };
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue({ data: error.response.data });
    }
  }
);
const followUser = createAsyncThunk(
  "user/followUser",
  async ({ _id, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `/api/users/follow/${_id}`,
        {},
        { headers: { authorization: token } }
      );
      const data = { data: response.data };
      return data;
    } catch (error) {
      return rejectWithValue({ data: error.response.data });
    }
  }
);

const unfollowUser = createAsyncThunk(
  "user/unfollowUser",
  async ({ _id, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `/api/users/unfollow/${_id}`,
        {},
        { headers: { authorization: token } }
      );
      const data = { data: response.data };
      return data;
    } catch (error) {
      return rejectWithValue({ data: error.response.data });
    }
  }
);
const getSingleUser = createAsyncThunk(
  "user/getSingleUser",
  async (username, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/users/${username}`);
      const data = { data: response.data };
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue({ data: error.response.data });
    }
  }
);
const editProfile = createAsyncThunk(
  "user/editProfile",
  async ({ userData, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "/api/users/edit",
        { userData },
        { headers: { authorization: token } }
      );
      const data = { data: response.data };
      return data;
    } catch (error) {
      return rejectWithValue({ data: error.response.data });
    }
  }
);
export { getAllUser, followUser, unfollowUser, editProfile, getSingleUser };
