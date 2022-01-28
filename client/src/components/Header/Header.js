import React, { useContext, useState } from 'react'
import './Header.scss'
import { Link } from 'react-router-dom'
import chest from '../../assets/images/chest.png'
import dropdownIcon from '../../assets/icons/dropdown.svg'
import { UserContext } from '../../Contexts'

function Header() {
  const currentUser = useContext(UserContext)
  const [toggleDropdown, setToggleDropdown] = useState(false)

  return <div className='header'>
    
    <img className='header__logo' src={chest} alt="treasure-chest" />
      <Link to="/" className='header__title'>D&D Character Chest</Link>
      <button className='header__dropdown'><img className='header__dropdown-img' src={dropdownIcon} alt="dropdown icon" onClick={() => setToggleDropdown(!toggleDropdown)}/></button>
      {toggleDropdown && (
      <div className={`header__dropdown-menu fade-top`}>
        <Link className='header__dropdown-menu--item' to='/characters' onClick={() => setToggleDropdown(!toggleDropdown)}>Character List</Link>
        <Link className='header__dropdown-menu--item' to='/handbook' onClick={() => setToggleDropdown(!toggleDropdown)}>Player's Handbook</Link>
        { currentUser
        ? <Link className='header__dropdown-menu--item' to='/' onClick={() => setToggleDropdown(!toggleDropdown)}>Sign-out {currentUser.display_name}</Link>
        : null
        }
      </div>)}
  </div>
}

export default Header
