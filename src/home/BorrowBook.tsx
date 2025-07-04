// components/BorrowDialog.tsx
import { useState } from 'react';
import {
  Dialog,
  DialogHeader,
  DialogFooter,
  DialogContent,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';
import { useBorrowBookMutation } from '@/redux/Api/borrowApi';

interface Props {
  open: boolean;
  onClose: () => void;
  bookId: string;
  availableCopies: number;
}

export const BorrowDialog = ({
  open,
  onClose,
  bookId,
  availableCopies,
}: Props) => {
  const [quantity, setQuantity] = useState(1);
  const [dueDate, setDueDate] = useState('');
  const [borrowBook, { isLoading }] = useBorrowBookMutation();

  const handleSubmit = async () => {
    if (quantity > availableCopies) {
      toast.error('Quantity exceeds available copies!');
      return;
    }

    try {
     
      await borrowBook({ book: bookId, quantity, dueDate }).unwrap();
      toast.success('Book borrowed successfully!');
      onClose();

      // Optionally redirect
      window.location.href = '/borrow-summary';
    } catch (err: any) {
      console.error('Borrow Error:', err);
      toast.error(err?.data?.message || 'Borrow failed!');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <form onSubmit={handleSubmit} action="">
          <DialogHeader>Borrow Book</DialogHeader>
          <div className="space-y-3">
            <Input
              type="number"
              min={1}
              max={availableCopies}
              value={quantity}
              onChange={e => setQuantity(Number(e.target.value))}
              placeholder="Quantity"
            />
            <Input
              type="date"
              value={dueDate}
              onChange={e => setDueDate(e.target.value)}
              placeholder="Due Date"
            />
          </div>
          <DialogFooter>
            <Button onClick={handleSubmit} disabled={isLoading}>
              {isLoading ? 'Borrowing...' : 'Borrow'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
