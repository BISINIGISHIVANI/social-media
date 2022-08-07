import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice";
import { modalReducer } from "./slices/modalSlice";
import { postsReducer } from "./slices/postSlice";
import { usersReducer } from "./slices/userSlice";
export const store=configureStore({
    reducer:{auth:authReducer,posts:postsReducer,modal:modalReducer,users:usersReducer}
})