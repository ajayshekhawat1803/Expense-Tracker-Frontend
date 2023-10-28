import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './Components/Header/Header';
import UserLogin from './Components/Login-Signup/UserLogin';
import UserSignup from './Components/Login-Signup/Usersignup';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/login' element={<UserLogin />} />
        <Route path='/signup' element={<UserSignup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
