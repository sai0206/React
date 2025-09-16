import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseUrl = import.meta.env.VITE_API_BASE_URL || 'https://jsonplaceholder.typicode.com/'

const rawBaseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers) => {
    // Let global fetch interceptor add auth/app headers
    // Add a bypass marker to avoid double counting loading
    headers.set('x-bypass-interceptor', 'true')
    return headers
  },
})

export const api = createApi({
  reducerPath: 'api',
  baseQuery: rawBaseQuery,
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

