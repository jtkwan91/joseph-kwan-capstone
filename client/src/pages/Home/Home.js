import React from 'react'
import Login from '../../components/Login/Login'
import './Home.scss'

function Home({setCurrentUser}) {
  return <div className='home'>
    <Login setCurrentUser={setCurrentUser}/>
  </div>
}

export default Home
