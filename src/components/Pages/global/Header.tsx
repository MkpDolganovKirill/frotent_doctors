import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import medicineIcon from '../../../images/medicine.svg';
import Buttons from '../../components/buttons/Buttons';
import { typesButtons } from '../../../types/enums';
import '../../../Styles/pages/global/Header.scss';

const Header = () => {

  const navigate = useNavigate();

  const outFromProfile = () => {
    localStorage.clear();
    navigate('/auth/authorization');
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