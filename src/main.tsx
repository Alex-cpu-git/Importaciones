import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';

// React 19+ uses react-dom/client
import { createRoot } from 'react-dom/client';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
