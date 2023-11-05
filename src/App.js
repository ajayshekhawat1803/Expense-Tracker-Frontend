import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './Components/Header/Header';
import UserLogin from './Components/Login-Signup/UserLogin';
import UserSignup from './Components/Login-Signup/Usersignup';
import Dashboard from './Components/Dashboard/Dashboard';
import Expenses from './Components/Expenses/Expenses';
import Investments from './Components/Investments/Investments';
import Income from './Components/Income/Income';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/login' element={<UserLogin />} />
        <Route path='/signup' element={<UserSignup />} />
        <Route path='/expenses' element={<Expenses/>} />
        <Route path='/income' element={<Income/>} />
        <Route path='/investment' element={<Investments/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
