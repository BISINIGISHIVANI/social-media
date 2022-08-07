import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const getAllPosts=createAsyncThunk("post/getAllPosts",
async(rejectWithValue)=>{
    try {
        const response=await axios.get("/api/posts")
         const data = { data: response.data, status: response.status }
      return data
    } catch (error) {
        return rejectWithValue({
        data: error.response.data,
        status: error.response.status,
      })
    }
}
)
const likePost = createAsyncThunk(
  'posts/likePost',
  async ({ _id, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `/api/posts/like/${_id}`,
        {},
        { headers: { authorization: token } },
      )
      const data = { data: response.data }
      return data
    } catch (error) {
      return rejectWithValue({ data: error.response.data })
    }
  },
)

const dislikePost = createAsyncThunk(
  'posts/dislikePost',
  async ({ _id, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `/api/posts/dislike/${_id}`,
        {},
        { headers: { authorization: token } },
      )
      const data = { data: response.data }
      return data
    } catch (error) {
      return rejectWithValue({ data: error.response.data })
    }
  },
)
const getBookmarks=createAsyncThunk("posts/getBookamrks",
  async(rejectWithValue)=>{
    try {
        const response=await axios.get("/api/users/bookmark/")
         const data = { data: response.data, status: response.status }
      return data
    } catch (error) {
        return rejectWithValue({
        data: error.response.data,
        status: error.response.status,
      })
    }
}
)
const addBookmark = createAsyncThunk(
  'posts/addBookmark',
  async ({ _id, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `/api/users/bookmark/${_id}`,
        {},
        { headers: { authorization: token } },
      )
      const data = { data: response.data }
      return data
    } catch (error) {
      return rejectWithValue({ data: error.response.data })
    }
  },
)

const removeBookmark = createAsyncThunk(
  'posts/removeBookmark',
  async ({ _id, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `/api/users/remove-bookmark/${_id}`,
        {},
        { headers: { authorization: token } },
      )
      const data = { data: response.data }
      return data
    } catch (error) {
      console.error(error)
      return rejectWithValue({ data: error.response.data })
    }
  },
)
const commentPost = createAsyncThunk(
  'posts/commentPost',
  async ({ _id,commentData, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `/api/comments/add/${_id}`,
        {commentData},
        { headers: { authorization: token } },
      )
      const data = { data: response.data }
      return data
    } catch (error) {
      return rejectWithValue({ data: error.response.data })
    }
  },
)

const deleteComment = createAsyncThunk(
  'posts/deleteComment',
  async ({ postId, commentId, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `/api/comments/delete/${postId}/${commentId}`,
        {},
        { headers: { authorization: token } },
      )
      const data = { data: response.data }
      return data
    } catch (error) {
      return rejectWithValue({ data: error.response.data })
    }
  },
)
const UpVoteComment=createAsyncThunk("comment/upVote",
  async ({ postId, commentId, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `/api/comments/upvote/${postId}/${commentId}`,
        {},
        { headers: { authorization: token } },
      )
      const data = { data: response.data }
      return data
    } catch (error) {
      return rejectWithValue({ data: error.response.data })
    }
  },
)
const downVoteComment=createAsyncThunk("comment/downVote",
  async ({ postId, commentId, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `/api/comments/downvote/${postId}/${commentId}`,
        {},
        { headers: { authorization: token } },
      )
      const data = { data: response.data }
      return data
    } catch (error) {
      return rejectWithValue({ data: error.response.data })
    }
  },
)
const createPost = createAsyncThunk(
  'posts/createPost',
  async ({ postData, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        '/api/posts',
        { postData },
        {
          headers: { authorization: token },
        },
      )
      const data = { data: response.data }
      return data
    } catch (error) {
      return rejectWithValue({
        data: error.response.data,
      })
    }
  },
)

const deletePost = createAsyncThunk(
  'posts/deletePost',
  async ({ _id, token }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/api/posts/${_id}`, {
        headers: { authorization: token },
      })
      const data = { data: response.data, status: response.status }
      return data
    } catch (error) {
      return rejectWithValue({
        data: error.response.data,
        status: error.response.status,
      })
    }
  },
)

const editPost = createAsyncThunk(
  'posts/editPost',
  async ({ postId, postData, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `/api/posts/edit/${postId}`,
        { postData },
        { headers: { authorization: token } },
      )
      const data = { data: response.data, status: response.status }
      return data
    } catch (error) {
      return rejectWithValue({ data: error.response.data })
    }
  },
)
export {getAllPosts,likePost,dislikePost,addBookmark,removeBookmark,getBookmarks,
commentPost,deleteComment,createPost,deletePost,editPost,
UpVoteComment,downVoteComment
}