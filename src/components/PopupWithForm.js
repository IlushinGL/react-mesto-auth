import React from 'react';
import { useEscapeKey, useOutsideClick } from '../utils/customHooks';

function PopupWithForm({name, title, btnCaption, btnEnabled, isOpen, onClose, onSubmit, children}) {
  useEscapeKey(onClose);
  useOutsideClick(onClose);
  if (isOpen) {
    return (
      <div className={`popup popup_type_${name} popup_opened`}>
        <div className="popup__conteiner">
          <button onClick={onClose} type="button" className="popup__close"></button>
          <h2 className="popup__title">{title}</h2>
          <form onSubmit={btnEnabled ? onSubmit : undefined} className="popup-form" name={name} noValidate>
            {children}
            <button
              type="submit"
              disabled={!btnEnabled}
              className={`popup__submit-btn ${!btnEnabled ? 'popup__submit-btm_inactive': ''}`}>
              {btnCaption}
            </button>
          </form>
        </div>
      </div>
    );
  } else {
    // без этого не работает наплыв при открытии попапа
    return (
      <div className={`popup popup_type_${name}`}>
      </div>
    );
  }
}

export default PopupWithForm;
