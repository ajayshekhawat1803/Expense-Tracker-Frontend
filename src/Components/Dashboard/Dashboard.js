import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './Dashboard.css'
import PieChart from './PieChart'
import AddExpense from './AddExpense'
import AddIncome from './AddIncome'
import AddInvestment from './AddInvestment'
import { context } from '../../App'

const Dashboard = () => {
  const [UserAuth, setUserAuth] = useState({})
  const {
    Income, setIncome,
    expenses, setExpenses,
    investment, setInvestment,
    savings, setSavings,
    serverLink } = useContext(context)
  let userId;

  const [showAddExpense, setShowAddExpense] = useState(false)
  const [showAddIncome, setShowAddIncome] = useState(false)
  const [showAddInvestment, setShowAddInvestment] = useState(false)

  const navigate = useNavigate()
  useEffect(() => {
    let userData = localStorage.getItem("ExpenseTrackerUserData")
    userId = JSON.parse(userData).userToLogin._id
    setUserAuth(JSON.parse(userData))
    if (!userData) {
      navigate("/login")
    }
    else {
      getUserData(JSON.parse(userData).userToLogin._id)
    }
  }, [])

  useEffect(() => {
    setSavings(Income - expenses - investment)
    console.log("chala");
    if (userId) {
      getUserData(userId)
    }
  }, [expenses, Income, investment])

  const getUserData = async (id) => {
    let response = await axios.get(`${serverLink}/user/getData/${id}`)
    // setAllData(response.data)
    const TempExp = response.data.expense.reduce((acc, curr) => {
      return acc + Number(curr.expenseAmount)
    }, 0)
    setExpenses(TempExp)
    const TempIncome = response.data.income.reduce((acc, curr) => {
      return acc + Number(curr.incomeAmount)
    }, 0)
    setIncome(TempIncome)
    const TempInvest = response.data.investment.reduce((acc, curr) => {
      return acc + Number(curr.investedAmount)
    }, 0)
    setInvestment(TempInvest)
    setSavings(TempIncome - TempExp - TempInvest)
  }

  return (
    <div className='dashboard-main'>
      <div className='dashboard'>
        <h1>Dashboard</h1>
        <h2 id='username'>Welcome <span>{UserAuth.userToLogin ? UserAuth.userToLogin.name : null},</span></h2>
        <div className='dash-cont'>
          <div className='left'>
            <h3 onClick={() => setShowAddExpense(!showAddExpense)}>Add Expense</h3>
            {
              showAddExpense && <AddExpense />
            }
            <h3 onClick={() => setShowAddIncome(!showAddIncome)}>Add Income</h3>
            {
              showAddIncome && <AddIncome />
            }
            <h3 onClick={() => setShowAddInvestment(!showAddInvestment)}>Add Investment</h3>
            {
              showAddInvestment && <AddInvestment />
            }
          </div>
          <div className='right'>
            <PieChart />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
