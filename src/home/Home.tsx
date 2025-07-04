import { Link, Outlet } from 'react-router-dom';
import { AddBooks } from './AddBooks';
import { Button } from '@/components/ui/button';

export const Home = () => {
  return (
    <div className=" bg-gray-50 px-4 pt-10 ">
      <div className="">
        {/* Hero Section */}
        <div className="text-center mb-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Welcome to 📚 Minimal Library
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Manage your books, track borrowing records, and explore a collection
            of genres—all in one simple platform.
          </p>
          <div className="mt-6 flex justify-center gap-4 flex-wrap">
            <Link to="/">
              <Button className="bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 transition">
                📊 Home
              </Button>
            </Link>
            <Link to="/all-books">
              <Button className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition">
                📖 Browse Books
              </Button>
            </Link>
            <div>
              <AddBooks></AddBooks>
            </div>
            <Link to="/borrow-summary">
              <Button className="bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 transition">
                📊 Borrow Summary
              </Button>
            </Link>
          </div>
        </div>

        {/* Highlights Section */}

        <Outlet></Outlet>
      </div>
    </div>
  );
};
