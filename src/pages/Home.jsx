import React from 'react';
import Categories from '../components/Catogiries';
import Form from '../components/Form';

function Home() {
  return (
    <>
      <div className="border border-danger">
        Hello
        <Categories />
      </div>
      <Form />
    </>
  );
}

export default Home;
