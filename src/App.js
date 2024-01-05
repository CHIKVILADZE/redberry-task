import React from 'react';
import './App.css';
import axios from 'axios';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import { TokenProvider } from './context/TokenProvider';
import Home from './pages/Home'; // Import your Home component
import AddBlog from './pages/AddBlog';
import Blog from './pages/Blog';

function App() {
  return (
    <TokenProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addblog" element={<AddBlog />} />
          <Route path="/blog/:id" element={<Blog />} />
        </Routes>
      </BrowserRouter>
    </TokenProvider>
  );
}

export default App;
