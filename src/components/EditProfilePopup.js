import React from 'react';
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  const [descriptionError, setDescriptionError] = React.useState('');
  const [nameError, setNameError] = React.useState('');

  const [formValid, setFormValid] = React.useState(false);

  const [caption, setCaption] = React.useState('Сохранить');

  React.useEffect(() => {
    if (isOpen) {
      setName(currentUser.name);
      setDescription(currentUser.about);

      setDescriptionError('');
      setNameError('');

      setCaption('Сохранить');
      setFormValid(true);
    }
  }, [currentUser, isOpen]);

  React.useEffect(() => {
    if (descriptionError || nameError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [descriptionError, nameError]);

  function handleChangeName(e) {
    setName(e.target.value);
    setNameError(e.target.validationMessage);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
    setDescriptionError(e.target.validationMessage);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setCaption('Сохранение профиля...');
    // Передать значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="profile"
      btnCaption={caption}
      btnEnabled={formValid}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}>
      <input
        name="name"
        type="text"
        value={name}
        onChange={handleChangeName}
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        autoComplete="off"
        className="popup__input-text"
        required />
      <span className="popup__input-error">
        {nameError}
      </span>
      <input
        name="description"
        type="text"
        value={description}
        onChange={handleChangeDescription}
        placeholder="О себе"
        minLength="2"
        maxLength="200"
        autoComplete="off"
        className="popup__input-text"
        required />
      <span className="popup__input-error">
        {descriptionError}
      </span>
    </PopupWithForm>
  );
}
export default EditProfilePopup;
