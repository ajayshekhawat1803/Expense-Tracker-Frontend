import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './Components/Header/Header';
import UserLogin from './Components/Login-Signup/UserLogin';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/login' element={<UserLogin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
