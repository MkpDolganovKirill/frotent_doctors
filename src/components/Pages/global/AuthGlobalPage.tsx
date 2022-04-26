import React from 'react';
import hospital from '../../../images/hospital.svg';
import '../../../Styles/pages/global/AuthGlobalPage.scss';

interface IAuthGlobalPageProps {
  children: React.ReactNode
}

const AuthGlobalPage = ({ children }: IAuthGlobalPageProps) => {

  return (
    <div className='auth-global-page'>
      <img typeof='svg' className='image' src={hospital} alt='hospital' />
      {children}
    </div>
  )
};

export default AuthGlobalPage;