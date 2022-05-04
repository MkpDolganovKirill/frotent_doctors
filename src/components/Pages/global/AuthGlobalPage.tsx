import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import hospital from '../../../images/hospital.svg';
import '../../../Styles/pages/global/AuthGlobalPage.scss';

interface IAuthGlobalPageProps {
  children: React.ReactNode
}

const AuthGlobalPage = ({ children }: IAuthGlobalPageProps) => {

  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  useEffect(() => {
    if (token) navigate('/main');
  }, [])

  return (
    <div className='auth-global-page'>
      <img typeof='svg' className='image' src={hospital} alt='hospital' />
      {children}
    </div>
  )
};

export default AuthGlobalPage;