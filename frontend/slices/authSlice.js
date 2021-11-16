import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

const slice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false,
    access: null,
    refresh: null,
    currentAddress: null,
    ENSname: null,
    nonce: null,
  },
  reducers: {
    setToken: (state, {payload: { access, refresh }}) => {
      state.access = access
      state.refresh = refresh
      state.isAuthenticated = true
    },
    setUser: (state, { payload }) => {
    // setUser: (state, { payload: { user } }) => {
      state.user = payload
    },
    setAuthenticated: (state) => {
      state.isAuthenticated = true
    },
    setLogout: (PURGE, (state) => {
      state.user = null
      state.isAuthenticated = false
      state.access = null
      state.refresh = null
    }),
    setCurrentAddress: (state, { payload }) => {
      state.currentAddress = payload
    },
    setENSname: (state, { payload }) => {
      state.ENSname = payload
    },
    setDeactivate: (PURGE, (state) => {
      state.user = null
      state.isAuthenticated = false
      state.access = null
      state.refresh = null
      state.currentAddress = null
      state.ENSname = null
      state.nonce = null
    }),
    setNonce: (state, { payload }) => {
      state.nonce = payload
    }
  },
  extraReducers: (builder) => {
    // example from official docs if you need to access login status from other Apis?
    // builder
    //   .addMatcher(postApi.endpoints.login.matchPending, (state, action) => {
    //     console.log('pending', action);
    //   })
    //   .addMatcher(postApi.endpoints.login.matchFulfilled, (state, action) => {
    //     console.log('fulfilled', action);
    //     state.user = action.payload.result.user;
    //     state.token = action.payload.result.token;
    //   })
    //   .addMatcher(postApi.endpoints.login.matchRejected, (state, action) => {
    //     console.log('rejected', action);
    //   });
  }
})


// export const {  } = slice.actions
export const { 
  setLogout,
  setCredentials,
  setToken,
  setUser,
  setAuthenticated,
  setCurrentAddress,
  setENSname,
  setNonce,
} = slice.actions
export default slice.reducer
export const selectCurrentUser = (state) => state.auth.user
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated
export const selectToken = (state) => state.auth.token
export const selectAccess = (state) => state.auth.access
export const selectRefresh = (state) => state.auth.refresh
export const selectCurrentAddress = (state) => state.auth.currentAddress
export const selectENSname = (state) => state.auth.ENSname
