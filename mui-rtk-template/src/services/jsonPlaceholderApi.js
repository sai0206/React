import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { incrementLoading, decrementLoading } from '../features/ui/uiSlice'

const baseUrl = import.meta.env.VITE_API_BASE_URL || 'https://jsonplaceholder.typicode.com/'

const rawBaseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('auth_token')
    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }
    headers.set('x-app-name', import.meta.env.VITE_APP_NAME || 'mui-rtk-template')
    return headers
  },
})

const baseQueryWithInterceptors = async (args, api, extraOptions) => {
  api.dispatch(incrementLoading())
  try {
    const result = await rawBaseQuery(args, api, extraOptions)
    if (result.error && result.error.status === 401) {
      // Example: handle unauthorized globally
      // api.dispatch(logout())
    }
    return result
  } finally {
    api.dispatch(decrementLoading())
  }
}

export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithInterceptors,
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

