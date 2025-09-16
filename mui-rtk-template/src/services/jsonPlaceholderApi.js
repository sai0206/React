import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }),
  tagTypes: ['Post', 'User'],
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => 'posts',
      providesTags: (result = []) => [
        ...result.map((post) => ({ type: 'Post', id: post.id })),
        { type: 'Post', id: 'LIST' },
      ],
    }),
    getPost: builder.query({
      query: (id) => `posts/${id}`,
      providesTags: (result, error, id) => [{ type: 'Post', id }],
    }),
    getUsers: builder.query({
      query: () => 'users',
      providesTags: (result = []) => [
        ...result.map((user) => ({ type: 'User', id: user.id })),
        { type: 'User', id: 'LIST' },
      ],
    }),
  }),
})

export const { useGetPostsQuery, useGetPostQuery, useGetUsersQuery } = api

