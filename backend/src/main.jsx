// Tarayıcıda (Client/Browser) çalışır. -Frontend-
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css' // Tailwind buraya import edilir

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <App /> {/* App.js içinde Router varsa buraya sarmalamaya gerek yok, ama kontrol et */}
  </React.StrictMode>,
)