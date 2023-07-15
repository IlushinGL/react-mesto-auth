import React from 'react';
import PopupWithForm from "./PopupWithForm";
import { useFormAndValidation } from '../utils/customHooks';

function AddPlacePopup({btnCaption, isOpen, onClose, onAddPlace}) {
  const {values, handleChange, errors, isValid, resetForm} = useFormAndValidation();

  React.useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen, resetForm]);

  function handleSubmit(e) {
    e.preventDefault();
    // Передать значения управляемых компонентов во внешний обработчик
    onAddPlace({
      link: values.link,
      name: values.name,
    });
  }

  return (
    <PopupWithForm
      title="Новое место"
      name="place"
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
        placeholder="Название"
        minLength="3"
        maxLength="30"
        autoComplete="off"
        className="popup__input-text"
        required />
      <span className="popup__input-error">
        {errors.name}
      </span>
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
export default AddPlacePopup;
