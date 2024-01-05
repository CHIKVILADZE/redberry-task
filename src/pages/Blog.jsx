import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { TokenContext } from '../context/TokenProvider';
import Similars from '../components/Similars';

function Blog() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const { token } = useContext(TokenContext);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${month}.${day}.${year}`;
  };

  useEffect(() => {
    axios
      .get(`https://api.blog.redberryinternship.ge/api/blogs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        const formattedBlog = {
          ...response.data,
          publish_date: formatDate(response.data.publish_date),
        };
        setBlog(formattedBlog);
      })
      .catch((error) => {
        console.error('Error fetching blog:', error);
      });
  }, [id, token]);

  if (!blog) {
    return <div>Loading...</div>;
  }
  const categoryIds = blog
    ? blog.categories.map((category) => category.id)
    : [];
  console.log('categoryIds', categoryIds);
  return (
    <div
      className="w-100 h-100 d-flex flex-column align-items-center"
      style={{ backgroundColor: '#F3F2FA' }}
    >
      <div
        className="d-flex flex-column border border-black"
        style={{ width: '720px' }}
      >
        <img src={blog.image} alt={blog.title} width={720} height={328} />
        <p className="text-black fs-6 mt-4 mb-1">{blog.author}</p>
        <span>
          {blog.publish_date}&nbsp; • &nbsp;{blog.email}
        </span>
        <h1 className="text-black fs-1 fw-bold mt-3">{blog.title}</h1>
        <div className="d-flex flex-row gap-3 mt-3">
          {' '}
          {blog.categories.map((category) => (
            <div key={category.id}>
              <button
                style={{
                  color: category.background_color,
                  backgroundColor: `${category.background_color}33`,
                  border: 'none',
                  fontSize: '12px',
                  padding: '6px 14px',
                  borderRadius: '30px',
                }}
              >
                {' '}
                {category.title}
              </button>
            </div>
          ))}
        </div>
        <p className="text-black fs-5 mt-5">{blog.description}</p>
      </div>
      <div
        className="w-100 border border-danger d-flex flex-row "
        style={{ paddingLeft: '76px', paddingRight: '76px', marginTop: '98px' }}
      >
        <Similars categoryIds={categoryIds} blogId={blog.id} />
      </div>
    </div>
  );
}

export default Blog;
