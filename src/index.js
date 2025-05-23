import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap-icons/font/bootstrap-icons.css';


// ✅ Import Bootstrap CSS di sini, bukan di index.css
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
