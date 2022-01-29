import { useState } from 'react'
import { Routes, Route} from 'react-router-dom'
import { UserContext } from './Contexts'
import Header from './components/Header/Header'
import Home from './pages/Home/Home'
import Footer from './components/Footer/Footer'
import Signup from './components/Signup/Signup'
import Handbook from './components/Handbook/Handbook'
import CreateCharacter from './components/CreateCharacter/CreateCharacter'


function App() {
  //todo story current user into localstorage to save current user state
  const [currentUser, setCurrentUser] = useState(null)


  return (<UserContext.Provider value={currentUser} >
    <Header setCurrentUser={setCurrentUser} />
    <Routes>
    <Route path="/signup" element={<Signup />} />
    {/* <Route path="/:id" element={} /> */}
    <Route path="/add" element={<CreateCharacter />} />
    <Route path="/handbook" element={<Handbook />} />
    <Route path="/" element={<Home setCurrentUser={setCurrentUser}/>} />
    </Routes>
    <Footer />
    </UserContext.Provider>
  )
}

export default App
