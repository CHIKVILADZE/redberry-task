import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { TokenContext } from '../context/TokenProvider';

function Similars({ categoryIds, blogId }) {
  const [similarBlogs, setSimilarBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const { token } = useContext(TokenContext);

  useEffect(() => {
    axios
      .get('https://api.blog.redberryinternship.ge/api/blogs', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        if (Array.isArray(response.data.data)) {
          setSimilarBlogs(response.data.data);
        } else {
          console.error('Error: Invalid response data');
        }
      })
      .catch((error) => {
        console.error('Error fetching blogs:', error);
      });
  }, [token]);

  useEffect(() => {
    if (similarBlogs.length > 0) {
      const filtered = similarBlogs.filter((blog) => {
        return blog.categories.some((category) =>
          categoryIds.includes(category.id)
        );
      });

      const updatedFilteredBlogs = filtered.filter(
        (blog) => blog.id !== blogId
      );

      setFilteredBlogs(updatedFilteredBlogs);
    }
  }, [similarBlogs, categoryIds, blogId]);

  console.log('FilteredBlogs', filteredBlogs);
  console.log('blogId', blogId);

  return (
    <>
      <div className="w-100 d-flex flex-row justify-content-between">
        <h3>მსგავსი სტატიები</h3>
        <div>
          {filteredBlogs.map((blog) => (
            <div key={blog.id}>{blog.title}</div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Similars;
