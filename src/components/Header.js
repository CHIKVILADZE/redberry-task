import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';

import AuthModal from './Auth';

function Header() {
  return (
    <div className="d-flex align-items-center justify-content-between px-5  py-2">
      <div>
        {' '}
        <img src="/assets/logo.png" alt="logo" />
      </div>
      <div>
        {' '}
        <AuthModal />
      </div>
    </div>
  );
}

export default Header;
