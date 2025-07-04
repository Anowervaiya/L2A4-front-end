import Navbar from '@/home/Navbar';
import { Outlet } from 'react-router-dom';
function Layout() {
  return (
    <div>
      <div className="grid md:grid-cols-3 gap-6 text-center">
        <div className="bg-white shadow-md p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-blue-700 mb-2">
            📚 Book Collection
          </h2>
          <p className="text-gray-600">
            Organize, update, and explore your full book list with details and
            genres.
          </p>
        </div>

        <div className="bg-white shadow-md p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-green-700 mb-2">
            🛠️ Easy Management
          </h2>
          <p className="text-gray-600">
            Add, edit, delete, or borrow books through a simple, responsive
            interface.
          </p>
        </div>

        <div className="bg-white shadow-md p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-purple-700 mb-2">
            📈 Borrow Summary
          </h2>
          <p className="text-gray-600">
            View borrowing trends and aggregated stats for better decision
            making.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Layout;
