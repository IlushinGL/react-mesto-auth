import { useEscapeKey, useOutsideClick } from '../utils/customHooks';

function ImagePopup({card, onClose}) {
  useEscapeKey(onClose);
  useOutsideClick(onClose);
  if (card) {
    return (
      <div className="popup popup_img popup_opened">
        <div className="popup__conteiner popup__conteiner_img">
          <button onClick={onClose} type="button" className="popup__close"></button>
          <img className="popup__image" src={card.link} alt={card.name} />
          <h2 className="popup__title popup__title_img">{card.name}</h2>
        </div>
      </div>
    );
  } else {
    // без этого не работает наплыв при открытии попапа
    return (
      <div className="popup popup_img">
      </div>
    );
  }
}

export default ImagePopup;
