import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';

import EmailModal from './EmailModal';

function Header() {
  return (
    <div>
      <div>
        {' '}
        <img src="/assets/logo.png" alt="logo" />
      </div>
      <div>
        {' '}
        <EmailModal />
      </div>
    </div>
  );
}

export default Header;
