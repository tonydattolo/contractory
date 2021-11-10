import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { useSelector } from 'react-redux'

export const walletsApi = createApi({
  reducerPath: 'walletsApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://localhost:8000/wallets/',
    prepareHeaders: (headers, { getState }) => {
      // const isAuthenticated = getState().auth.isAuthenticated
      // const token = getState().auth.token
      // const user = getState().auth.user
      const access = getState().auth.access
      const refresh = getState().auth.refresh
      if (access && refresh) {
        // headers.set("Authentication", `JWT ${access}`)
      }
      headers.set("Accept", "application/json")
      headers.set("Content-Type", "application/json")
      return headers
    }
  }),
  tagTypes: ["wallets"],
  endpoints: (builder) => ({
    addWallet: builder.mutation({
      query(data) {
        const { account, access_token } = data
        console.log(`address in RTKQ: ${account}`)
        return {
          url: `add/${account}/`,
          method: 'POST',
          headers: {
            Authorization: `JWT ${access_token}`,
          },
        }
      },
      invalidatesTags: ["wallets"],
    }),
    getNonce: builder.query({
      query(data) {
        const { account, access_token } = data
        return {
          url: `get_nonce/${account}/`,
          method: 'GET',
          headers: {
            Authorization: `JWT ${access_token}`,
          },
        }
      }
    }),
    confirmSignature: builder.mutation({
      // query: (data) => `confirm_signature/${data.account}/${data.nonce}/${data.signature}`,
      // providesTags: ['user']
      query(data) {
        const { account, nonce, signature, access_token } = data
        return {
          url: `confirm_signature/${account}/${nonce}/${signature}/`,
          method: 'POST',
          headers: {
            Authorization: `JWT ${access_token}`,
          },
        }
      },
      invalidatesTags: ["wallets"],
    }),
    getWalletsByUser: builder.query({
      query(data) {
        const { email, access_token } = data
        return {
          url: `get_wallets_by_user/${email}/`,
          method: 'GET',
          headers: {
            Authorization: `JWT ${access_token}`,
          },
        }
      },
      providesTags: ['wallets']
    }),

  
  }),
})

// format to generate hook for specific api endpoint query:
// for POST/PUT/PATCH/DELETE requests:
//    use<nameOfQuery>Mutation
// for GET requests:
//    use<nameOfQuery>Query
export const { 
  // useUserCreateMutation, # examples
  // useGoogleLoginQuery, # examples
  useAddWalletMutation,
  useLazyGetNonceQuery,
  useConfirmSignatureMutation,
  useGetWalletsByUserQuery,
  

} = walletsApi