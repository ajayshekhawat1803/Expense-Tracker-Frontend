import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Investments.css'

const Investments = () => {
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
        <div className='investments-main'>
            <div className='investments'>
                <h1>Investments</h1>
                <h3 id='investment-heading'>Your investments :</h3>
                <div className='investment-cont'>
                    {
                        AllData.investment
                            ? <>
                                {
                                    AllData.investment.map((investment, index) => {
                                        return (
                                            <div key={index} className='investment-box'>
                                                <h3><span>Investment Name : </span>{investment.investmentName}</h3>
                                                <h3><span>Investment Category : </span>{investment.investmentCategory}</h3>
                                                <h3><span>Invested Amount : </span>{investment.investedAmount}</h3>
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

export default Investments