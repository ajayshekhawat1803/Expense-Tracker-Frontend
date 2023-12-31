import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './Other.css'
import { context } from '../../App'

const AddIncome = () => {
    const { Income, setIncome, serverLink } = useContext(context)
    const initialvalues = { incomeName: "", incomeAmount: "", date: "" }
    const [formvalues, setformvalues] = useState(initialvalues)
    const [formErrors, setFormErrors] = useState({})
    const [isSubmit, setIssubmit] = useState(false)
    const navigate = useNavigate()

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
            addIncomeToDatabase()
        }
    }, [formErrors])

    const addIncomeToDatabase = async () => {
        let response = await axios.post(`${serverLink}/user/add-income`, { ...formvalues, token: userData.token, _id: userData.userToLogin._id })
        console.log(response);
        if (response.status === 201) {
            setformvalues(initialvalues)
            setIncome(Income)
            alert("New Income Added")
        }
        if (response.data.message === "Token error") {
            alert("Session Expired !!!")
            navigate("/login")
        }
    }

    const validate = (values) => {
        const errors = {}
        if (!values.incomeName) {
            errors.incomeName = "Enter Income Name"
        }
        if (!values.incomeAmount) {
            errors.incomeAmount = "Add Income Amount"
        }
        if (!values.date) {
            errors.date = "Date of income received"
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
                <h5>Date of income received</h5>
                <input type='date'
                    name='date'
                    value={formvalues.date}
                    onChange={handleChange}
                />
                <p>{formErrors.date}</p>
                <button type='submit'>Add Income</button>
            </form>
        </div>
    )
}

export default AddIncome