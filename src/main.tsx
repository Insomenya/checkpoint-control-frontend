import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from '@/app/App';
import { makeServer } from '@/services/mirageServer';

console.log(import.meta.env.VITE_NEEDS_MIRAGE)

if (import.meta.env.VITE_NEEDS_MIRAGE === 'true') {
  makeServer({ environment: import.meta.env.MODE });
}


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
