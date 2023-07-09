import React from 'react';
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({isOpen, onClose, onAddPlace}) {
  const [link, setLink] = React.useState('');
  const [name, setName] = React.useState('');

  const [linkError, setLinkError] = React.useState(' ');
  const [nameError, setNameError] = React.useState(' ');

  const [formValid, setFormValid] = React.useState(false);

  const [caption, setCaption] = React.useState('Создать');

  React.useEffect(() => {
    if (!isOpen) {
      setLink('');
      setName('');

      setLinkError(' ');
      setNameError(' ');

      setCaption('Создать');
      setFormValid(false);
    }
  }, [isOpen]);

  React.useEffect(() => {
    if (linkError || nameError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [linkError, nameError]);

  function handleChangeLink(e) {
    setLink(e.target.value);
    setLinkError(e.target.validationMessage);
  }

  function handleChangeName(e) {
    setName(e.target.value);
    setNameError(e.target.validationMessage);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setCaption('Сохранение карточки...');
    // Передать значения управляемых компонентов во внешний обработчик
    onAddPlace({
      link: link,
      name: name,
    });
  }

  return (
    <PopupWithForm
      title="Новое место"
      name="place"
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
        placeholder="Название"
        minLength="3"
        maxLength="30"
        autoComplete="off"
        className="popup__input-text"
        required />
      <span className="popup__input-error">
        {nameError}
      </span>
      <input
        name="link"
        type="url"
        value={link}
        onChange={handleChangeLink}
        placeholder="Ссылка на картинку"
        autoComplete="off"
        className="popup__input-text"
        required />
      <span className="popup__input-error">
        {linkError}
      </span>
    </PopupWithForm>
  );
}
export default AddPlacePopup;
