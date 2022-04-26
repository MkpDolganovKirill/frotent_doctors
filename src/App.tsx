import React from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import AuthGlobalPage from './components/AuthGlobalPage';
import Header from './components/Header';
import MainPage from './components/MainPage';
import './App.css';
import AuthorizationPage from './components/AuthorizationPage';
import RegisterPage from './components/RegisterPage';

const App = () => {

  let {  } = useLocation();

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
