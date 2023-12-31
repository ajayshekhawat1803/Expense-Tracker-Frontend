import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Investments.css'

const Investments = () => {
    const [AllData, setAllData] = useState([])
    const [showInvestment, setshowInvestment] = useState([])
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
        setAllData(response.data.investment)
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
        handleInvestmentToShow()
    }, [AllData, year, month, category])

    const handleInvestmentToShow = () => {
        let filteredInvestment = AllData;
        if (category) {
            filteredInvestment = filteredInvestment.filter((inv) => (inv.investmentCategory === category));
        }
        if (year !== "allData") {
            filteredInvestment = filteredInvestment.filter((inv) => inv.date.split("-")[0] === year);

            if (month !== "all") {
                filteredInvestment = filteredInvestment.filter((inv) => inv.date.split("-")[1] === month);
            }
        }
        setshowInvestment(filteredInvestment);
    }


    return (
        <div className='investments-main'>
            <div className='investments'>
                <h1>Investments</h1>
                <div className='inv-cat'>
                    <select value={category} onChange={(e) => setcategory(e.target.value)}>
                        <option value="">Select Category</option>
                        <option value="Gold">Gold</option>
                        <option value="Foreign Currency">Foreign Currency</option>
                        <option value="Stocks">Stocks</option>
                        <option value="Mutual Funds">Mutual Funds</option>
                        <option value="Real Estate">Real Estate</option>
                        <option value="Other Investments">Other Investments</option>
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
                        showInvestment.length > 0 ?
                            <>
                                {
                                    showInvestment.map((inv, index) => {
                                        return (
                                            <div className='data-box' key={index}>
                                                <h3>{inv.investmentName}</h3>
                                                <div className='flex-box'>
                                                    <h4>Category</h4>
                                                    <h4>{inv.investmentCategory}</h4>
                                                </div>
                                                <div className='flex-box'>
                                                    <h4>Expense Date</h4>
                                                    <h4>{inv.date}</h4>
                                                </div>
                                                <div className='flex-box'>
                                                    <h4>Amount</h4>
                                                    <h4>{inv.investedAmount}</h4>
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

export default Investments