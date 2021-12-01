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
  tagTypes: ["contracts", "contractDetail"],
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
      providesTags: ["contractDetail"],
    }),
    deleteContract: builder.mutation({
      query(data) {
        const { contract_id, access_token } = data;
        return {
          url: `delete/${contract_id}/`,
          headers: {
            Authorization: `JWT ${access_token}`,
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
      },
      invalidatesTags: ["contractDetail"],
    }),

    removePartyFromContract: builder.mutation({
      query(data) {
        const {
          contract_id,
          access_token,
          party_id,
          party_role,
        } = data
        return {
          url: `remove_party/${contract_id}/`,
          headers: {
            Authorization: `JWT ${access_token}`,
          },
          method: "POST",
          body: {
            party_id: `${party_id}`,
            party_role: `${party_role}`,
          },
        }
      },
      invalidatesTags: ["contractDetail"],
    }),

    addClauseToContract: builder.mutation({
      query(data) {
        const {
          contract_id,
          access_token,
          clauseContent,
        } = data
        return {
          url: `add_clause/${contract_id}/`,
          headers: {
            Authorization: `JWT ${access_token}`,
          },
          method: "POST",
          body: {
            clauseContent: `${clauseContent}`,
          },
        }
      },
      invalidatesTags: ["contractDetail"],
    }),

    deleteClauseFromContract: builder.mutation({
      query(data) {
        const {
          contract_id,
          access_token,
          clause_id,
        } = data
        return {
          url: `delete_clause/${contract_id}/`,
          headers: {
            Authorization: `JWT ${access_token}`,
          },
          method: "POST",
          body: {
            clause_id: `${clause_id}`,
          },
        }
      },
      invalidatesTags: ["contractDetail"],
    }),

    updateClausesInContract: builder.mutation({
      query(data) {
        const {
          contract_id,
          access_token,
          clauses,
        } = data
        return {
          url: `update_clauses/${contract_id}/`,
          headers: {
            Authorization: `JWT ${access_token}`,
          },
          method: "POST",
          body: {
            clauses: `${clauses}`,
          },
        }
      },
      invalidatesTags: ["contractDetail"],
    }),

    generatePDFofContract: builder.query({
      query(data) {
        const {
          contract_id,
          access_token,
        } = data
        return {
          url: `generate_pdf/${contract_id}/`,
          headers: {
            Authorization: `JWT ${access_token}`,
            "Content-Type": "application/pdf",
            "Accept": "application/pdf",
            // "Content-Type": "application/octet-stream"
          },
          method: "GET",
          responseType: "blob",
        }
      },
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
  useRemovePartyFromContractMutation,
  useAddClauseToContractMutation,
  useDeleteClauseFromContractMutation,
  useUpdateClausesInContractMutation,
  useLazyGeneratePDFofContractQuery,
} = contractsApi
