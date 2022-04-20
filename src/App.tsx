import React from 'react';
import './App.css';
import AuthGlobalPage from './components/AuthGlobalPage';
import Header from './components/Header';

const App = () => {
  return (
    <div className="App">
      <Header title='Зарегистрироваться в системе'/>
      <AuthGlobalPage />
    </div>
  );
};

export default App;
