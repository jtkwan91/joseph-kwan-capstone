import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import Home from './pages/Home/Home'
import Footer from './components/Footer/Footer'
import Signup from './components/Signup/Signup'
import Handbook from './components/Handbook/Handbook'

function App() {
  return (
<BrowserRouter>
<Header />
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/signup" element={<Signup />} />
  {/* <Route path="/characters/:id" element={} /> */}
  {/* <Route path="/characters/add" element={} /> */}
  {/* <Route path="/characters" element={} /> */}
  <Route path="/handbook" element={<Handbook />} />
</Routes>
<Footer />
</BrowserRouter>
  )
}

export default App
