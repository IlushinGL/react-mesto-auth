import React from 'react';
import { NavLink } from 'react-router-dom';
import DataCollectionForm from './DataCollectionForm';
import { useFormAndValidation } from '../utils/customHooks';

function Register({btnCaption, onRegister}) {
  const {values, handleChange, errors, isValid, resetForm} = useFormAndValidation();

  function handleSubmit(e) {
    e.preventDefault();
    // Передать значения управляемых компонентов во внешний обработчик
    onRegister({
      email: values.email,
      password: values.password,
    });
    resetForm();
  }

  return (
    <DataCollectionForm
      title="Регистрация"
      name="register"
      btnCaption={btnCaption}
      btnEnabled={isValid}
      onSubmit={handleSubmit}
      option={<NavLink to="/sign-in" className="data__link data__link_str"> Уже зарегистрированы? Войти </NavLink>}>
      <input
        name="email"
        type="email"
        value={values.email || ''}
        onChange={handleChange}
        placeholder="Email"
        minLength="5"
        maxLength="40"
        autoComplete="off"
        className="data__input-text"
        required />
      <span className="data__input-error">
        {errors.email}
      </span>
      <input
        name="password"
        type="password"
        value={values.password || ''}
        onChange={handleChange}
        placeholder="Пароль"
        minLength="8"
        maxLength="12"
        autoComplete="off"
        className="data__input-text"
        required />
      <span className="data__input-error">
        {errors.password}
      </span>
    </DataCollectionForm>
  );
}
export default Register;
