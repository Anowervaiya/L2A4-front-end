# 📚 Minimal Library Management System

A full-stack, minimalistic Library Management System built using **React**, **Redux Toolkit Query (RTK Query)**, **TypeScript**, **Node.js**, **Express.js**, and **MongoDB**.  
It allows users to view, manage, borrow books, and see borrow summaries — without authentication or complex roles.

---

## 🌐 Live Demo

🔗 [Frontend Live]([https://your-frontend-url.com](https://glittery-cheesecake-cf81ab.netlify.app/))  
🔗 [Backend API]([https://your-backend-url.com/api](https://l2a4-mu.vercel.app/))

---

## 🚀 Features

### ✅ Book Management
- View all books in a table format
- Add new books with title, author, genre, ISBN, copies, etc.
- Edit existing book info
- Delete books
- Availability automatically toggled if copies = 0

### ✅ Borrow Book
- Borrow books by specifying quantity and due date
- Prevents borrowing more than available copies
- Automatically updates book availability status
- Simple modal form for smooth user experience

### ✅ Borrow Summary
- Aggregated summary view of all borrowed books
- Shows total quantity borrowed for each book
- Columns: **Book Title**, **ISBN**, **Total Quantity Borrowed**

### ✅ UI/UX
- Clean, minimalist design
- Fully responsive layout
- Toast notifications for feedback
- Modals for create/edit/borrow operations

---

## 🧱 Tech Stack

| Layer        | Technology                  |
|--------------|------------------------------|
| Frontend     | React, TypeScript, Tailwind CSS |
| State Mgmt   | Redux Toolkit, RTK Query     |
| Backend      | Node.js, Express.js          |
| Database     | MongoDB, Mongoose            |
| Styling      | Tailwind CSS                 |

---

## 📁 Folder Structure

root/
├── client/ # React frontend
│ ├── components/ # UI components
│ ├── pages/ # Page-level components
│ ├── redux/ # RTK Query APIs and slices
│ └── App.tsx
├── server/ # Express backend
│ ├── controllers/ # Route handlers
│ ├── models/ # Mongoose models
│ ├── interfaces/ # Type definitions
│ └── app.ts # Entry point

yaml
Copy
Edit

---

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/library-management.git
cd library-management
