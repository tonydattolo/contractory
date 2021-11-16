import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

const slice = createSlice({
  name: 'wallets',
  initialState: {
    currentAddress: null,
    ENSname: null,
    nonce: null,
  },
  reducers: {
    setCurrentAddress: (state, { payload }) => {
      state.currentAddress = payload
    },
    setENSname: (state, { payload }) => {
      state.ENSname = payload
    },
    setDeactivate: (PURGE, (state) => {
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
  setCurrentAddress,
  setENSname,
  setNonce,
} = slice.actions
export default slice.reducer
export const selectCurrentAddress = (state) => state.wallets.currentAddress
export const selectENSname = (state) => state.wallets.ENSname
export const selectNonce = (state) => state.wallets.nonce
