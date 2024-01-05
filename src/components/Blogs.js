import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { TokenContext } from '../context/TokenProvider';

function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const { token } = useContext(TokenContext);

  useEffect(() => {
    if (token) {
      axios
        .get('https://api.blog.redberryinternship.ge/api/blogs', {
          headers: {
            Authorization: `Bearer ${token}`,
            accept: 'application/json',
          },
        })
        .then((response) => {
          if (Array.isArray(response.data.data)) {
            setBlogs(response.data.data);
            console.log('response', response);
          } else {
            console.error('Invalid data format for blogs:', response.data);
          }
        })
        .catch((error) => {
          console.error('Error fetching blogs:', error);
        });
    }
  }, [token]); // Execute when the token changes

  console.log('Blogs:', blogs);
  console.log(token);

  return (
    <div>
      {/* Render the fetched blogs */}
      {blogs.map((blog) => (
        <div key={blog.id}>
          {/* Render blog details */}
          <h2>{blog.title}</h2>
          <p>{blog.description}</p>
          <img src={blog.image} alt={blog.title} />
          <p>Published: {blog.publish_date}</p>
          {/* Render category details */}
          {blog.categories.map((category) => (
            <div key={category.id}>
              <p>Category: {category.name}</p>
            </div>
          ))}
          <p>Author: {blog.author}</p>
          {/* Add more details as needed */}
        </div>
      ))}
    </div>
  );
}

export default Blogs;
