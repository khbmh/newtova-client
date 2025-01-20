import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router'; // Use createBrowserRouter and RouterProvider
import AppRoutes from './components/routes/AppRoutes'; // Ensure AppRoutes exports a route configuration array
import AuthProvider from './components/context/AuthProvider';
import DataProvider from './components/context/DataProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create an instance of QueryClient
const queryClient = new QueryClient();

// Create a data router using createBrowserRouter
const router = createBrowserRouter(AppRoutes);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Replace BrowserRouter with RouterProvider */}
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <DataProvider>
          <RouterProvider router={router} /> {/* Use RouterProvider */}
        </DataProvider>
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>,
);