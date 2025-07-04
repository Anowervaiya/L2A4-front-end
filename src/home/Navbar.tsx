
import { Outlet } from 'react-router';
import { AddBooks } from './AddBooks';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

function Navbar() {
  return (
    <div>
      <div className="container mx-auto mt-12 ">
        <Button variant="outline" className="mx-8">
          {' '}
          <Link to={'/'}> Home</Link>
        </Button>
        <Button variant="outline" className="mx-8">
          {' '}
          <Link to={'/all-books'}> All Books</Link>
        </Button>
        <Button variant="outline" className="mx-8">
          {' '}
          <Link to={'/borrow-summary'}> Borrow Summary</Link>
        </Button>

        
          <AddBooks></AddBooks>
       
      </div>
      <Outlet></Outlet>
    </div>
  );
}

export default Navbar