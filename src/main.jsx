import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom'; // Importer BrowserRouter
import './index.css';
import './css/style.css';
import App from './App.jsx';
import AuthProvider from './AuthContext'; // Importation de AuthProvider

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>
  </StrictMode>
);
