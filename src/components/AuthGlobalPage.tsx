import React from 'react';
import hospital from '../images/hospital.svg';
import '../Styles/AuthGolbalPage.scss';
import RegisterPage from './RegisterPage';

const AuthGlobalPage = () => {
  return (
    <div className='auth-global-page'>
      <img typeof='svg' className='image' src={hospital} alt='hospital' />
      <RegisterPage />
    </div>
  )
};

export default AuthGlobalPage;