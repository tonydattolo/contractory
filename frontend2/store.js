import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { authApi } from "slices/authAPI";
import { profileApi } from "slices/profileAPI";
import { postsApi } from "slices/postsAPI";
import { walletsApi } from "slices/walletsAPI"
import { contractsApi } from "slices/contractsAPI"
import auth from 'slices/authSlice';
import profile from 'slices/profileSlice'
import posts from 'slices/postsSlice'
import wallets from 'slices/walletsSlice'
import contracts from 'slices/contractsSlice'

import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import {
  FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER
} from 'redux-persist'

const reducers = combineReducers({
  // Add the generated reducer as a specific top-level slice
  [authApi.reducerPath]: authApi.reducer,
  [profileApi.reducerPath]: profileApi.reducer,
  [walletsApi.reducerPath]: walletsApi.reducer,
  [contractsApi.reducerPath]: contractsApi.reducer,
  auth,
  profile,
  wallets,
  contracts,
})

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: [
    authApi.reducerPath,
    profileApi.reducerPath,
    walletsApi.reducerPath,
    contractsApi.reducerPath,
    auth, 
    profile,
    wallets,
    contracts,
  ],
}

const persistedReducer = persistReducer(persistConfig, reducers)

export const makeStore = () =>
  configureStore({
    reducer: persistedReducer,
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) => 
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      })
        .concat(authApi.middleware)
        .concat(profileApi.middleware)
        .concat(postsApi.middleware)
        .concat(walletsApi.middleware)
        .concat(contractsApi.middleware)
    
  })
  
export const store = makeStore()

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)

