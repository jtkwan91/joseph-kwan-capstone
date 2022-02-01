import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { loginUser } from '../../Api'
import './Login.scss'

function Login({setCurrentUser}) {

  const [loginId, setLoginId] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    loginUser({email:loginId, password})
    .then(setCurrentUser)
    .catch((err) => {
      console.error("Invalid login id or password:", err.message)
    })
  }

  return (
    <div className='login'>

      <form className='login__form' onSubmit={handleSubmit}>

      <div className='login__form-banner'>Login</div>

      <label className='login__form-label' htmlFor="loginId">login ID:</label>
      <input className='login__form-input' value={loginId} name="loginId" id="loginId" onChange={e => setLoginId(e.target.value)} />

      <label className='login__form-label' htmlFor="loginPassword">password:</label>
      <input className='login__form-input' value={password} type="password" name='loginPassword' id='loginPassword' onChange={e => setPassword(e.target.value)} />

      <button className='login__form-button'>login</button>

      </form>

      <Link className='login__signup' to="/signup">New? Sign up here.</Link>
    </div>
  )
}

export default Login
