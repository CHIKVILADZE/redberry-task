import React from 'react';
import Categories from '../components/Catogiries';
import UploadImage from '../components/UploadImage';
import Blogs from '../components/Blogs';

function Home() {
  return (
    <>
      <div className="border border-danger">
        Hello
        <Categories />
      </div>
      <Blogs />
    </>
  );
}

export default Home;
