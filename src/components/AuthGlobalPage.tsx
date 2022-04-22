import React from 'react';
import hospital from '../images/hospital.svg';
import '../Styles/AuthGolbalPage.scss';
import AuthorizationPage from './AuthorizationPage';

const AuthGlobalPage = () => {
  return (
    <div className='auth-global-page'>
      <img typeof='svg' className='image' src={hospital} alt='hospital' />
      <AuthorizationPage />
    </div>
  )
};

export default AuthGlobalPage;