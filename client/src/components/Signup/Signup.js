import React from 'react'
import { Link } from 'react-router-dom'
import './Signup.scss'

function Signup() {
    return (
      <div className='signup'>
        <form className="signup__form">
            <div className='signup__form-banner'>Sign up</div>

            <label className='signup__form-label' htmlFor="">e-mail:</label>
            <input className='signup__form-input' type="email" />

            <label className='signup__form-label' htmlFor="">password:</label>
            <input className='signup__form-input' type="password" />

            <label className='signup__form-label' htmlFor="">confirm password:</label>
            <input className='signup__form-input' type="password" />

            <label className='signup__form-label' htmlFor="">display name:</label>
            <input className='signup__form-input' type="text" />

            <div className='signup__form-buttons'> 
                <Link className='signup__form-cancel' to='/'>cancel</Link>
                <button className='signup__form-button' type='submit'>submit</button>
            </div>

        </form>
      </div>
  )
}

export default Signup
