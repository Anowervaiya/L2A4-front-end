
import Table from './components/ui/table';
import { AddBooks } from './home/AddBooks';

function App() {
  
  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
   
      <AddBooks></AddBooks>
    
      <Table></Table>
      

    </div>
  );
}

export default App;
