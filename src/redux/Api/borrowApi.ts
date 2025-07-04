import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const borrowApi = createApi({
  reducerPath: 'borrowApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/borrowApi' }),
  tagTypes: ['borrow'],
  endpoints: builder => ({
    // getAllbook: builder.query({
    //   query: () => `/borrow`,
    //   providesTags: ['borrow'],
    // }),
    // getBookById: builder.query({
    //   query: id => `/borrow/${id}`,
    // }),

    borrowBook: builder.mutation({
      query: data => ({
        url: '/borrow',
        method: 'POST',
        body: data, // { book, quantity, dueDate }
      }),
      invalidatesTags: ['borrow'],
    }),

    getBorrowSummary: builder.query({
      query: () => '/borrow-summary',
      providesTags: ['borrow'],
    }),

    // updateBook: builder.mutation({
    //   query: ({ id, updatedData }) => ({
    //     url: `/edit-book/${id}`,
    //     method: 'PUT',
    //     body: updatedData,
    //   }),
    //   invalidatesTags: ['borrow'],
    // }),
    // deleteBook: builder.mutation({
    //   query: id => ({
    //     url: `/borrow/${id}`,
    //     method: 'DELETE',
    //   }),
    //   invalidatesTags: ['borrow'],
    // }),
  }),
});

export const { useBorrowBookMutation, useGetBorrowSummaryQuery } = borrowApi;
