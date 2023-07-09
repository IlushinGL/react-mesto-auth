import React from 'react';
import logoPath from '../images/Logo.svg';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Header() {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <header className="header">
      <div className="header__logo">
        <img src={logoPath} alt="лого" />
      </div>
      <h3>{currentUser._id ? currentUser.name : ''}</h3>
      <h3>{currentUser._id ? 'Выход' : ''}</h3>
    </header>
  );
}

export default Header;
