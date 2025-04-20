import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from '@/app/App';
import { makeServer } from '@/services/mirageServer';

if (import.meta.env.VITE_NEEDS_MIRAGE === 'true') {
  console.log('Starting Mirage server in', import.meta.env.MODE, 'mode');
  makeServer({ environment: import.meta.env.MODE });
} else {
  console.log('Using real API at', import.meta.env.VITE_API_HOST);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
