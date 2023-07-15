import React from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { apInterface } from '../utils/Api';
import { apiUserAuth } from '../utils/Auth';
import ProtectedRoute from './ProtectedRoute';
import Header from './Header';
import Main from './Main';
import Login from './Login';
import Register from './Register';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import ConfirmationPopup from './ConfirmationPopup';
import InfoTooltip from './InfoTooltip';
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
  const [isUserKnown, setUserKnown] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState('');
  const [isInfoTooltipOpen, setInfoTooltipOpen] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    checkToken();
    if (userEmail) {

      // Помещаем МЕНЯ в КОНТЕКСТ.
      apInterface.getUserInfo()
      .then((info) => {setCurrentUser(info)})
      .catch((err) => {
        console.log(`${err} <Не удалось получить информацию о пользователе.>`);});

        // Задаём начальный массив карточек.
      apInterface.getInitialCards()
      .then((initialCards) => {setCards(Array.from(initialCards))})
      .catch((err) => {
        console.log(`${err} <Не удалось получить начальный массив карточек.>`);});

      navigate('/main', {replace: true});
    }
  }, [userEmail, navigate]);

  function handleRegister({email, password}) {
    apiUserAuth.register({email, password})
    .then(() => {
      navigate('/sign-in', {replace: true});
    })
    .catch((err) => {
      console.log(`${err} <Неудачная попытка регистрации.>`);
    })
    .finally(() => {
      setUserKnown(false);
      setUserEmail('');
      setInfoTooltipOpen(true);
    });
  }

  function handleLogin({email, password}) {
    apiUserAuth.login({email, password})
    .then((res) => {
      setUserKnown(true);
      setUserEmail(email);
      localStorage.setItem('jwt', res.token);
      navigate('/main', {replace: true});
    })
    .catch((err) => {
      setUserKnown(false);
      setUserEmail('');
      console.log(`${err} <Неудачная попытка авторизации.>`);
      setInfoTooltipOpen(true);
    });
  }

  function checkToken() {
    const jwt = localStorage.getItem('jwt');

    if (jwt) {
      apiUserAuth.checkToken(jwt)
      .then((res) => {
        setUserKnown(true);
        setUserEmail(res.data.email);

      })
      .catch((err) => {
        setUserKnown(false);
        setUserEmail('');
        console.log(`${err} <Тухлый токен.>`);
      });
    } else {
      setUserKnown(false);
      setUserEmail('');
    }
  }

  function handleSignout() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      localStorage.removeItem('jwt');
      setUserKnown(false);
      setUserEmail('');
      navigate('/sign-in', {replace: true});
    }
  }

  function handleCardLike(card) {
    // Есть ли МОЙ лайк на карточке?
    const isLiked = card.likes.some(like => like._id === currentUser._id);
    // Отправить запрос в API на изменение лайка карточки, получить и отрисовать обновлённые данные
    apInterface.likeCard(card._id, !isLiked)
    .then((newCard) => {
      setCards((state) => state.map((item) => item._id === card._id ? newCard : item));
    })
    .catch((err) => {
      console.log(`${err} <Не удалось поставить лайк на карточке id:${card._id}>`);});
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
    .catch((err) => {
      console.log(`${err} <Не удалось удалить карточку id:${deletedCard._id}>`);})
    // .finally(() => {

    // })
    ;
  }

  function handleUpdateUser(new_info) {
    // Отправить запрос в API на изменение и отрисовать новый профиль.
    apInterface.setUserInfo(new_info)
    .then((saved_info) => {
      setCurrentUser(saved_info);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(`${err} <Не удалось изменить профиль name:${new_info.name} about:${new_info.about}>`);})
    // .finally(() => {

    // })
    ;
  }

  function handleUpdateAvatar(new_link) {
    // Отправить запрос в API на изменение и отрисовать новый аватар.
    apInterface.setUserAvatar(new_link)
    .then((saved_link) => {
      setCurrentUser(saved_link);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(`${err} <Не удалось обновить аватар link:${new_link}>`);})
    // .finally(() => {

    // })
    ;
  }

  function handleAddPlaceSubmit(new_card) {
    // Отправить запрос в API на добавление карточки и отрисовать список.
    apInterface.addNewCard(new_card)
    .then((saved_card) => {
      setCards([saved_card, ...cards]);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(`${err} <Не удалось добавить карточку name:${new_card.name} link:${new_card.link}>`);})
    // .finally(() => {

    // })
    ;
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
    setInfoTooltipOpen(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">

        <Routes>
          <Route
            path="/sign-in"
            element={
            <>
              <Header linkName="Регистрация" linkTo="/sign-up" />
              <Login btnCaption={'Войти'} onLogIn={handleLogin} />
            </>}
          />
          <Route
            path="/sign-up"
            element={
            <>
              <Header linkName="Войти" linkTo="/sign-in" />
              <Register btnCaption={'Зарегистрироваться'} onRegister={handleRegister} />
            </>}
          />
          <Route
            path="/*"
            element={
              userEmail ?
              <Navigate to="/main" replace /> :
              <Navigate to="/sign-in" replace />}
          />

          <Route
            path="/main"
            element={<ProtectedRoute element={
            <>
              <Header email={userEmail} linkName="Выйти" onSignout={handleSignout} />
              <Main
                cards={cards}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
              />
            </>} loggedIn={isUserKnown}/>} />
        </Routes>


        <Footer />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        <EditProfilePopup
          btnCaption={'Сохранить'}
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser} />

        <EditAvatarPopup
          btnCaption={'Сохранить'}
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar} />

        <AddPlacePopup
          btnCaption={'Сохранить'}
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit} />

        <ConfirmationPopup
        isOpen={deletedCard}
        onClose={closeAllPopups}
        onConfirm={handleCardDeleteConfirm} />

        <InfoTooltip
        isOK={isUserKnown}
        isOpen={isInfoTooltipOpen}
        onClose={closeAllPopups} />

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
