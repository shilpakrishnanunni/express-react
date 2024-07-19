import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import {
  createBrowserRouter,
  RouterProvider,
  BrowserRouter
} from "react-router-dom";
import App from './App.jsx'
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    path: "/",
    element: < App />
  }
])
const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    {/* <RouterProvider router={router} /> */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
)
