
import React, { useState } from 'react';
import '../Styles/RegisterPage.scss';
import { Button, ButtonProps, styled } from '@mui/material';
import InputValue from './InputValue';
import axios from 'axios';
import SnackAlert from './SnackAlert';
import Buttons from './Buttons';

enum vertical {
  top = 'top',
  bottom = 'bottom'
};

enum horizontal {
  left = 'left',
  center = 'center',
  right = 'right'
};

enum type {
  success = 'success',
  error = 'error',
  info = 'info',
  warning = 'warning'
};

const ActiveButton = styled(Button)<ButtonProps>(() => ({
  marginTop: '20px',
  backgroundColor: 'white',
  color: '#E2574C',
  border: '1px solid #E2574C',
  transition: '.2s',
  fontWeight: '700',
  fontSize: '1rem',
  '&:hover': {
    color: 'rgb(226, 87, 76)',
    backgroundColor: 'white',
    boxShadow: '0 0 10px #E2574C'
  },
}));

const InActiveButton = styled(Button)<ButtonProps>(() => ({
  backgroundColor: 'transparent',
  marginLeft: '20px',
  color: '#E2574C',
  transition: '.2s',
  fontWeight: '900',
  textDecoration: 'underline',
  fontSize: '1rem',
  '&:hover': {
    color: '#E2574C',
    backgroundColor: 'rgba(226, 87, 76, 0.1)',
    textDecoration: 'underline',
  }
}));

const RegisterPage = () => {

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
  }

  const validateValues = (newValues: any) => {
    if (
      newValues.login.length >= 6 && 
      /^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9]{6}/.test(newValues.password) && 
      newValues.password === newValues.repidPass
    ) {
      setInvalid(false);
    } else {
      setInvalid(true);
    }
  }

  const handleClose = () => {
    setAlertSnack({...alertSnack, open: false});
  };

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      login: { value: string };
      password: { value: string };
      repidPass: { value: string };
    };
    
    await axios.post('http://localhost:8080/createNewUser',{
        login: values.login.trim(),
        password: values.password.trim()
      }).then(res => {
        localStorage.setItem('token', res.data.token);
        setAlertSnack({
          messageAlert: 'Пользователь зарегистрирован!',
          type: type.success,
          open: true,
          vertical: vertical.top,
          horizontal: horizontal.right
        })
        target.login.value = '';
        target.password.value = '';
        target.repidPass.value = '';
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
        if (err.response.data.error.code === '23505') {
          setAlertSnack({
            messageAlert: 'Логин занят',
            type: type.error,
            open: true,
            vertical: vertical.top,
            horizontal: horizontal.right
          })
        }
      })
  }

  enum typesButtons {
    button = 'button',
    submit = 'submit',
    reset = 'reset'
  }

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
          stateValidate={/^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9]{6}/.test(values.password) }
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
            <InActiveButton>
              Войти
            </InActiveButton>
          </div>
        </div>
      </form>
      <SnackAlert
        messageAlert = {alertSnack.messageAlert}
        type = {alertSnack.type}
        open = {alertSnack.open}
        vertical = {alertSnack.vertical}
        horizontal = {alertSnack.horizontal}
        handleClose={handleClose}
      />
    </div>
  )
};

export default RegisterPage;