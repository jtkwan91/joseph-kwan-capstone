import React, { useContext } from 'react'
import Login from '../../components/Login/Login'
import './Home.scss'
import { UserContext } from '../../Contexts'
import CharacterList from '../CharacterList/CharacterList'


function Home({setCurrentUser}) {

  const currentUser = useContext(UserContext)

  return <div className='home'>
    {currentUser
    ? <CharacterList />
    : <Login setCurrentUser={setCurrentUser}/>
    }

  </div>
}

export default Home
