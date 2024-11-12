//rfce

import React,{useState} from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

// Register necessary chart components
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);


function TransactionBarChart(props) {

    console.log(props);

    const data=props.chartdata;

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];

    const monthInt=new Date(props.selectedDate).getMonth();
      
    const monthName=months[monthInt]

      const labels = data.map(item => item.range);  // Labels for X-axis
      const counts = data.map(item => item.count);  // Bar heights (Y-axis data)
       // Chart.js data configuration
  const chartData = {
    labels: labels,  // X-axis labels
    datasets: [
      {
        label: 'Count by Range',
        data: counts,  // Bar chart data (counts for each range)
        backgroundColor: '#36A2EB',  // Color for the bars
        borderColor: '#2196F3',      // Border color for the bars
        borderWidth: 1,              // Border width
      },
    ],
  };

  // Chart.js options configuration
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.label}: ${context.raw} items`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,  // Start Y-axis from 0
        ticks: {
          stepSize: 1,  // Set step size for ticks on the Y-axis
        },
      },
    },
  };

  return (
    <div>
    <h2>Bar Char Status {monthName}</h2>
    <Bar data={chartData} options={chartOptions} />
  </div>
  )
}

export default TransactionBarChart
