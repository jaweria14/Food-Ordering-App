import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import AppRoutes from './AppRoutes'
import Auth0ProviderWithNavigate from './Auth/Auth0ProviderWithNavigate'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from 'sonner'

const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      refetchOnWindowFocus:false,
    },
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
   <Auth0ProviderWithNavigate>
  <AppRoutes/>
  <Toaster visibleToasts={1} position='top-right' richColors/>
  </Auth0ProviderWithNavigate>
  </QueryClientProvider>
  </StrictMode>,
)
