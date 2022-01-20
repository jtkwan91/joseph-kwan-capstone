import React from 'react';
import './Header.scss'
import { Link } from 'react-router-dom'
import chest from '../../assets/images/chest.png'
import dropdown from '../../assets/icons/dropdown.png'

function Header() {
  return <div className='header'>
      <div className='header__top'>
      <Link to="/" className='header__title'>
      <h1>D&D Character Chest</h1>
      </Link>
      <img className='header__dropdown' src={dropdown} alt="dropdown icon" />
      </div>
      <img className='header__logo' src={chest} alt="treasure-chest" />
  </div>;
}

export default Header;
