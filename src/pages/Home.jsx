import React, { useState } from 'react';
import '../index.css';
import Blogs from '../components/Blogs';
import CategoriesWithSwiper from '../components/Catogiries';

function Home() {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCategorySelect = (categoryIds) => {
    setSelectedCategories([...selectedCategories, ...categoryIds]);
  };

  return (
    <>
      <div
        className=" d-flex flex-column align-items-center"
        style={{ backgroundColor: '#F3F2FA' }}
      >
        <div
          className="w-100  mt-5 d-flex align-items-center justify-content-between"
          style={{ paddingLeft: 89, paddingRight: 76 }}
        >
          <h1 className="fw-bold custom-h1">ბლოგი</h1>
          <img src="/assets/blogs.png" alt="blogs" />
        </div>
        <CategoriesWithSwiper
          onCategorySelect={handleCategorySelect}
          selectedCategories={selectedCategories}
        />
        <div
          className="w-100  mt-5  d-flex flex-row flex-wrap  justify-content-start"
          style={{ paddingLeft: 89, paddingRight: 76, gap: '100px' }}
        >
          <Blogs selectedCategories={selectedCategories} />
        </div>
      </div>
    </>
  );
}

export default Home;
