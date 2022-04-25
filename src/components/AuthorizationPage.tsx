import React, { useState } from 'react';
import '../Styles/AuthorizationPage.scss';
import { Button, ButtonProps, styled } from '@mui/material';
import InputValue from './InputValue';
import axios from 'axios';
import SnackAlert from './SnackAlert';
import Buttons from './Buttons';
import { useNavigate } from 'react-router-dom';

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

const InActiveButton = styled(Button)<ButtonProps>(() => ({
  backgroundColor: 'transparent',
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

const AuthorizationPage = () => {

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
    password: ''
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
      newValues.login &&
      newValues.password
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
    setInvalid(true);
    localStorage.clear();
    await axios.post('http://localhost:8080/authorizationUser', { 
        login: values.login.trim(),
        password: values.password.trim()
    }).then(res => {
      localStorage.setItem('token', res.data.token);
      setInvalid(false);
      return navigate('/main', { replace: true });
    }).catch(err => {
      if (!err.response) {
        setAlertSnack({
          messageAlert: 'Подключение к серверу отсутствует',
          type: type.error,
          open: true,
          vertical: vertical.top,
          horizontal: horizontal.right
        });
        setInvalid(false);
        return;
      };
      if (err.response.data === 'Invalid username or password!' || err.response.data.message === 'Error! Params not correct!') {
        setAlertSnack({
          messageAlert: 'Неверный логин или пароль',
          type: type.error,
          open: true,
          vertical: vertical.top,
          horizontal: horizontal.right
        });
        setInvalid(false);
      };
    });
  };

  enum typesButtons {
    button = 'button',
    submit = 'submit',
    reset = 'reset'
  };

  return (
    <div className='auth-form-div'>
      <h2 className='auth-form-title'>Вход</h2>
      <form className='auth-form' onSubmit={handleSubmit}>
        <InputValue
          value={values.login}
          onChange={changeValues}
          id='login'
          type='text'
          labelText='Логин'
          placeholder='Введите логин'
        />
        <InputValue
          value={values.password}
          onChange={changeValues}
          id='password'
          type='password'
          labelText='Пароль'
          placeholder='Введите пароль'
        />
        <div className="buttons">
          <Buttons
            text='Войти'
            disabled={invalid}
            types={typesButtons.submit}
          >
            Зарегистрироваться
          </Buttons>
          <div className='SignIn'>
            <p className='textAsk'>У вас еще нет аккаунта?</p>
            <InActiveButton
              onClick={() => navigate('/auth/registration', { replace: true })}
            >
              Зарегистрироваться
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
  )
};

export default AuthorizationPage;