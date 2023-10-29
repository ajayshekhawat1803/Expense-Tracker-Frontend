import React, { useEffect, useRef } from 'react';
import './PieChart.css'

const PieChart = ({ Income, expenses,  investment,  savings }) => {
    const canvasRef = useRef();

    useEffect(() => {
        drawChart();
    }, [expenses, investment, savings]);

    const drawChart = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const total = expenses + investment + savings;
        let startAngle = 0;

        [expenses, investment, savings].forEach((value, index) => {
            const percentage = (value / total) * 100;
            const endAngle = (startAngle + (percentage / 100) * 2 * Math.PI);

            ctx.beginPath();
            ctx.moveTo(canvas.width / 2, canvas.height / 2);
            ctx.arc(canvas.width / 2, canvas.height / 2, Math.min(canvas.width, canvas.height) / 2, startAngle, endAngle);
            ctx.fillStyle = ['#FF5733', '#33FF57', '#5733FF'][index];
            ctx.fill();

            startAngle = endAngle;
        });
    };


    return (
        <div className='pieChart'>
            <canvas ref={canvasRef} width="300" height="300"></canvas>
            <div>
                <span>
                    <span  className='colorbox'></span>
                    <span className='tagname'>Income :</span>
                    {Income}
                </span>
                <span>
                    <span id='red' className='colorbox'></span>
                    <span className='tagname'>Expenses :</span>
                    {expenses}
                </span>
                <span>
                    <span id='blue' className='colorbox'></span>
                    <span className='tagname'>Savings :</span>
                    {savings}
                </span>
                <span>
                    <span id='green' className='colorbox'></span>
                    <span className='tagname'>investment :</span>
                    {investment}
                </span>
            </div>
        </div>
    )
}

export default PieChart
