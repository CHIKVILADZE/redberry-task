import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import '../index.css';

function CategoriesWithSwiper({ onCategorySelect, selectedCategories }) {
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

  return (
    <div className="mt-5" style={{ width: '70%' }}>
      <Swiper spaceBetween={10} slidesPerView={6} className="w-70 ">
        {categories.map((category) => (
          <SwiperSlide
            key={category.id}
            onClick={() => onCategorySelect([category.id])} // Pass selected category ID(s)
            style={{
              backgroundColor: '#F3F2FA',
            }}
          >
            <div
              style={{
                width: '90%',
                color: category.background_color,
                backgroundColor: `${category.background_color}33`,
                borderRadius: 30,
                padding: '5px 10px',
                fontSize: '12px',
                cursor: 'pointer',
                border: selectedCategories.includes(category.id)
                  ? '1px solid black'
                  : 'none',
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
