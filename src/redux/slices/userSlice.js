import { createSlice } from "@reduxjs/toolkit"
import {  getAllUser} from "../asyncThunk/userThunk";
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
        }
    }
})
export const {reducer:usersReducer}=userSlice;