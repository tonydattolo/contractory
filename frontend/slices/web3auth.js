import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  refresh: null, // NOTE: maybe need these?
  access: null
}

const web3auth = createSlice({
  name: 'web3auth',
  initialState,
  reducers : {
    getUser: (state) => {
      state.loading = true
    },
    getUserSuccess: (state, { payload }) => {
      state.user = payload
      state.loading = false
    },
    getUserFail: (state) => {

    },
    signatureFailRemoveAccess: (state) => {
      state.access = false,
      state.refresh = false
    },

  }
})

export const {

} = web3auth.actions

export const web3authSelector = (state) => state

// const selectSelf = (state) => state
// const safeSelector = createDraftSafeSelector(
//     selectSelf,
//     (state) => state.value
// )

export default web3auth.reducer

export function load_user() {
  return async (dispatch) => {
    dispatch(getUser())

    try {
      const response = await fetch('API URL TO GET ADDRESS/NONCE')
      const data = await response.json()
      dispatch(getUserSuccess(data))
      
    } catch (error) {
      dispatch(getUserFail())
    }
  }
}