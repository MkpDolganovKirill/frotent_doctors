
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import InputValue from '../../../components/inputs/InputValue';
import SnackAlert from '../../../components/allerts/SnackAlert';
import Buttons from '../../../components/buttons/Buttons';
import { typesButtons } from '../../../../types/enums';
import { type, vertical, horizontal } from '../../../../types/enums';
import { InActiveButton } from '../../../../types/styledElements';
import '../../../../Styles/pages/subsidiaries/authPage/RegisterPage.scss';

const RegisterPage = () => {

  const navigate = useNavigate();

  const [alertSnack, setAlertSnack] = useState({
    messageAlert: '',
    type: type.error,
    open: false,
    vertical: vertical.top,
    horizontal: horizontal.center
  });

  const [values, setValues] = useState({
    login: '',
    password: '',
    repidPass: ''
  });

  const [invalid, setInvalid] = useState(true);

  const changeValues = (id: string, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = event.target.value.trim()
    const newValues = { ...values, [id]: value };
    setValues(newValues);
    validateValues(newValues);
  };

  const validateValues = (newValues: any) => {
    if (
      newValues.login.length >= 6 &&
      /^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9]{6}/.test(newValues.password) &&
      newValues.password === newValues.repidPass
    ) {
      setInvalid(false);
    } else {
      setInvalid(true);
    };
  };

  const handleClose = () => {
    setAlertSnack({ ...alertSnack, open: false });
  };

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      login: { value: string };
      password: { value: string };
      repidPass: { value: string };
    };
    localStorage.clear();

    await axios.post('http://localhost:8080/createNewUser', {
      login: values.login.trim(),
      password: values.password.trim()
    }).then(res => {
      localStorage.setItem('accesstoken', res.data.accesstoken);
      localStorage.setItem('refreshtoken', res.data.refreshtoken);
      return navigate('/main', { replace: true });
    }).catch(err => {
      if (!err.response) {
        setAlertSnack({
          messageAlert: 'Подключение к серверу отсутствует',
          type: type.error,
          open: true,
          vertical: vertical.top,
          horizontal: horizontal.right
        })
      }
      if (err.response.data.error.original.code === '23505') {
        setAlertSnack({
          messageAlert: 'Логин занят',
          type: type.error,
          open: true,
          vertical: vertical.top,
          horizontal: horizontal.right
        })
      }
    })
  };

  return (
    <div className='register-form-div'>
      <h2 className='register-form-title'>Регистрация</h2>
      <form className='register-form' onSubmit={handleSubmit}>
        <InputValue
          value={values.login}
          onChange={changeValues}
          stateValidate={values.login.length >= 6}
          id='login'
          type='text'
          labelText='Логин'
          placeholder='Введите логин'
          helperText='Не менее 6 символов'
        />
        <InputValue
          value={values.password}
          onChange={changeValues}
          id='password'
          type='password'
          stateValidate={/^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9]{6}/.test(values.password)}
          labelText='Пароль'
          placeholder='Введите пароль'
          helperText='Не меньше 6 символов, латинские буквы и хотя бы одна цифра'
        />
        <InputValue
          value={values.repidPass}
          onChange={changeValues}
          id='repidPass'
          type='password'
          stateValidate={(values.password === values.repidPass)}
          labelText='Повторите пароль'
          placeholder='Повторите введенный пароль'
          helperText='Пароль должен совпадать'
        />
        <div className="buttons">
          <Buttons
            text='Регистрация'
            disabled={invalid}
            types={typesButtons.submit}
          >
            Зарегистрироваться
          </Buttons>
          <div className='SignIn'>
            <p>У вас уже есть аккаунт?</p>
            <InActiveButton
              onClick={() => navigate('/auth/authorization', { replace: true })}
            >
              Войти
            </InActiveButton>
          </div>
        </div>
      </form>
      <SnackAlert
        messageAlert={alertSnack.messageAlert}
        type={alertSnack.type}
        open={alertSnack.open}
        vertical={alertSnack.vertical}
        horizontal={alertSnack.horizontal}
        handleClose={handleClose}
      />
    </div>
  );
};

export default RegisterPage;