import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";

// Create root DOM node
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render main app with routing and strict mode enabled
root.render(
  <React.StrictMode>
    {/* Wrap app in router, using basename for GitHub Pages or subdirectory hosting */}
    <BrowserRouter basename="/parking-enforcement-app">
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
