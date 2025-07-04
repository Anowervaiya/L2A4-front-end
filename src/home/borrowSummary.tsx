import { useGetBorrowSummaryQuery } from '@/redux/Api/borrowApi';

export const BorrowSummary = () => {
  const { data, isLoading, isError } = useGetBorrowSummaryQuery(undefined);

  if (isLoading) return <p className="text-center mt-10">Loading summary...</p>;
  if (isError)
    return (
      <p className="text-center mt-10 text-red-500">Failed to load summary.</p>
    );

  const borrowSummary = data?.data || [];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">📊 Borrow Summary</h2>
      <table className="w-full table-auto border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left py-2 px-4 border-b">Book Title</th>
            <th className="text-left py-2 px-4 border-b">ISBN</th>
            <th className="text-left py-2 px-4 border-b">
              Total Quantity Borrowed
            </th>
          </tr>
        </thead>
        <tbody>
          {borrowSummary.map((item: any, index: number) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b">
                {item.book?.title || 'N/A'}
              </td>
              <td className="py-2 px-4 border-b">{item.book?.isbn || 'N/A'}</td>
              <td className="py-2 px-4 border-b">{item.totalQuantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
