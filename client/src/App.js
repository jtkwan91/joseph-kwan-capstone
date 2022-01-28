import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { UserContext } from './Contexts'
import Header from './components/Header/Header'
import Home from './pages/Home/Home'
import Footer from './components/Footer/Footer'
import Signup from './components/Signup/Signup'
import Handbook from './components/Handbook/Handbook'
import CharacterList from './pages/CharacterList/CharacterList'
import CreateCharacter from './components/CreateCharacter/CreateCharacter'


function App() {
  //todo story current user into localstorage to save current user state
  const [currentUser, setCurrentUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
  if(currentUser?.id)
  navigate("/characters")
  //todo current user dependacy shouldn't be an object
  }, [currentUser?.id])

  return (<UserContext.Provider value={currentUser} >
    <Header />
    <Routes>
    <Route path="/signup" element={<Signup />} />
    {/* <Route path="/characters/:id" element={} /> */}
    <Route path="/characters/add" element={<CreateCharacter />} />
    <Route path="/characters" element={<CharacterList />} />
    <Route path="/handbook" element={<Handbook />} />
    <Route path="/" element={<Home setCurrentUser={setCurrentUser}/>} />
    </Routes>
    <Footer />
    </UserContext.Provider>
  )
}

export default App
