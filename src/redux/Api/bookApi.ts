import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bookApi = createApi({
  reducerPath: 'bookApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/bookApi' }),
  tagTypes: ['books'],
  endpoints: builder => ({
    getAllbook: builder.query({
      query: () => `/books`,
      providesTags: ['books'],
    }),
    deleteBook: builder.mutation({
      query: id => ({
        url: `/books/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['books'],
    }),
  }),
});

export const { useGetAllbookQuery , useDeleteBookMutation} = bookApi;