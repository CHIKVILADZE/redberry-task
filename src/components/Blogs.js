import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { TokenContext } from '../context/TokenProvider';
import { Link } from 'react-router-dom';

function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const { token } = useContext(TokenContext);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${month}.${day}.${year}`;
  };

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
            const formattedBlogs = response.data.data.map((blog) => ({
              ...blog,
              formattedDate: formatDate(blog.publish_date), // Format date here
            }));
            setBlogs(formattedBlogs);
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
    <>
      {blogs.map((blog) => (
        <div
          key={blog.id}
          style={{
            width: '430px',
            height: '632px',
          }}
          className="d-flex flex-column mt-5"
        >
          <img
            src={blog.image}
            alt={blog.title}
            width={430}
            height={328}
            style={{ borderRadius: '12px' }}
          />
          <p className="text-black fw-bold fs-5 mt-3 mb-2">{blog.author}</p>
          <span className="text-muted fs-6 "> {blog.formattedDate}</span>
          <h2 className="text-black fw-bold fs-4 mt-2">
            {' '}
            {blog.title.length > 60
              ? blog.title.substring(0, 60) + '...'
              : blog.title}
          </h2>
          <div className="w-100  d-flex flex-row gap-4 mt-2">
            {blog.categories.map((category) => (
              <div key={category.id}>
                <button
                  style={{
                    color: category.background_color,
                    backgroundColor: `${category.background_color}33`,
                    border: 'none',
                    fontSize: '12px',
                    padding: '6px 10px',
                    borderRadius: '12px',
                  }}
                >
                  {' '}
                  {category.title}
                </button>
              </div>
            ))}
          </div>

          <p className="fs-6 text-black mt-3">
            {' '}
            {blog.description.length > 87
              ? blog.description.substring(0, 87) + '...'
              : blog.description}
          </p>
          <Link
            to={`/blog/${blog.id}`}
            style={{ textDecoration: 'none', color: '#5D37F3' }}
          >
            <p
              style={{
                fontSize: '14px',
                fontWeight: 'bold',
                cursor: 'pointer',
                marginTop: '8px',
              }}
            >
              სრულად ნახვა
              <img src="/assets/Arrow.png" alt="Arrow" />
            </p>
          </Link>
        </div>
      ))}
    </>
  );
}

export default Blogs;
