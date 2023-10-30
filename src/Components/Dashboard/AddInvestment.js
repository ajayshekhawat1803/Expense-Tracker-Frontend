import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './Other.css'

const AddInvestment = () => {
    const initialvalues = { investmentName: "", investmentCategory: "", investedAmount: "",date:"" }
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
            addInvestmentToDatabase()
        }
    }, [formErrors])

    const addInvestmentToDatabase = async () => {
        let response = await axios.post(`${serverLink}user/add-investment`, { ...formvalues, token: userData.token, _id: userData.userToLogin._id })
        console.log(response);
        if (response.status === 201) {
            setformvalues(initialvalues)
            alert("New Investment Added")
        }
        if (response.data.message === "Token error") {
            alert("Session Expired !!!")
            navigate("/login")
        }
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
        if (!values.date) {
            errors.date = "Add invested date"
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
                    <option value="Gold">Gold</option>
                    <option value="Foreign Currency">Foreign Currency</option>
                    <option value="Stocks">Stocks</option>
                    <option value="Mutual Funds">Mutual Funds</option>
                    <option value="Real Estate">Real Estate</option>
                    <option value="Other Investments">Other Investments</option>
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
                <h5>Invested Date</h5>
                <input type='date'
                    name='date'
                    value={formvalues.date}
                    onChange={handleChange}
                />
                <p>{formErrors.date}</p>
                <button type='submit'>Add Investment</button>
            </form>
        </div>
    )
}

export default AddInvestment