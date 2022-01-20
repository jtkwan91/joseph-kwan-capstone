import './App.scss';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import Login from './components/Login/Login';
function App() {
  return (
<BrowserRouter>
<Header />
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/login" element={<Login />} />
  {/* <Route path="/signup" component={} />
  <Route path="/characters/:id" component={} />
  <Route path="/characters/add" component={} />
  <Route path="/characters" component={} /> */}
</Routes>
</BrowserRouter>
  );
}

export default App;
