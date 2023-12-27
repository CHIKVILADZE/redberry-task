// TokenContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const TokenContext = createContext();

const TokenProvider = ({ children }) => {
  const [token, setToken] = useState('');

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await axios.get(
          'https://api.blog.redberryinternship.ge/api/token'
        );
        const tokenFromApi = response.data.token;
        setToken(tokenFromApi);
      } catch (error) {
        console.error('Error fetching token:', error);
      }
    };

    fetchToken();
  }, []);

  return (
    <TokenContext.Provider value={{ token }}>{children}</TokenContext.Provider>
  );
};

export { TokenProvider, TokenContext };
