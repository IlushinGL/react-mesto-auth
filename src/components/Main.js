import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Card from './Card';

function Main({cards, onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDelete}) {
  const currentUser = React.useContext(CurrentUserContext);
  return (
    <main className="content">

      <section className="profile">
        <div onClick={onEditAvatar} className="profile__avatar">
          <img id="profile-avatar" className="profile__avatar-img" src={currentUser.avatar} alt="аватар" />
        </div>

        <div className="profile__info">
          <h1 id="profile-text-author" className="profile__title">{currentUser.name}</h1>
          <button onClick={onEditProfile} type="button" className="profile__edit-button"></button>
          <p id="profile-text-job" className="profile__subtitle">{currentUser.about}</p>
        </div>
        <button onClick={onAddPlace} type="button" className="profile__add-button"></button>
      </section>

      <section className="elements">
        {cards.map((card) => (
          <Card
            key={'' + card._id}
            card={card}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete} />
        ))}
      </section>

    </main>
  );
}

export default Main;
