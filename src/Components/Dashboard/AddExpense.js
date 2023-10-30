import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './Other.css'

const AddExpense = () => {
    const initialvalues = { expenseName: "", expenseCategory: "", expenseAmount: "", date: "" }
    const [formvalues, setformvalues] = useState(initialvalues)
    const [formErrors, setFormErrors] = useState({})
    const [isSubmit, setIssubmit] = useState(false)
    const navigate = useNavigate()

    const serverLink = "http://localhost:4000/"
    let userData = JSON.parse(localStorage.getItem("ExpenseTrackerUserData"))

    const handleChange = (e) => {
        const { name, value } = e.target;
        setformvalues({ ...formvalues, [name]: value })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        setFormErrors(validate(formvalues))
        setIssubmit(true)
    }
    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            addExpenseToDatabase()
        }
    }, [formErrors])

    const addExpenseToDatabase = async () => {
        let response = await axios.post(`${serverLink}user/add-expense`, { ...formvalues, token: userData.token, _id: userData.userToLogin._id })
        console.log(response);
        if (response.status === 201) {
            setformvalues(initialvalues)
            alert("New Expense Added")
        }
        if (response.data.message === "Token error") {
            alert("Session Expired !!!")
            navigate("/login")
        }
    }

    const validate = (values) => {
        const errors = {}
        if (!values.expenseName) {
            errors.expenseName = "Enter Expense Name"
        }
        if (!values.expenseCategory) {
            errors.expenseCategory = "Add Expense Category"
        }
        if (!values.expenseAmount) {
            errors.expenseAmount = "Add Expense Amount"
        }
        if (!values.date) {
            errors.date = "Select data of expense"
        }
        return errors
    }

    return (
        <div className='other'>
            <form onSubmit={handleSubmit}>
                <h5>Expense Name</h5>
                <input type='text'
                    autoFocus
                    placeholder='Expense Name'
                    name='expenseName'
                    value={formvalues.expenseName}
                    onChange={handleChange}
                />
                <p>{formErrors.expenseName}</p>
                <h5>Expense Category</h5>
                <select
                    name='expenseCategory'
                    value={formvalues.expenseCategory}
                    onChange={handleChange}>
                    <option value="">Not Selected</option>
                    <option value="Debts and Loans">Debts and Loans</option>
                    <option value="Education">Education</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Food and Dining">Food and Dining</option>
                    <option value="Home Expenses">Home Expenses</option>
                    <option value="Miscellaneous">Miscellaneous</option>
                    <option value="Personal Care">Personal Care</option>
                    <option value="Transportation">Transportation</option>
                </select>
                <p>{formErrors.expenseCategory}</p>
                <h5>Expense Amount</h5>
                <input type='number'
                    name='expenseAmount'
                    placeholder='Expense Amount'
                    value={formvalues.expenseAmount}
                    onChange={handleChange}
                />
                <p>{formErrors.expenseAmount}</p>
                <h5>Date of expense</h5>
                <input type='date'
                    name='date'
                    value={formvalues.date}
                    onChange={handleChange}
                />
                <p>{formErrors.date}</p>
                <button type='submit'>Add Expense</button>
            </form>
        </div>
    )
}

export default AddExpense