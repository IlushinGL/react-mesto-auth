import React from 'react';
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({isOpen, onClose, onAddPlace}) {
  const [link, setLink] = React.useState('');
  const [name, setName] = React.useState('');

  const [linkDirty, setLinkDirty] = React.useState(false);
  const [nameDirty, setNameDirty] = React.useState(false);

  const [linkError, setLinkError] = React.useState('Ссылка не может быть пустой');
  const [nameError, setNameError] = React.useState('Название не может быть пустым');

  const [formValid, setFormValid] = React.useState(false);

  const [caption, setCaption] = React.useState('Создать');

  React.useEffect(() => {
    if (!isOpen) {
      setLink('');
      setName('');

      setLinkDirty(false);
      setNameDirty(false);
      setLinkError('Ссылка не может быть пустой');
      setNameError('Название не может быть пустым');

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

  function blurHandler(e) {
    switch (e.target.name) {
      case 'name':
        setNameDirty(true);
        break;
      case 'link':
        setLinkDirty(true);
        break;
      default:
        break;
    }
  }

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
        onBlur={blurHandler}
        onChange={handleChangeName}
        placeholder="Название"
        minLength="3"
        maxLength="30"
        autoComplete="off"
        className="popup__input-text"
        required />
      <span className="popup__input-error">
        {nameDirty && nameError}
      </span>
      <input
        name="link"
        type="url"
        value={link}
        onBlur={blurHandler}
        onChange={handleChangeLink}
        placeholder="Ссылка на картинку"
        autoComplete="off"
        className="popup__input-text"
        required />
      <span className="popup__input-error">
        {linkDirty && linkError}
      </span>
    </PopupWithForm>
  );
}
export default AddPlacePopup;
