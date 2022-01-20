import React from 'react'
import { Link } from 'react-router-dom'
import './Login.scss'

function Login() {
  return (
<div className='login'>

  <form className='login__form'>

  <div className='login__form-banner'>Login</div>

  <label className='login__form-label' htmlFor="loginId">login ID:</label>
  <input className='login__form-input' type="text" name="loginId" id="loginId" />

  <label className='login__form-label' htmlFor="loginPassword">password:</label>
  <input className='login__form-input' type="text" name='loginPassword' id='loginPassword'/>

<button className='login__form-button'>login</button>

  </form>

  <Link className='login__signup' to="/signup">New? Sign up here.</Link>
</div>
  )
}

export default Login;