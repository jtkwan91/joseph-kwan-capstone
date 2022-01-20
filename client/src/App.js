import './App.scss'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header/Header'
import Home from './pages/Home/Home'
import Login from './components/Login/Login'
import Footer from './components/Footer/Footer'

function App() {
  return (
<BrowserRouter>
<Header />
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/login" element={<Login />} />
  {/* <Route path="/signup" element={} />
  <Route path="/characters/:id" element={} />
  <Route path="/characters/add" element={} />
  <Route path="/characters" element={} /> */}
</Routes>
<Footer />
</BrowserRouter>
  )
}

export default App
