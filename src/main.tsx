import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from '@/app/App';
import { makeServer } from '@/services/mirageServer';

if (import.meta.env.DEV) {
  makeServer({ environment: import.meta.env.MODE });
}


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
