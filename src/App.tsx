import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AuthGlobalPage from './components/Pages/global/AuthGlobalPage';
import Header from './components/Pages/global/Header';
import MainPage from './components/Pages/global/MainPage';
import AuthorizationPage from './components/Pages/subsidiaries/authGlobal/AuthorizationPage';
import RegisterPage from './components/Pages/subsidiaries/authGlobal/RegisterPage';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route 
          path='/auth/authorization' 
          element={<AuthGlobalPage children={<AuthorizationPage />}/>}
        />
        <Route
          path='/auth/registration'
          element={<AuthGlobalPage  children={<RegisterPage />} />}
        />
        <Route path='/main' element={
          <MainPage />}
        />
        <Route 
          path='/' 
          element={
            localStorage.getItem('token') ? <Navigate to='/main' replace /> : <Navigate to='/auth/authorization' replace />
          } 
        />
        <Route
          path='*'
          element={<Navigate to='/' replace />}
        />
      </Routes>
    </div>
  );
};

export default App;
