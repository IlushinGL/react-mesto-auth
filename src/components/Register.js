import React from 'react';
import { NavLink } from 'react-router-dom';
import DataCollectionForm from './DataCollectionForm';

function Register({onRegister}) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [emailError, setEmailError] = React.useState(' ');
  const [passwordError, setPasswordError] = React.useState(' ');

  const [formValid, setFormValid] = React.useState(false);

  // const [caption, setCaption] = React.useState('Зарегистрироваться');

  React.useEffect(() => {
    if (emailError || passwordError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [emailError, passwordError]);

  function handleChangeEmail(e) {
    setEmail(e.target.value);
    setEmailError(e.target.validationMessage);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
    setPasswordError(e.target.validationMessage);
  }

  function handleSubmit(e) {
    e.preventDefault();
    // setCaption('Регистрация...');
    // Передать значения управляемых компонентов во внешний обработчик
    onRegister({
      email: email,
      password: password,
    });
  }

  return (
    <DataCollectionForm
      title="Регистрация"
      name="register"
      btnCaption={'Зарегистрироваться'}
      btnEnabled={formValid}
      onSubmit={handleSubmit}
      option={<NavLink to="/sign-in" className="data__link data__link_str"> Уже зарегистрированы? Войти </NavLink>}>
      <input
        name="email"
        type="email"
        value={email}
        onChange={handleChangeEmail}
        placeholder="Email"
        minLength="5"
        maxLength="40"
        autoComplete="off"
        className="data__input-text"
        required />
      <span className="data__input-error">
        {emailError}
      </span>
      <input
        name="password"
        type="password"
        value={password}
        onChange={handleChangePassword}
        placeholder="Пароль"
        minLength="8"
        maxLength="12"
        autoComplete="off"
        className="data__input-text"
        required />
      <span className="data__input-error">
        {passwordError}
      </span>
    </DataCollectionForm>
  );
}
export default Register;
