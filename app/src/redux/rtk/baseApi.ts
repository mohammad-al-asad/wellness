import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'https://dominion-wellness-solutions.vercel.app/api/v1',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth.accessToken;
      console.log("API Header - Token exists:", !!token);
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => '/users',
    }),
  }),
})

export const { useGetUsersQuery } = api