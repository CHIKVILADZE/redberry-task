import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Catogiries() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await axios.get(
          'https://api.blog.redberryinternship.ge/api/categories'
        );
        const categoriesData = response.data.data; // Access response.data.data

        // Ensure categoriesData is an array before setting the state
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
    <div className="d-flex flex-wrap gap-3">
      {categories.map((category) => (
        <button
          key={category.id}
          style={{
            color: category.background_color, // Set text color same as background_color
            backgroundColor: `${category.background_color}33`, // Add alpha for opacity to background_color
            border: 'none',
            borderRadius: 30,
            padding: '8px 16px',
            cursor: 'pointer',
          }}
        >
          {category.title}
        </button>
      ))}
    </div>
  );
}

export default Catogiries;
