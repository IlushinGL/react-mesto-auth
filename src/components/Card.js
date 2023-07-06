import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import likeNoPath from '../images/heart_no.svg';
import likeYesPath from '../images/heart_yes.svg';

function Card({card, onCardClick, onCardLike, onCardDelete}) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(item => item._id === currentUser._id);
  const srcLike = isLiked ? [likeYesPath, 'yes'] : [likeNoPath, 'no'];

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <div className="elements__element">
      <img onClick={handleClick} className="elements__element-img"
            src={card.link} alt={card.name} />
      <div className="elements__element-caption">
        <h2 className="elements__element-text">{card.name}</h2>
        <button type="button" className="elements__element-favour" onClick={handleLikeClick}>
          <img className="icon" src={srcLike[0]} alt={srcLike[1]} />
          <div className="likes">{card.likes.length}</div>
        </button>
      </div>
      {isOwn && <button type="button" className='elements__element-trash' onClick={handleDeleteClick} />}
    </div>
  );
}

export default Card;
