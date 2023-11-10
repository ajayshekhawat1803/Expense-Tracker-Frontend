import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './Components/Header/Header';
import UserLogin from './Components/Login-Signup/UserLogin';
import UserSignup from './Components/Login-Signup/Usersignup';
import Dashboard from './Components/Dashboard/Dashboard';
import Expenses from './Components/Expenses/Expenses';
import Investments from './Components/Investments/Investments';
import { createContext, useState } from 'react';
import IncomeComp from './Components/Income/Income';

export const context = createContext({})
function App() {
  const [expenses, setExpenses] = useState(1)
  const [investment, setInvestment] = useState(1)
  const [Income, setIncome] = useState(1)
  const [savings, setSavings] = useState(Income - expenses - investment)
  const serverLink = "http://localhost:4000"

  return (
    <BrowserRouter>
      <context.Provider value={{ Income, setIncome, expenses, setExpenses, investment, setInvestment, savings, setSavings, serverLink }}>
        <Header />
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/login' element={<UserLogin />} />
          <Route path='/signup' element={<UserSignup />} />
          <Route path='/expenses' element={<Expenses />} />
          <Route path='/income' element={<IncomeComp />} />
          <Route path='/investment' element={<Investments />} />
        </Routes>
      </context.Provider>
    </BrowserRouter>
  );
}

export default App;
