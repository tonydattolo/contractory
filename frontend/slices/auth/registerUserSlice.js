import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  register_success: false
}

const registerUserSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    registerSuccess: (state) => {
      state.register_success = true
    },
    registerFail: (state) => {
      // state.loading = false
    },
  }
})

export const {
  registerSuccess,
  registerFail
} = registerUserSlice.actions

export const registerUserSelector = (state) => state.registerSuccess