import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import '../index.css';

function CategoriesWithSwiper() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await axios.get(
          'https://api.blog.redberryinternship.ge/api/categories'
        );
        const categoriesData = response.data.data;

        if (Array.isArray(categoriesData)) {
          setCategories(categoriesData);
        } else {
          console.error('Categories data is not an array:', categoriesData);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    getCategories();
  }, []);

  console.log('Categors', categories);

  return (
    <div className="border border-primary" style={{ width: '90%' }}>
      <Swiper
        spaceBetween={10}
        slidesPerView={6}
        className="w-70 border border-primary"
      >
        {categories.map((category) => (
          <SwiperSlide key={category.id}>
            <div
              style={{
                width: '90%',
                color: category.background_color,
                backgroundColor: `${category.background_color}33`,
                border: 'none',
                borderRadius: 30,
                padding: '8px 16px',

                cursor: 'pointer',
              }}
            >
              {category.title}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default CategoriesWithSwiper;
