import React from 'react';
import { NavLink } from 'react-router-dom';
import logoPath from '../images/Logo.svg';

function Header({email, linkName, linkTo, onSignout}) {

  function link(linkName, linkTo, onSignout) {
    if (onSignout) {
      return (<div onClick={onSignout} className='data__link'>
        {linkName}
      </div>)
    } else {
      return (<NavLink to={linkTo} className='data__link'>
        {linkName}
      </NavLink>)
    }
  }

  return (
    <header className="header">
      <div className="header__logo">
        <img src={logoPath} alt="лого" />
      </div>
      <h3 className='data__text'>{email}</h3>
      {link(linkName, linkTo, onSignout)}
    </header>
  );
}

export default Header;
