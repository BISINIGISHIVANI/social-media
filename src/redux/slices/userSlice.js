import { createSlice } from "@reduxjs/toolkit"
import {  followUser, getAllUser, unfollowUser} from "../asyncThunk/userThunk";
const initialState={
    users:[],
    userLoading:false,
    error:null,
}
const userSlice=createSlice({
    name:"users",
    initialState,
    reducers:{},
    extraReducers:{
        [getAllUser.pending]:(state)=>{
            state.userLoading=true;
        },
        [getAllUser.fulfilled]:(state,action)=>{
            state.userLoading=false;
            state.users=action.payload.data.users
        },
        [getAllUser.rejected]:(state,action)=>{
            state.error=action.payload.error[0]
        },
        [followUser.fulfilled]:(state,action)=>{
            state.users=action.payload.data.users;
        },
        [followUser.rejected]:(state,action)=>{
            state.error=action.payload.error[0]
        },
        [unfollowUser.fulfilled]:(state,action)=>{
            state.users=action.payload.data.users
        },
        [unfollowUser.rejected]:(state,action)=>{
            state.error=action.payload.error[0]
        },
    }
})
export const {reducer:usersReducer}=userSlice;