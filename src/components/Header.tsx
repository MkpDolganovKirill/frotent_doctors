import React from 'react';
import medicineIcon from '../images/medicine.svg';
import '../Styles/Header.scss';

interface HeaderProps {
  title: string
}

const Header = ({ title }: HeaderProps) => {
  return (
    <div className='header'>
      <img className='header-icon' src={medicineIcon} alt='medicine'/>
      <p className='header-title'>{title}</p>
    </div>
  )
};

export default Header;