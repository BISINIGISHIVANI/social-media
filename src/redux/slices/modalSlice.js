import { createSlice } from "@reduxjs/toolkit"
const initialState = {
  isOpen: false,
  postToEdit: {},
  showPostModal:false
};
const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state) => {
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.postToEdit = {};
    },
    openEditPost: (state, action) => {
      state.postToEdit = action.payload;
    },
    openAddPostModal:(state)=>{
      state.showPostModal=true
    },
    closeAddPostModal:(state)=>{
      state.showPostModal=false
    }
  },
  extraReducers:{
  }
});
export const {openAddPostModal,closeAddPostModal,openModal, closeModal, openEditPost} = modalSlice.actions;
export const { reducer: modalReducer } = modalSlice;

