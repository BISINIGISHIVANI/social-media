import { createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify"
import { addBookmark, commentPost, createPost, deleteComment, deletePost, dislikePost, downVoteComment, editPost, getAllPosts,  likePost, removeBookmark, UpVoteComment } from "../asyncThunk/postThunk"

const initialState={
    posts:[],
    bookmarks:[],
    commentList:[],
    postsLoading:false,
    error:null
}
const postSlice=createSlice({
    name:"posts",
    initialState,
    reducers:{
        trendingPosts:(state)=>{
           state.posts.sort((a, b ) =>a.likes.likeCount - b.likes.likeCount)
        },
        latestPosts:(state)=>{
           state.posts.sort((a,b)=>new Date(a.createdAt) - new Date(b.createdAt))
        },
        allPostsByFilter:(state)=>{
            state.posts.reverse()
        }
    },
    extraReducers:{
        [getAllPosts.fulfilled]:(state,action)=>{
            state.posts=action.payload.data.posts
        },
        [getAllPosts.rejected]:(state,action)=>{
            state.error=action.payload
        },
        [likePost.fulfilled]:(state,action)=>{
            state.posts=action.payload.data.posts;
            toast.success("you liked the post")
        },
        [likePost.rejected]:(state,action)=>{
            state.error=action.payload
        },
        [dislikePost.fulfilled]:(state,action)=>{
            state.posts=action.payload.data.posts;
            toast.success("post removed from likes")
        },
        [dislikePost.rejected]:(state,action)=>{
            state.error=action.payload
        },
        [addBookmark.fulfilled]:(state,action)=>{
            state.bookmarks=action.payload.data.bookmarks
            toast.success("bookmarked post successfully")
        },
        [addBookmark.rejected]:(state,action)=>{
            state.error=action.payload
        },
        [removeBookmark.fulfilled]:(state,action)=>{
            state.bookmarks=action.payload.data.bookmarks
            toast.success("post removed from bookmark")
        },
        [removeBookmark.rejected]:(state,action)=>{
            state.error=action.payload
        },
        [commentPost.fulfilled]:(state,action)=>{
            state.posts=action.payload.data.posts
        },
        [commentPost.rejected]:(state,action)=>{
            state.error=action.payload
        },
        [deleteComment.fulfilled]:(state,action)=>{
            state.posts=action.payload.data.posts
            toast.success("comment deleted successfully")
        },
        [deleteComment.rejected]:(state,action)=>{
            state.error=action.payload
        },
        [UpVoteComment.fulfilled]:(state,action)=>{
            state.commentList=action.payload.data.comments;
            toast.success("comment upvoted successfully")
        },
        [UpVoteComment.rejected]:(state,action)=>{
            state.error=action.payload
            toast.error(action.payload.data.errors[0])
        },
        [downVoteComment.fulfilled]:(state,action)=>{
            state.commentList=action.payload.data.comments;
            toast.success("comment downvoted successfully")
        },
        [downVoteComment.rejected]:(state,action)=>{
            state.error=action.payload;
            toast.error(action.payload.data.errors[0])
        },
        [createPost.fulfilled]:(state,action)=>{
            state.posts=action.payload.data.posts;
        },
        [createPost.rejected]:(state,action)=>{
            state.error=action.payload.data
        },
        [deletePost.fulfilled]:(state,action)=>{
            state.posts=action.payload.data.posts;
            toast.success("post deleted successfully")
        },
        [deletePost.rejected]:(state,action)=>{
            state.error=action.payload
        },
        [editPost.fulfilled]:(state,action)=>{
            state.posts=action.payload.data.posts
            toast.success("post updated successfully")
        },
        [editPost.rejected]:(state,action)=>{
            state.error=action.payload
        },
    }
})
export const {trendingPosts,latestPosts,allPostsByFilter}=postSlice.actions;
export const {reducer:postsReducer}=postSlice;