import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const TokenContext = createContext();

const TokenProvider = ({ children }) => {
  const storedToken = localStorage.getItem('token');
  const [token, setToken] = useState(storedToken || '');

  useEffect(() => {
    if (!storedToken) {
      const fetchToken = async () => {
        try {
          const response = await axios.get(
            'https://api.blog.redberryinternship.ge/api/token'
          );
          const tokenFromApi = response.data.token;
          setToken(tokenFromApi);
          localStorage.setItem('token', tokenFromApi); // Store token in localStorage
        } catch (error) {
          console.error('Error fetching token:', error);
        }
      };

      fetchToken();
    }
  }, [storedToken]);

  return (
    <TokenContext.Provider value={{ token }}>{children}</TokenContext.Provider>
  );
};

export { TokenProvider, TokenContext };
