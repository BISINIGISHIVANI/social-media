import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"


const getAllUser = createAsyncThunk(
  'user/getAllUser',
  async (rejectWithValue) => {
    try {
      const response = await axios.get('/api/users')
      const data = { data: response.data }
      return data
    } catch (error) {
      console.error(error)
      return rejectWithValue({ data: error.response.data })
    }
  },
)
export {getAllUser}