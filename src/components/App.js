import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { apInterface } from '../utils/Api';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import ConfirmationPopup from './ConfirmationPopup';
import avatarNulllPath from '../images/template.png';


function App() {
  const [currentUser, setCurrentUser] = React.useState({
    _id: '-1',
    name: 'имя',
    about: 'занятие',
    avatar: avatarNulllPath,
  });
  const [cards, setCards] = React.useState([]);
  const [isEditProfilePopupOpen, setProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setCard] = React.useState(null);
  const [deletedCard, setDeletedCard] = React.useState(null);

  React.useEffect(() => {
    // Помещаем МЕНЯ в КОНТЕКСТ.
    apInterface.getUserInfo()
    .then((info) => {setCurrentUser(info)})
    .catch((err)=>{console.log(err)});
    // Задаём начальный массив карточек.
    apInterface.getInitialCards()
    .then((initialCards) => {setCards(Array.from(initialCards))})
    .catch((err)=>{console.log(err)});
  }, []);

  function handleCardLike(card) {
    // Есть ли МОЙ лайк на карточке?
    const isLiked = card.likes.some(like => like._id === currentUser._id);
    // Отправить запрос в API на изменение лайка карточки, получить и отрисовать обновлённые данные
    apInterface.likeCard(card._id, !isLiked)
    .then((newCard) => {
      setCards((state) => state.map((item) => item._id === card._id ? newCard : item));
    })
    .catch((err)=>{
      console.log(err);
    });
  }

  function handleCardDelete(card) {
    // Установить карточку и открыть окно подтверждения
    setDeletedCard(card);
  }

  function handleCardDeleteConfirm() {
    // Отправить запрос в API на удаление карточки и отрисовать данные без неё
    apInterface.deleteCard(deletedCard._id)
    .then(() => {
      setCards((state) => state.filter((item) => item._id !== deletedCard._id));
      closeAllPopups();
    })
    .catch((err)=>{
      console.log(err);
    });
  }

  function handleUpdateUser(new_info) {
    // Отправить запрос в API на изменение и отрисовать новый профиль.
    apInterface.setUserInfo(new_info)
    .then((saved_info) => {
      setCurrentUser(saved_info);
    })
    .catch((err) => {
      console.log(`${err} <Не удалось изменить профиль name:${new_info.name} about:${new_info.about}>`)})
    .finally(() => {
      closeAllPopups();
    });
  }

  function handleUpdateAvatar(new_link) {
    // Отправить запрос в API на изменение и отрисовать новый аватар.
    apInterface.setUserAvatar(new_link)
    .then((saved_link) => {
      setCurrentUser(saved_link);
    })
    .catch((err) => {
      console.log(`${err} <Не удалось обновить аватар link:${new_link}>`)})
    .finally(() => {
      closeAllPopups();
    });
  }

  function handleAddPlaceSubmit(new_card) {
    // Отправить запрос в API на добавление карточки и отрисовать список.
    apInterface.addNewCard(new_card)
    .then((saved_card) => {
      setCards([saved_card, ...cards]);
    })
    .catch((err) => {
      console.log(`${err} <Не удалось добавить карточку name:${new_card.name} link:${new_card.link}>`)})
    .finally(() => {
      closeAllPopups();
    });
  }

  function handleEditAvatarClick() {
    setAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setPlacePopupOpen(true);
  }
  function handleCardClick(card) {
    setCard(card);
  }
  function closeAllPopups() {
    setProfilePopupOpen(false);
    setPlacePopupOpen(false);
    setAvatarPopupOpen(false);
    setCard(null);
    setDeletedCard(null);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main cards={cards}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
        />
        <Footer />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser} />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar} />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit} />

        <ConfirmationPopup
        isOpen={deletedCard}
        onClose={closeAllPopups}
        onConfirm={handleCardDeleteConfirm} />

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
