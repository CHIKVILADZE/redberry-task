import React from 'react';
import '../index.css';
import Categories from '../components/Catogiries';
import Blogs from '../components/Blogs';

function Home() {
  return (
    <>
      <div
        className="border border-danger d-flex flex-column align-items-center"
        style={{ backgroundColor: '#F3F2FA' }}
      >
        <div
          className="w-100 border border-black mt-5 d-flex align-items-center justify-content-between"
          style={{ paddingLeft: 89, paddingRight: 76 }}
        >
          <h1 className="fw-bold custom-h1">ბლოგი</h1>
          <img src="/assets/blogs.png" alt="blogs" />
        </div>
        <Categories />
        <div
          className="w-100  mt-5 border border-primary d-flex flex-row flex-wrap  justify-content-start"
          style={{ paddingLeft: 89, paddingRight: 76, gap: '100px' }}
        >
          <Blogs />
        </div>
      </div>
    </>
  );
}

export default Home;
