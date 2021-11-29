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
    getDraftContractsByUser: builder.query({
      query(data) {
        const { email, access_token } = data
        return {
          url: `list/${email}/draft/`,
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
    getContractDetails: builder.query({
      query(data) {
        const { contract_id, access_token } = data;
        return {
          url: `/detail/${contract_id}/`,
          headers: {
            Authorization: `JWT ${access_token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        };
      },
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

    addPartyToContract: builder.mutation({
      query(data) {
        const { 
          contract_id,
          access_token,
          newParty,
          newPartyRole,
          newPartyInviteMessage
        } = data
        return {
          url: `add_party/${contract_id}/`,
          headers: {
            Authorization: `JWT ${access_token}`,
          },
          method: "POST",
          body: {
            newParty: `${newParty}`,
            newPartyRole: `${newPartyRole}`,
            newPartyInviteMessage: `${newPartyInviteMessage}`,
          },
        }
      }
    }),



  })
})

export const {
  useCreateContractMutation,
  useGetAllContractsQuery,
  useGetDraftContractsByUserQuery,
  useDeleteContractMutation,
  useGetContractDetailsQuery,
  useAddPartyToContractMutation,
  // useLazyGetContractsByUserQuery
} = contractsApi
