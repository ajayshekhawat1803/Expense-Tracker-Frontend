import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Dashboard.css'
import PieChart from './PieChart'
import AddExpense from './AddExpense'
import AddIncome from './AddIncome'
import AddInvestment from './AddInvestment'

const Dashboard = () => {
  const [UserAuth, setUserAuth] = useState({})
  const [expenses, setExpenses] = useState(3000)
  const [savings, setSavings] = useState(4000)
  const [investment, setInvestment] = useState(6000)
  const [Income, setIncome] = useState(expenses + savings + investment)

  const [showAddExpense, setShowAddExpense] = useState(false)
  const [showAddIncome, setShowAddIncome] = useState(false)
  const [showAddInvestment, setShowAddInvestment] = useState(false)

  const navigate = useNavigate()
  useEffect(() => {
    let userData = localStorage.getItem("ExpenseTrackerUserData")
    setUserAuth(JSON.parse(userData))
    if (!userData) {
      navigate("/login")
    }
  }, [])

  useEffect(() => {
    setIncome(expenses + savings + investment)
  }, [expenses, savings, investment])

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
            <PieChart
              Income={Income}
              expenses={expenses}
              investment={investment}
              savings={savings}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
