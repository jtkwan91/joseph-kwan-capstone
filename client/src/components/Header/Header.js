import React, { useState } from 'react';
import './Header.scss'
import { Link } from 'react-router-dom'
import chest from '../../assets/images/chest.png'
import dropdownIcon from '../../assets/icons/dropdown.png'

function Header() {

  const [toggleDropdown, setToggleDropdown] = useState(false)

  return <div className='header'>
      <div className='header__top'>
      <Link to="/" className='header__title'>
      <h1>D&D Character Chest</h1>
      </Link>
      <button className='header__dropdown'><img className='header__dropdown-img' src={dropdownIcon} alt="dropdown icon" onClick={() => setToggleDropdown(!toggleDropdown)}/></button>
      {toggleDropdown && (
      <div className={`header__dropdown-menu fade-top`}>
        <Link className='header__dropdown-menu--item' to='/characters'>Character List</Link>
        <Link className='header__dropdown-menu--item' to='/handbook'>Player's Handbook</Link>
        <Link className='header__dropdown-menu--item' to='/'>Sign-out</Link>
      </div>)}
      </div>
      <img className='header__logo' src={chest} alt="treasure-chest" />
  </div>;
}

export default Header;

const MyComponent = () => {
  const [toggle, setToggle] = useState(false)

  return(
    <>
      <button onClick={() => setToggle(!toggle)}>Toggle Dropdown Markup</button>
      {toggle && (
        <ul>
          <li>Show me</li>
          <li>Only when</li>
          <li>Toggle === true</li>
        </ul>
      )}
    </>
  )
}