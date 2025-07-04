
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAddBookMutation } from '@/redux/Api/bookApi';
import { useState } from 'react';

export function AddBooks() {
  const [addBook , {isLoading}] = useAddBookMutation();
  const [formData  , setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    isbn: '',
    description: '',
    copies: 0,
    available: false,
  });

  const handleChange = (name: string, value: string | number | boolean) => {
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  // console.log(formData);

  const handleSubmit = async (e: React.FormEvent) => {
    // console.log('inside submit');
    e.preventDefault();
    try {
      await addBook({
        ...formData,
        copies: Number(formData.copies),
        available: formData.available === true,
      }).unwrap();
      alert('Book added successfully');
     
      setFormData({
        title: '',
        author: '',
        genre: '',
        isbn: '',
        description: '',
        copies: 0,
        available: false,
      });
    } catch (err) {
      console.error('Error adding book:', err);
      alert('Failed to add book');
    }
  };
  return (
    <Dialog >
      <DialogTrigger asChild>
        <Button   className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition">
          📚 Add Book
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add Book</DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-4 ">
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

            <div className="grid gap-3 ">
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
                onChange={e => handleChange('copies', parseInt(e.target.value))}
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
          <div className="grid gap-3 pt-3">
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              rows={4}
              value={formData.description}
              onChange={e => handleChange('description', e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter a brief description of the book..."
            ></textarea>
          </div>

          <DialogFooter className="pt-4">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : 'save'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
