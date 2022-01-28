import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Signup.scss'
import {registerUser} from '../../Api'


function Signup() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [display, setDisplay] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if(password !== confirm)
      return alert("passwords do not match")
    else
      registerUser({email, password, display})
      .then((response) => {
        alert("Thanks for signing up! Login to get started.")
      })
      .catch((err) => {
        alert("Error signing up :(")
      })
  }

    return (
      <div className='signup'>
        <form className="signup__form" onSubmit={handleSubmit}>
            <div className='signup__form-banner'>Sign up</div>

            <label className='signup__form-label' htmlFor="">e-mail:</label>
            <input className='signup__form-input' type="email" value={email} onChange={e => setEmail(e.target.value)}/>

            <label className='signup__form-label' htmlFor="">password:</label>
            <input className='signup__form-input' type="password" value={password} onChange={e => setPassword(e.target.value)}/>

            <label className='signup__form-label' htmlFor="">confirm password:</label>
            <input className='signup__form-input' type="password" value={confirm} onChange={e => setConfirm(e.target.value)}/>

            <label className='signup__form-label' htmlFor="">display name:</label>
            <input className='signup__form-input' type="text" value={display} onChange={e => setDisplay(e.target.value)}/>

            <div className='signup__form-buttons'> 
                <Link className='signup__form-cancel' to='/'>cancel</Link>
                <button className='signup__form-button' type='submit' >submit</button>
            </div>

        </form>
      </div>
  )
}

export default Signup
