import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "contracts",
  initialState: {
    contracts: [],
  },
  reducers: {
    setContracts: (state, action) => {
      state.contracts = action.payload;
    },
  },

})

export const {
  setContracts,
} = slice.actions

export default slice.reducer