import React from 'react';
import PopupWithForm from "./PopupWithForm";
import { useFormAndValidation } from '../utils/customHooks';

function EditAvatarPopup({btnCaption, isOpen, onClose, onUpdateAvatar}) {
  const {values, handleChange, errors, isValid, resetForm} = useFormAndValidation();

  React.useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen, resetForm]);

  function handleSubmit(e) {
    e.preventDefault();
    // Передать значение поля во внешний обработчик
    onUpdateAvatar(values.link);
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar"
      btnCaption={btnCaption}
      btnEnabled={isValid}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}>
      <input
        name="link"
        type="url"
        value={values.link || ''}
        onChange={handleChange}
        placeholder="Ссылка на картинку"
        autoComplete="off"
        className="popup__input-text"
        required />
      <span className="popup__input-error">
        {errors.link}
      </span>
    </PopupWithForm>
  );
}
export default EditAvatarPopup;
