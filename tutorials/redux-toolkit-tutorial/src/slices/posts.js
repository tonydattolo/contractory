import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  loading: false,
  hasErrors: false,
  posts: [],
}

// A slice for posts with our three reducers
const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    getPosts: (state) => {
      state.loading = true
    },
    getPostsSuccess: (state, { payload }) => {
      state.posts = payload
      state.loading = false
      state.hasErrors = false
    },
    getPostsFailure: (state) => {
      state.loading = false
      state.hasErrors = true
    }
  }
})

// three actions from the slice
export const { getPosts, getPostsSuccess, getPostsFailure } = postsSlice.actions

// a selector
export const postsSelector = (state) => state.posts

// the reducer
export default postsSlice.reducer

// async thunk action
export function fetchPosts() {
  return async (dispatch) => {
    dispatch(getPosts())

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts')
      const data = await response.json()

      dispatch(getPostsSuccess(data))
    } catch (error) {
      dispatch(getPostsFailure())
    }
  }
}