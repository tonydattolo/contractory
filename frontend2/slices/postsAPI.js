import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/posts/",
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
    },
  }),
  tagTypes: ["posts"],
  endpoints: (builder) => ({
    getAllPosts: builder.query({
      query: () => "",
      providesTags: ["posts"],
    }),
    getPostsByUser: builder.query({
      query: (email) => `${email}`,
      providesTags: ["posts"],
    }),
    createPost: builder.mutation({
      query(data) {
        // console.log(`data: ${data}`)
        const { post_author, post_text, access_token } = data;
        // const body = JSON.stringify({ post_author, post_text });
        // console.log(`accesstoken in RTKQ: ${access_Token}`)
        // console.log(`postauthor in RTKQ: ${post_Author}`)
        // console.log(`posttext in RTKQ: ${post_Text}`)
        return {
          url: "create/",
          headers: {
            Authorization: `JWT ${access_token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "POST",
          body: {
            post_author: `${post_author}`,
            post_text: `${post_text}`,
          }
        };
      },
      invalidatesTags: ["posts"],
    }),
    deletePost: builder.mutation({
      query(data) {
        const { postIDtoDelete, access_Token } = data;
        return {
          url: `delete/${postIDtoDelete}/`,
          headers: {
            Authorization: `JWT ${access_Token}`,
          },
          method: "DELETE",
        };
      },
      invalidatesTags: ["posts"],
    }),
    // getPost: builder.query({
    //   query(data) {
    //     const { postID } = data;
    //     return {
    //       url: `${postID}`,
    //     };
    //   },
    // }),
    refetchOnMountOrArgChange: true,

  }),
});

export const {
  useGetPostsByUserQuery,
  useGetAllPostsQuery,
  useCreatePostMutation,
  useDeletePostMutation,
} = postsApi;
