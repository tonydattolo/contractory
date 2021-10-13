import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://localhost:8000/auth/',
    prepareHeaders: (headers, { getState }) => {
      const isAuthenticated = getState().auth.isAuthenticated
      const token = getState().auth.token
      const user = getState().auth.user
      const access = getState().auth.access
      const refresh = getState().auth.refresh
      if (access && refresh) {
        // headers.set("authentication", `Bearer ${token}`)
        headers.set("Authentication", `JWT ${access}`)
        headers.set("Accept", "application/json")
        headers.set("Content-Type", "application/json")
      }
      headers.set("Accept", "application/json")
      headers.set("Content-Type", "application/json")
      return headers
    }
  }),
  endpoints: (builder) => ({
    userCreate: builder.mutation({
      query(data) {
        const { publicAddress, password, re_password } = data
        return {
          url: 'users/',
          method: 'POST',
          body: {
            email: `${email}`,
            password: `${password}`,
            re_password: `${re_password}`
          }
        }
      }
    }),
    registerAddress: builder.mutation({

    }),
    getNonce: builder.query({
      query(data) {
        const { publicAddress } = data
        return {
          url: '',
          method: '',
          body: {

          }
        }
      }
    })
  
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

} = authApi