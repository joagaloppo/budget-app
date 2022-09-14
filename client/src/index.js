import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

// Components
import App from './App.js';

// Styles
import './styles/index.css';
import './styles/auth.css';
import './styles/nav.css';
import './styles/summary.css';
import './styles/manage.css';
import './styles/form.css';
import './styles/responsive.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);