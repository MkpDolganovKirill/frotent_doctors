
import React, { useState } from 'react';
import '../Styles/RegisterPage.scss';
import { Button, ButtonProps, styled } from '@mui/material';
import Input from './Input';
import axios from 'axios';
import SnackAlert from './SnackAlert';

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
  backgroundColor: '#E2574C',
  color: 'white',
  transition: '.2s',
  fontWeight: '700',
  fontSize: '1rem',
  '&:hover': {
    color: 'white',
    backgroundColor: 'rgb(226, 87, 76)',
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
  },
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
    const value = event.target.value
    const newValues = { ...values, [id]: value };
    setValues(newValues);
    if (newValues.login.trim().length < 6) return setInvalid(true);
    if (!/^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9]{6}/.test(newValues.password.trim())) return setInvalid(true);
    if (newValues.repidPass.trim() !== values.password.trim()) return setInvalid(true);
    return setInvalid(false);
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

  return (
    <div className='register-form-div'>
      <h2 className='register-form-title'>Регистрация</h2>
      <form className='register-form' onSubmit={handleSubmit}>
        <Input 
          value={values.login}
          onChange={changeValues}
          id='login' 
          type='text'
          labelText='Логин' 
          placeholder='Введите логин'
          helperText='Не менее 6 символов' 
        />
        <Input 
          value={values.password}
          onChange={changeValues}
          id='password'
          type='password'
          labelText='Пароль' 
          placeholder='Введите пароль'
          helperText='Не меньше 6 символов, латинские буквы и хотя бы одна цифра'
        />
        <Input 
          value={values.repidPass}
          onChange={changeValues}
          id='repidPass'
          type='password'
          labelText='Повторите пароль' 
          placeholder='Повторите введенный пароль' 
          helperText='Пароль должен совпадать'
        />
        <div className="buttons">
          <ActiveButton
            disabled={invalid}
            type='submit'
          >
            Зарегистрироваться
          </ActiveButton>
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