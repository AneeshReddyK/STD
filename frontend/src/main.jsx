// index.js or App.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './Routes.jsx';
import { AuthProvider } from './components/AuthContext'; // Correct import path

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
);
