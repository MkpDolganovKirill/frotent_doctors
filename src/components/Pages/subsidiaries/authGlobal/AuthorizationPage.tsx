import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import InputValue from '../../../components/inputs/InputValue';
import SnackAlert from '../../../components/allerts/SnackAlert';
import Buttons from '../../../components/buttons/Buttons';
import { InActiveButton } from '../../../../types/styledElements';
import { type, vertical, horizontal } from '../../../../types/enums';
import { typesButtons } from '../../../../types/enums';
import '../../../../Styles/pages/subsidiaries/authPage/AuthorizationPage.scss';

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
      localStorage.setItem('accesstoken', res.data.accesstoken);
      localStorage.setItem('refreshtoken', res.data.refreshtoken);
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
          <div className='SignIn-auth'>
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