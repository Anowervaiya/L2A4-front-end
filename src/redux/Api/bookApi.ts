import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const bookApi = createApi({
  reducerPath: 'bookApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/bookApi' }),
  tagTypes: ['books'],
  endpoints: builder => ({
    getAllbook: builder.query({
      query: () => `/books`,
      providesTags: ['books'],
    }),
    getBookById: builder.query({
      query: id => `/books/${id}`,
    }),
    addBook: builder.mutation({
      query: newBook => ({
        url: `/create-book`,
        method: 'POST',
        body: newBook,
      }),
      invalidatesTags: ['books'],
    }),
    updateBook: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `/edit-book/${id}`,
        method: 'PUT',
        body: updatedData,
      }),
      invalidatesTags: ['books'],
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

export const { useGetAllbookQuery, useDeleteBookMutation, useAddBookMutation , useGetBookByIdQuery , useUpdateBookMutation} =
  bookApi;
