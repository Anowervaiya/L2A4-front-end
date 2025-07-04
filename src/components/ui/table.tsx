
import { BorrowDialog } from '@/home/BorrowBook';
import { UpdateBook } from '@/home/UpdateBooks';
import { useDeleteBookMutation, useGetAllbookQuery } from '@/redux/Api/bookApi';
import { useState } from 'react';
import Swal from 'sweetalert2';


type Book = {
  _id: number;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description: string;
  copies: number;
  available: boolean;
};

function Table() {
  const { data, isLoading } = useGetAllbookQuery(undefined);
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  
  const [selectedBook, setSelectedBook] = useState<{
    id: string;
    availableCopies: number;
  } | null>(null);

  const handleBorrowClick = (book: { id: string; copies: number }) => {
    setSelectedBook({ id: book.id, availableCopies: book.copies });
  };

  const [deleteBooks] = useDeleteBookMutation();

  // console.log(data);
  const books = data?.data;

  const handleDelete = (id : number) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async result => {
      if (result.isConfirmed) {
        try {
          await deleteBooks(id); 
          Swal.fire({
            title: 'Deleted!',
            text: 'Your book has been deleted.',
            icon: 'success',
          });
        } catch (error) {
          Swal.fire({
            title: 'Error!',
            text: 'Something went wrong while deleting.',
            icon: 'error',
          });
          console.error('Delete error:', error);
        }
      }
    });
  };

  if (isLoading) return <div>Loading...</div>;
   
    return (
      <div>
        <section className="container px-4 mx-auto">
          <div className="flex items-center gap-x-3">
            <h2 className="text-lg font-medium    dark:text-white">All Books</h2>

            <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">
              {books.length}
            </span>
          </div>

          <div className="flex flex-col mt-6">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200 *:text-center dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800 *:text-center">
                      <tr>
                        <th
                          scope="col"
                          className="px-12 py-3.5 text-sm font-normal   rtl:text-right    dark:text-gray-400"
                        >
                          <button>
                            <span>Title</span>
                          </button>
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal rtl:text-right    dark:text-gray-400"
                        >
                          <button>
                            <span>Author</span>
                          </button>
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal   rtl:text-right    dark:text-gray-400"
                        >
                          ISBN
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal   rtl:text-right    dark:text-gray-400"
                        >
                          Copies
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal   rtl:text-right    dark:text-gray-400"
                        >
                          Availability
                        </th>

                        <th scope="col" className="relative py-3.5 px-4">
                          <span className="px-4 py-3.5 text-sm font-normal   rtl:text-right    dark:text-gray-400">
                            Action
                          </span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">

                      {books.map((item :Book , idx :number ) => {
                        return (
                          <tr key={idx}>
                            <td className="px-4 py-4 text-sm font-medium    whitespace-nowrap">
                              <h2 className="font-medium    dark:text-white ">
                                {item.title}
                              </h2>
                            </td>
                            <td className="px-12 py-4 text-sm font-medium   whitespace-nowrap">
                              <div className="inline-flex items-center  ">
                                {item.author}
                              </div>
                            </td>
                            <td className="px-4 py-4 text-sm    dark:text-gray-300 whitespace-nowrap">
                              {item.isbn}
                            </td>
                            <td className="px-4 py-4 text-sm    dark:text-gray-300 whitespace-nowrap">
                              {item.copies}
                            </td>
                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                              <div className="flex items-center gap-x-2">
                                <div className="px-3 py-1 text-xs text-indigo-500 rounded-full dark:bg-gray-800 bg-indigo-100/60">
                                  {item.available ? 'true' : 'false'}
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                              <div className="flex items-center gap-x-6">

                                {/* delete  */}
                                <button
                                  onClick={() => handleDelete(item?._id)}
                                  className="   transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-red-500 focus:outline-none"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    className="w-5 h-5"
                                  >
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                    />
                                  </svg>
                                </button>
                            {/* edit */}
                                <button
                                  className="hover:text-yellow-400 hover:cursor-pointer"
                                  onClick={() => {
                                    setSelectedBookId(item._id.toString());
                                    setIsUpdateDialogOpen(true);
                                  }}
                                >
                                  Edit
                                </button>

                                <UpdateBook
                                  bookId={selectedBookId}
                                  open={isUpdateDialogOpen}
                                  onClose={() => setIsUpdateDialogOpen(false)}
                                />

                             {/* borrow */}
                                <button onClick={() => handleBorrowClick({ id: item._id.toString(), copies: item.copies })}>
                                  Borrow
                                </button>

                                {selectedBook && (
                                  <BorrowDialog
                                    open={!!selectedBook}
                                    onClose={() => setSelectedBook(null)}
                                    bookId={selectedBook.id}
                                    availableCopies={
                                      selectedBook.availableCopies
                                    }
                                  />
                                )}

                                <button>
                                  <svg
                                    width="24px"
                                    height="24px"
                                    viewBox="0 0 24 24"
                                    className="w-7 h-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <circle cx="16.5" cy="18.5" r="1.5" />
                                    <circle cx="9.5" cy="18.5" r="1.5" />
                                    <path d="M18 16H8a1 1 0 0 1-.958-.713L4.256 6H3a1 1 0 0 1 0-2h2a1 1 0 0 1 .958.713L6.344 6H21a1 1 0 0 1 .937 1.352l-3 8A1 1 0 0 1 18 16zm-9.256-2h8.563l2.25-6H6.944z" />
                                  </svg>
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}

                    
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-6">
            <a
              href="#"
              className="flex items-center px-5 py-2 text-sm   capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-5 h-5 rtl:-scale-x-100"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                />
              </svg>

              <span>previous</span>
            </a>

            <div className="items-center hidden lg:flex gap-x-3">
              <a
                href="#"
                className="px-2 py-1 text-sm text-blue-500 rounded-md dark:bg-gray-800 bg-blue-100/60"
              >
                1
              </a>
              <a
                href="#"
                className="px-2 py-1 text-sm    rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
              >
                2
              </a>
              <a
                href="#"
                className="px-2 py-1 text-sm    rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
              >
                3
              </a>
              <a
                href="#"
                className="px-2 py-1 text-sm    rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
              >
                ...
              </a>
              <a
                href="#"
                className="px-2 py-1 text-sm    rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
              >
                12
              </a>
              <a
                href="#"
                className="px-2 py-1 text-sm    rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
              >
                13
              </a>
              <a
                href="#"
                className="px-2 py-1 text-sm    rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
              >
                14
              </a>
            </div>

            <a
              href="#"
              className="flex items-center px-5 py-2 text-sm   capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
            >
              <span>Next</span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-5 h-5 rtl:-scale-x-100"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </a>
          </div>
        </section>
      </div>
    );
  
}
  export default Table;
