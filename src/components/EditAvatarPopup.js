import React from 'react';
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
  const avatarRef = React.useRef();
  const [linkError, setLinkError] = React.useState(' ');
  const [caption, setCaption] = React.useState('Сохранить');
  const [formValid, setFormValid] = React.useState(false);

  React.useEffect(() => {
    if (isOpen) {
      setLinkError(' ');
      setCaption('Сохранить');
      setFormValid(false);
    }
  }, [isOpen]);

  React.useEffect(() => {
    if (linkError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [linkError]);

  function handleChangeLink(e) {
    setLinkError(e.target.validationMessage);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setCaption('Изменение аватара...');
    // Передать значение поля во внешний обработчик
    onUpdateAvatar(avatarRef.current.value);
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar"
      btnCaption={caption}
      btnEnabled={formValid}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}>
      <input
        name="avatar"
        type="url"
        ref={avatarRef}
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
export default EditAvatarPopup;
