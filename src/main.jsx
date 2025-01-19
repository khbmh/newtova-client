import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router'; 
import AppRoutes from './components/routes/AppRoutes';
import AuthProvider from './components/context/AuthProvider';
import DataProvider from './components/context/DataProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create an instance of QueryClient
const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        {/* Pass the instance of QueryClient */}
        <QueryClientProvider client={queryClient}>
          <DataProvider>
            <AppRoutes />
          </DataProvider>
        </QueryClientProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
