import React, { useContext, useState } from "react"
import "./Header.scss"
import { Link, useNavigate } from "react-router-dom"
import chest from "../../assets/images/chest.png"
import dropdownIcon from "../../assets/icons/dropdown.svg"
import { UserContext } from "../../Contexts"
import { logoutUser } from "../../Api"

function Header({ setCurrentUser }) {
  const currentUser = useContext(UserContext)
  const [toggleDropdown, setToggleDropdown] = useState(false)
  const navigate = useNavigate()

  const handleLogout = (e) => {
    logoutUser()
      .then(() => {
        setCurrentUser(null)
        navigate("/")
      })
      .catch((err) => {
        console.error(err.message)
      })
  }

  return (
    <div className="header">
      <div className="header__logo-container">
        <img className="header__logo" src={chest} alt="treasure-chest" />
      </div>
      <Link to="/" className="header__title">
        D&D Character Chest
        {currentUser ? (
          <span className="header__welcome">
            <br />
            Welcome, {currentUser.display_name}
          </span>
        ) : null}
      </Link>
      <div className="header__right">
        <button className="header__dropdown">
          <img
            className="header__dropdown-img"
            src={dropdownIcon}
            alt="dropdown icon"
            onClick={() => setToggleDropdown(!toggleDropdown)}
          />
        </button>
        {toggleDropdown && (
          <div className={`header__dropdown-menu fade-top`}>
            <Link
              className="header__dropdown-menu--item"
              to="/"
              onClick={() => setToggleDropdown(!toggleDropdown)}
            >
              Character List
            </Link>
            <Link
              className="header__dropdown-menu--item"
              to="/handbook"
              onClick={() => setToggleDropdown(!toggleDropdown)}
            >
              Player's Handbook
            </Link>
            {currentUser ? (
              <Link
                className="header__dropdown-menu--item signout"
                to="/"
                onClick={handleLogout}
              >
                Sign-out {currentUser.display_name}
              </Link>
            ) : null}
          </div>
        )}
      </div>
    </div>
  )
}

export default Header
