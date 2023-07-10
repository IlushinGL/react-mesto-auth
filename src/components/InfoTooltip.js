import { useEscapeKey, useOutsideClick } from '../utils/customHooks';
import iconOk from '../images/icon_ok.svg';
import iconErr from '../images/icon_err.svg';

function InfoTooltip({isOK, isOpen, onClose}) {
  useEscapeKey(onClose);
  useOutsideClick(onClose);
  if (isOpen) {
    return (
      <div className={"popup popup_type_tooltip popup_opened"}>
        <div className="popup__conteiner">
          <button onClick={onClose} type="button" className="popup__close"></button>
          <img className="popup__icon" src={isOK ? iconOk : iconErr} alt="иконка" />
          <h2 className="popup__title popup__title_center">{isOK ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</h2>
        </div>
      </div>
    );
  } else {
    return (
      <div className={"popup popup_type_tooltip"}>
      </div>
    );
  }
}

export default InfoTooltip;
