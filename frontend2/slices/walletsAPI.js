import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const walletsApi = createApi({
  reducerPath: 'walletsApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://localhost:8000/api/wallets/',
    prepareHeaders: (headers, { getState }) => {
      // const isAuthenticated = getState().auth.isAuthenticated
      // const token = getState().auth.token
      // const user = getState().auth.user
      // const access = getState().auth.access
      // const refresh = getState().auth.refresh
      // if (access && refresh) {
      //   // headers.set("authentication", `Bearer ${token}`)
      //   headers.set("Authentication", `JWT ${access}`)
      //   headers.set("Accept", "application/json")
      //   headers.set("Content-Type", "application/json")
      // }
      headers.set("Accept", "application/json")
      headers.set("Content-Type", "application/json")
      return headers
    }
  }),
  tagTypes: ["nonce"],
  endpoints: (builder) => ({
    getNonce: builder.query({
      query: (address) => `getNonce/${address}/`,
      providesTags: ['nonce']
    }),
    // getUser: builder.query({
    //   query(data) {
    //     url: `getUser/`,
    //   }
      // providesTags: ['user']
    // }),
    getUser: builder.query({
      query: (data) => `getUser/${data.account}/${data.nonce}/${data.signature}`,
      // providesTags: ['user']
    }),
  
  })
})

// format to generate hook for specific api endpoint query:
// for POST/PUT/PATCH/DELETE requests:
//    use<nameOfQuery>Mutation
// for GET requests:
//    use<nameOfQuery>Query
export const { 
  // useUserCreateMutation, # examples
  // useGoogleLoginQuery, # examples
  useLazyGetNonceQuery,
  useLazyGetUserQuery,

} = walletsApi