import { useEffect, useState } from 'react';
import { useAddBookMutation, useGetBookByIdQuery, useUpdateBookMutation } from '@/redux/Api/bookApi';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type UpdateBookProps = {
  bookId: string | null;
  onClose: () => void;
  open: boolean;
};

export function UpdateBook({ bookId, open, onClose }: UpdateBookProps) {
  const [addBook, { isLoading }] = useAddBookMutation();
  const { data, isLoading: fetching } = useGetBookByIdQuery(bookId, {
    skip: !bookId,
  });
  const [updateBook, { isLoading  : updateLoading}] = useUpdateBookMutation();

  const [formData, setFormData] = useState({
    _id: '',
    title: '',
    author: '',
    genre: '',
    isbn: '',
    description: '',
    copies: 0,
    available: false,
  });

  useEffect(() => {
    if (data?.data) {
      const book = data.data;
      setFormData({
        _id: book._id,
        title: book.title,
        author: book.author,
        genre: book.genre,
        isbn: book.isbn,
        description: book.description,
        copies: book.copies,
        available: book.available,
      });
    }
  }, [data]);
  const handleChange = (name: string, value: string | number | boolean) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateBook({
        id: formData._id,
        updatedData:formData,
      });
      alert('Book updated successfully');
      onClose();
    } catch (err) {
      console.error('Error updating book:', err);
      alert('Failed to update book');
    }
  };
 
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        {fetching ? (
          <p className="text-center py-4">Loading book data...</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>Update Book</DialogTitle>
            </DialogHeader>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-3">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={e => handleChange('title', e.target.value)}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="author">Author</Label>
                <Input
                  id="author"
                  value={formData.author}
                  onChange={e => handleChange('author', e.target.value)}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="genre">Genre</Label>
                <Select
                  value={formData.genre}
                  onValueChange={value => handleChange('genre', value)}
                >
                  <SelectTrigger id="genre">
                    <SelectValue placeholder="Select a genre" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="FICTION">Fiction</SelectItem>
                    <SelectItem value="NON_FICTION">Non-fiction</SelectItem>
                    <SelectItem value="SCIENCE">Science</SelectItem>
                    <SelectItem value="HISTORY">History</SelectItem>
                    <SelectItem value="BIOGRAPHY">Biography</SelectItem>
                    <SelectItem value="FANTASY">Fantasy</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="isbn">ISBN</Label>
                <Input
                  id="isbn"
                  value={formData.isbn}
                  onChange={e => handleChange('isbn', e.target.value)}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="copies">Copies</Label>
                <Input
                  id="copies"
                  type="number"
                  value={formData.copies}
                  onChange={e =>
                    handleChange('copies', parseInt(e.target.value))
                  }
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="available">Available</Label>
                <Select
                  value={formData.available ? 'true' : 'false'}
                  onValueChange={value =>
                    handleChange('available', value === 'true')
                  }
                >
                  <SelectTrigger id="available">
                    <SelectValue placeholder="Select availability" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Available</SelectItem>
                    <SelectItem value="false">Not Available</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <DialogFooter className="pt-4">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Saving...' : 'Save'}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
