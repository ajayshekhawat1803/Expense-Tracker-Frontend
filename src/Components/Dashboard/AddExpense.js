import React, { useState, useEffect } from 'react'
import './Other.css'

const AddExpense = () => {
    const initialvalues = { expenseName: "", expenseCategory: "", expenseAmount: "" }
    const [formvalues, setformvalues] = useState(initialvalues)
    const [formErrors, setFormErrors] = useState({})
    const [isSubmit, setIssubmit] = useState(false)

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

    const addExpenseToDatabase = () => {
        console.log("Expense ADDED");
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
                <br />
                <button type='submit'>Add Expense</button>
            </form>
        </div>
    )
}

export default AddExpense