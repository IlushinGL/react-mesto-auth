import React from 'react';
import DataCollectionForm from './DataCollectionForm';
import { useFormAndValidation } from '../utils/customHooks';

function Login({btnCaption, onLogIn}) {
  const {values, handleChange, errors, isValid, resetForm} = useFormAndValidation();

  function handleSubmit(e) {
    e.preventDefault();
    // Передать значения управляемых компонентов во внешний обработчик
    onLogIn({
      email: values.email,
      password: values.password,
    });
    resetForm();
  }

  return (
    <DataCollectionForm
      title="Вход"
      name="login"
      btnCaption={btnCaption}
      btnEnabled={isValid}
      onSubmit={handleSubmit}>
      <input
        name="email"
        type="email"
        value={values.email}
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
        value={values.password}
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
export default Login;
