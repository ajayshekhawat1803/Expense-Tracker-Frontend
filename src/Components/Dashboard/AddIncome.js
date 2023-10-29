import React, { useState, useEffect } from 'react'
import './Other.css'

const AddIncome = () => {
    const initialvalues = { incomeName: "", incomeAmount: "" }
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
        console.log("Income ADDED");
    }

    const validate = (values) => {
        const errors = {}
        if (!values.incomeName) {
            errors.incomeName = "Enter Income Name"
        }
        if (!values.incomeAmount) {
            errors.incomeAmount = "Add Income Amount"
        }
        return errors
    }

    return (
        <div className='other'>
        <form onSubmit={handleSubmit}>
            <h5>Income Name</h5>
            <input type='text'
                autoFocus
                placeholder='Income Name'
                name='incomeName'
                value={formvalues.incomeName}
                onChange={handleChange}
            />
            <p>{formErrors.incomeName}</p>
            <h5>Income Amount</h5>
            <input type='number'
                name='incomeAmount'
                placeholder='income Amount'
                value={formvalues.incomeAmount}
                onChange={handleChange}
            />
            <p>{formErrors.incomeAmount}</p>
            <br />
            <button type='submit'>Add Income</button>
        </form>
    </div>
    )
}

export default AddIncome