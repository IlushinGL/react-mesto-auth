import React from 'react';
import { NavLink } from 'react-router-dom';
import logoPath from '../images/Logo.svg';

function Header({email}) {

  return (
    <header className="header">
      <div className="header__logo">
        <img src={logoPath} alt="лого" />
      </div>
      <h3>{email}</h3>
      <div className='data__link'>{
        email ? 'Выйти' :
        <NavLink to="/sign-up" className='data__link'>
          Регистрация
        </NavLink>}
      </div>
    </header>
  );
}

export default Header;
