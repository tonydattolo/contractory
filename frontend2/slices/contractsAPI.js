import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const contractsApi = createApi({
  reducerPath: "contractsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/contracts/",
    prepareHeaders: (headers, { getState }) => {
      // const access = getState().auth.access
      // if (access) {
      // headers.set("Authentication", `Bearer ${access}`)
      //   // headers.set("Authentication", `JWT ${access}`)
      //   headers.set("Authentication", `Bearer ${access}`)
      //   headers.set("Accept", "application/json")
      //   headers.set("Content-Type", "application/json")
      // }
      headers.set("Accept", "application/json");
      headers.set("Content-Type", "application/json");
      return headers;
    }
  }),
  tagTypes: ["contracts"],
  endpoints: (builder) => ({
    getAllContracts: builder.query({
      query: () => "",
      providesTags: ["contracts"],
    }),
    getContractsByUser: builder.query({
      query(data) {
        const { email, access_token, type } = data
        return {
          url: `list/${email}/${type}/`,
          // params: {
          //   email,
          //   type
          // },
          headers: {
            "Authorization": `JWT ${access_token}`,
          },

        }
      },
    }),
    createContract: builder.mutation({
      query(data) {
        // console.log(`data: ${data}`)
        const { owner, name, description, access_token } = data;
        return {
          url: "create/",
          headers: {
            Authorization: `JWT ${access_token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "POST",
          body: {
            owner: `${owner}`,
            name: `${name}`,
            description: `${description}`,
          }
        };
      },
      invalidatesTags: ["contracts"],
    }),
    deleteContract: builder.mutation({
      query(data) {
        const { contractIDtoDelete, access_Token } = data;
        return {
          url: `delete/${contractIDtoDelete}/`,
          headers: {
            Authorization: `JWT ${access_Token}`,
          },
          method: "DELETE",
        };
      },
      invalidatesTags: ["contracts"],
    }),
  }),
});

export const {
  useCreateContractMutation,
  useGetAllContractsQuery,
  // useGetContractsByUserQuery,
  useDeleteContractMutation,
  useLazyGetContractsByUserQuery
} = contractsApi
