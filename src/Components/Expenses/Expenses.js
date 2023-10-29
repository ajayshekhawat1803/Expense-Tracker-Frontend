import React, { useEffect, useState } from 'react'
import './Expenses.css'
import axios from 'axios'

const Expenses = () => {
  const [AllData, setAllData] = useState([])
  const serverLink = "http://localhost:4000/"

  useEffect(() => {
    let userData = JSON.parse(localStorage.getItem("ExpenseTrackerUserData"))
    getUserData(userData.userToLogin._id)
  }, [])

  const getUserData = async (id) => {
    let response = await axios.get(`${serverLink}user/getData/${id}`)
    setAllData(response.data)
    // console.log(response.data);
  }

  return (
    <div className='Expenses-main'>
      <div className='expenses'>
        <h1>Expenses</h1>
        <h3 id='expense-heading'>Your Expenses :</h3>
        <div className='expense-cont'>
          {
            AllData.expense
              ? <>
                {
                  AllData.expense.map((expense, index) => {
                    return (
                      <div key={index} className='expense-box'>
                        <h3><span>Expense Name : </span>{expense.expenseName}</h3>
                        <h3><span>Expense Category : </span>{expense.expenseCategory}</h3>
                        <h3><span>Expensed Amount : </span>{expense.expenseAmount}</h3>
                      </div>
                    )
                  })
                }
              </>
              : null
          }
        </div>
      </div>
    </div>
  )
}

export default Expenses
