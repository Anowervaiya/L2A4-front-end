import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { Provider } from 'react-redux';
import { store } from './redux/store.ts';
import { ToastContainer } from 'react-toastify';

import { createBrowserRouter, RouterProvider } from 'react-router';
import { Home } from './home/Home.tsx';
import Layout from './Layout/Layout.tsx';
import { BorrowSummary } from './home/borrowSummary.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home></Home>,
    children: [
      {
        path: '/',
        element: <Layout></Layout>,
      },
      {
        path: '/all-books',
        element: <App></App>,
      },
      {
        path: '/borrow-summary',
        element: <BorrowSummary></BorrowSummary>,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <ToastContainer />
      {/* <App /> */}
    </Provider>
  </StrictMode>
);
