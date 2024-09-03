import React from 'react'
import { Line, Doughnut } from 'react-chartjs-2'
import { CategoryScale, Chart as ChartJS, Tooltip, Filler, LinearScale, PointElement, LineElement, ArcElement, Legend, plugins, scales } from 'chart.js'
import { blue } from '../../constants/color';
import { orange, purple } from '@mui/material/colors';
import { getLast7Days } from '../../library/features';


ChartJS.register(Tooltip, Filler, CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Legend);

const labels = getLast7Days();
// LineChartOptions
const lineChartOptions = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: false,
        },
    },
    scales: {
        x: {
            grid: {
                display: false,
            },
        },
        y: {
            beginAtZero: true,
            grid: {
                display: false,
            },
        },
    },
};

const LineChart = ({ value = {} }) => {
    const data = {
        labels,
        datasets: [
            {
                data: value,
                label: "Chats",
                borderColor: "purple",
                tension: 0.1,
                pointRadius: 0,
                fill: true,
                backgroundColor: "rgba(75,12,192,0.2)"
            },
            {
                data: value,
                label: "Chats",
                borderColor: "purple",
                tension: 0.1,
                pointRadius: 0,
                fill: true,
                backgroundColor: "rgba(75,12,192,0.2)"
            },


        ],
    }
    return (
        <Line data={data} />
    )
}

// DoughnutChartOptions
const DoughnutChartOptions = {}

const DoughnutChart = ({ value = [], labels = [] }) => {
    const purple = '#800080'; // Define your colors
    const green = 'green';
    const lightblue = 'lightblue'; // Define your colors

    const data = {
        labels,
        datasets: [
            {
                data: value,
                label: "Total Chats Vs Group Chats Vs Community Chats",
                tension: 0.1,
                pointRadius: 0,
                fill: true,
                borderColor: [lightblue, green, purple],
                backgroundColor: [lightblue, green, purple],
                offset:20,
            },
        ],
    };

    return <Doughnut style={{zIndex: 10}} data={data} options={DoughnutChartOptions}/>;
};


export { LineChart, DoughnutChart }