import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import BlogPage from './pages/BlogPage';
import ArticlePage from './pages/ArticlePage';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/artikel/:slug" element={<ArticlePage />} />
    </Routes>
  </BrowserRouter>
);
