import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import medicineIcon from '../images/medicine.svg';
import '../Styles/Header.scss';
import Buttons from './Buttons';

enum typesButtons {
  button = 'button',
  submit = 'submit',
  reset = 'reset'
}

const Header = () => {

  const navigate = useNavigate();

  const outFromProfile = () => {
    localStorage.clear();
    navigate('/', {replace: true});
  }

  const [title, setTitle] = useState('Войти в систему');

  const { pathname } = useLocation();
  
  useEffect(() => {
    switch (pathname) {
      case '/auth/authorization':
        setTitle('Войти в систему');
        break;
      case '/auth/registration':
        setTitle('Зарегистрироваться в системе');
        break;
      case '/main':
        setTitle('Приемы');
        break;  
      default:
        setTitle('Неизвестная страница');
    }
  }, [pathname])

  return (
    <div className='header'>
      <div className='img-logo'>
        <img className='header-icon' src={medicineIcon} alt='medicine' />
        <p className='header-title'>{title}</p>
      </div>
      {pathname === '/main' ? <Buttons text={'Выход'} onClick={outFromProfile} disabled={false} types={typesButtons.button}/> : ''}
    </div>
  )
};

export default Header;