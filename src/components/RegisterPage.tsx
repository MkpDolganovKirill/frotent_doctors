
import React from 'react';
import '../Styles/RegisterPage.scss';
import { Button, ButtonProps, styled } from '@mui/material';
import Input from './Input';

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

  return (
    <div className='register-form-div'>
      <h2 className='register-form-title'>Регистрация</h2>
      <form className='register-form'>
        <Input labelText='Логин' placeholder='Введите логин'/>
        <Input labelText='Пароль' placeholder='Введите пароль'/>
        <Input labelText='Повторите пароль' placeholder='Повторите введенный пароль'/>
        <div className="buttons">
          <ActiveButton>
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
    </div>
  )
};

export default RegisterPage;