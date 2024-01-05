import React from 'react';
import './App.css';
import axios from 'axios';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import { TokenProvider } from './context/TokenProvider';
import Home from './pages/Home'; // Import your Home component
import AddBlog from './pages/AddBlog';

function App() {
  return (
    <TokenProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />{' '}
          <Route path="/addblog" element={<AddBlog />} />{' '}
          {/* Add more routes for other pages */}
        </Routes>
      </BrowserRouter>
    </TokenProvider>
  );
}

export default App;
