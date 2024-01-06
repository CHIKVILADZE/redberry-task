import React, { useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios';
import { TokenContext } from '../context/TokenProvider';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

function Similars({ categoryIds, blogId }) {
  const [similarBlogs, setSimilarBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const { token } = useContext(TokenContext);

  const swiperRef = useRef(null);

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
      <div className="w-100 d-flex flex-column">
        <div className="d-flex justify-content-between">
          <h3 className="fs-3 text-black fw-bold">მსგავსი სტატიები</h3>
          <div className="d-flex  gap-3">
            <img
              src="/assets/arr.png"
              alt="left"
              width={44}
              height={44}
              onClick={() => swiperRef.current.slidePrev()}
              style={{ cursor: 'pointer', color: 'red' }}
              className="arrow-left-custom "
            />
            <img
              src="/assets/arrow-right.png"
              alt="right"
              width={44}
              height={44}
              onClick={() => swiperRef.current.slideNext()}
              style={{ cursor: 'pointer' }}
              className="arrow-right-custom"
            />
          </div>
        </div>
        <div className=" mt-3 d-flex">
          <Swiper
            slidesPerView={3}
            spaceBetween={50}
            className="mySwiper d-flex justify-content-between"
            navigation={{
              prevEl: '.arrow-left-custom',
              nextEl: '.arrow-right-custom',
            }}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
          >
            {filteredBlogs.map((blog) => (
              <SwiperSlide
                key={blog.id}
                style={{
                  width: '430px',
                  height: '615px',
                  backgroundColor: '#F3F2FA',
                }}
              >
                <div className=" d-flex flex-column align-items-start">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    height={328}
                    style={{ borderRadius: '12px', width: '100%' }}
                  />
                  <p className="text-black fw-bold fs-5 mt-3 mb-2">
                    {blog.author}
                  </p>
                  <span className="text-muted fs-6"> {blog.formattedDate}</span>
                  <h2 className="text-black fw-bold fs-4 mt-2 text-start">
                    {' '}
                    {blog.title.length > 60
                      ? blog.title.substring(0, 60) + '...'
                      : blog.title}
                  </h2>
                  <div className="w-100  d-flex flex-row gap-4 mt-4">
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

                  <p className="fs-6 text-black mt-3 text-start">
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
                      }}
                    >
                      სრულად ნახვა
                      <img src="/assets/Arrow.png" alt="Arrow" />
                    </p>
                  </Link>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
}

export default Similars;

<div></div>;
