import React from 'react';
import PopupWithForm from "./PopupWithForm";

function ConfirmationPopup({isOpen, onClose, onConfirm}) {
  const [caption, setCaption] = React.useState('Да');

  React.useEffect(() => {
    if (isOpen) {
      setCaption('Да');
    }
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    setCaption('Удаление карточки...');
    // Вызвать внешний обработчик
    onConfirm();
  }

  return (
    <PopupWithForm
      title="Вы уверены?"
      name="confirm"
      btnCaption={caption}
      btnEnabled={true}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}>
    </PopupWithForm>
  );
}
export default ConfirmationPopup;
