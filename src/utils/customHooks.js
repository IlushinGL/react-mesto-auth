import {useState, useEffect, useCallback} from 'react';
import { HOOKS_DATA } from './constants';

export function useEscapeKey(handleClose) {
  const handleEscKey = useCallback((event) => {
    if (event.key === HOOKS_DATA.keyNameEsc) {
      handleClose();
    }
  }, [handleClose]);

  useEffect(() => {
    document.addEventListener(HOOKS_DATA.keyEventType, handleEscKey);
    return () => {
      document.removeEventListener(HOOKS_DATA.keyEventType, handleEscKey);
    };
  });
}

export function useOutsideClick(handleClose) {
  const handleClick = useCallback((event) => {
    if (event.target.classList.contains(HOOKS_DATA.modalArea)) {
      handleClose();
    }
  }, [handleClose]);

  useEffect(() => {
    document.addEventListener(HOOKS_DATA.mouseUp, handleClick);
    return () => {
      document.removeEventListener(HOOKS_DATA.mouseUp, handleClick);
    };
  });
}

export function useFormAndValidation() {
  const [ values, setValues ] = useState({});
  const [ errors, setErrors ] = useState({});
  const [ isValid, setIsValid ] = useState(false);

  const handleChange = (e) => {
    const {name, value} = e.target
    setValues({...values, [name]: value });
    setErrors({...errors, [name]: e.target.validationMessage});
    setIsValid(e.target.closest('form').checkValidity());
  };

  const resetForm = useCallback((newValues = {}, newErrors = {}, newIsValid = false) => {
    setValues(newValues);
    setErrors(newErrors);
    setIsValid(newIsValid);
  }, [setValues, setErrors, setIsValid]);

  return { values, handleChange, errors, isValid, resetForm, setValues, setErrors, setIsValid };
}
