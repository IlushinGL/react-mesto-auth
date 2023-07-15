import React from 'react';
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useFormAndValidation } from '../utils/customHooks';

function EditProfilePopup({btnCaption, isOpen, onClose, onUpdateUser}) {
  const {values, setValues, handleChange, errors, isValid, resetForm} = useFormAndValidation();
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    if (isOpen) {
      resetForm();
      setValues({
        name: currentUser.name,
        description: currentUser.about,
      });

    }
  }, [isOpen, resetForm, setValues, currentUser]);

  function handleSubmit(e) {
    e.preventDefault();
    // Передать значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name: values.name,
      about: values.description,
    });
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="profile"
      btnCaption={btnCaption}
      btnEnabled={isValid}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}>
      <input
        name="name"
        type="text"
        value={values.name || ''}
        onChange={handleChange}
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        autoComplete="off"
        className="popup__input-text"
        required />
      <span className="popup__input-error">
        {errors.name}
      </span>
      <input
        name="description"
        type="text"
        value={values.description || ''}
        onChange={handleChange}
        placeholder="О себе"
        minLength="2"
        maxLength="200"
        autoComplete="off"
        className="popup__input-text"
        required />
      <span className="popup__input-error">
        {errors.description}
      </span>
    </PopupWithForm>
  );
}
export default EditProfilePopup;
