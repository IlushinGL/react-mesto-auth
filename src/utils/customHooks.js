import React from 'react';
import { HOOKS_DATA } from './constants';

export function useEscapeKey(handleClose) {
  const handleEscKey = React.useCallback((event) => {
    if (event.key === HOOKS_DATA.keyNameEsc) {
      handleClose();
    }
  }, [handleClose]);

  React.useEffect(() => {
    document.addEventListener(HOOKS_DATA.keyEventType, handleEscKey);
    return () => {
      document.removeEventListener(HOOKS_DATA.keyEventType, handleEscKey);
    };
  });
}

export function useOutsideClick(handleClose) {
  const handleClick = React.useCallback((event) => {
    if (event.target.classList.contains(HOOKS_DATA.modalArea)) {
      handleClose();
    }
  }, [handleClose]);

  React.useEffect(() => {
    document.addEventListener(HOOKS_DATA.mouseUp, handleClick);
    return () => {
      document.removeEventListener(HOOKS_DATA.mouseUp, handleClick);
    };
  });
}

