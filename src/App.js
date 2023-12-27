import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import Header from './components/Header';

function App() {
  const [token, setToken] = useState('');

  useEffect(() => {
    const getToken = async () => {
      try {
        const response = await axios.get(
          'https://api.blog.redberryinternship.ge/api/token'
        );
        console.log('Token:', response.data);
        setToken(response.data.token);
      } catch (error) {
        console.error('Error fetching token:', error);
        // Handle errors if the request fails
      }
    };

    getToken();
  }, []);

  const handleClick = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.get(
        'https://api.blog.redberryinternship.ge/api/blogs',
        { headers }
      );
      console.log('Blogs:', response.data);
      // Handle the blogs data received
    } catch (error) {
      console.error('Error fetching blogs:', error);
      // Handle errors if the request fails
    }
  };

  return (
    <div className="App">
      <Header />
      Hello
      {/* <button onClick={handleClick}>Get Request</button> */}
    </div>
  );
}

export default App;
