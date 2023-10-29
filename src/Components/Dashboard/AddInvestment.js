import React, { useState, useEffect } from 'react'
import './Other.css'

const AddInvestment = () => {
    const initialvalues = { investmentName: "", investmentCategory: "", investedAmount: "" }
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
        console.log("Investment ADDED");
    }

    const validate = (values) => {
        const errors = {}
        if (!values.investmentName) {
            errors.investmentName = "Enter Investment Name"
        }
        if (!values.investmentCategory) {
            errors.investmentCategory = "Add Investment Category"
        }
        if (!values.investedAmount) {
            errors.investedAmount = "Add Invested Amount"
        }
        return errors
    }

    return (
        <div className='other'>
            <form onSubmit={handleSubmit}>
                <h5>Investment Name Name</h5>
                <input type='text'
                    autoFocus
                    placeholder='Investment Name'
                    name='investmentName'
                    value={formvalues.investmentName}
                    onChange={handleChange}
                />
                <p>{formErrors.investmentName}</p>
                <h5>Investment Category</h5>
                <select
                    name='investmentCategory'
                    value={formvalues.investmentCategory}
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
                <p>{formErrors.investmentCategory}</p>
                <h5>Invested Amount</h5>
                <input type='number'
                    name='investedAmount'
                    placeholder='invested Amount'
                    value={formvalues.investedAmount}
                    onChange={handleChange}
                />
                <p>{formErrors.investedAmount}</p>
                <br />
                <button type='submit'>Add Investment</button>
            </form>
        </div>
    )
}

export default AddInvestment