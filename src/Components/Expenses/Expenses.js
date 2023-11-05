import React, { useEffect, useState } from 'react'
import './Expenses.css'
import axios from 'axios'

const Expenses = () => {
  const [AllData, setAllData] = useState([])
  const [showExpense, setshowExpense] = useState([])
  const [year, setyear] = useState("allData")
  const [month, setmonth] = useState("all")
  const [category, setcategory] = useState("")
  const [monthDisabled, setmonthDisabled] = useState(true)
  const serverLink = "http://localhost:4000/"

  useEffect(() => {
    let userData = JSON.parse(localStorage.getItem("ExpenseTrackerUserData"))
    getUserData(userData.userToLogin._id)
  }, [])

  const getUserData = async (id) => {
    let response = await axios.get(`${serverLink}user/getData/${id}`)
    setAllData(response.data.expense)
  }

  useEffect(() => {
    if (year && year !== "allData") {
      setmonthDisabled(false)
    }
    else {
      setmonthDisabled(true)
    }
  }, [year])

  useEffect(() => {
    handleExpenseToShow()
  }, [AllData, year, month, category])

  const handleExpenseToShow = () => {
    let filteredExpenses = AllData;
    if (category) {
      filteredExpenses = filteredExpenses.filter((exp) => (exp.expenseCategory === category));
    }
    if (year !== "allData") {
      filteredExpenses = filteredExpenses.filter((exp) => exp.date.split("-")[0] === year);
  
      if (month !== "all") {
        filteredExpenses = filteredExpenses.filter((exp) => exp.date.split("-")[1] === month);
      }
    }
    setshowExpense(filteredExpenses);
  }

  return (
    <div className='Expenses-main'>
      <div className='expenses'>
        <h1>Expenses</h1>
        <div className='exp-cat'>
          <select value={category} onChange={(e) => setcategory(e.target.value)}>
            <option value="">Select Category</option>
            <option value="Debts and Loans">Debts and Loans</option>
            <option value="Education">Education</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Food and Dining">Food and Dining</option>
            <option value="Home Expenses">Home Expenses</option>
            <option value="Miscellaneous">Miscellaneous</option>
            <option value="Personal Care">Personal Care</option>
            <option value="Transportation">Transportation</option>
          </select>
          <select disabled={monthDisabled} value={month} onChange={(e) => setmonth(e.target.value)}>
            <option value="all">Complete Year</option>
            <option value="01">January</option>
            <option value="02">February</option>
            <option value="03">March</option>
            <option value="04">April</option>
            <option value="05">May</option>
            <option value="06">June</option>
            <option value="07">July</option>
            <option value="08">August</option>
            <option value="09">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
          <select value={year} onChange={(e) => { setyear(e.target.value) }}>
            <option value="allData">Show all data</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
          </select>
        </div>
        <div className='data-cont'>
          {
            showExpense.length > 0 ?
              <>
                {
                  showExpense.map((exp, index) => {
                    // return <h1>name:{exp.expenseName} amount: {exp.expenseAmount} Category: {exp.expenseCategory} date: {exp.date}</h1>
                    return (
                      <div className='data-box' key={index}>
                        <h3>{exp.expenseName}</h3>
                        <div className='flex-box'>
                          <h4>Category</h4>
                          <h4>{exp.expenseCategory}</h4>
                        </div>
                        <div className='flex-box'>
                          <h4>Expense Date</h4>
                          <h4>{exp.date}</h4>
                        </div>
                        <div className='flex-box'>
                          <h4>Amount</h4>
                          <h4>{exp.expenseAmount}</h4>
                        </div>
                      </div>
                    )
                  })
                }
              </>
              : <h2 id='noData'>No data available</h2>
          }
        </div>
      </div>
    </div>
  )
}

export default Expenses
