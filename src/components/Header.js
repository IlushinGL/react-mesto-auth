// import React from 'react';
import logoPath from '../images/Logo.svg';

function Header() {
  return (
    <header className="header">
      <div className="header__logo">
        <img src={logoPath} alt="лого" />
      </div>
    </header>
  );
}

export default Header;
