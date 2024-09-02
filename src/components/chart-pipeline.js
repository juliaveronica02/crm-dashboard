import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const PipelineChart = () => {
  const data = {
    labels: ['1-10 Days', '11-20 Days', '21-30 Days', '31-40 Days', '41-50 Days'],
    datasets: [
      {
        label: 'New Customer',
        data: [12.8, 9.8, 13.8, 15.8, 7.8],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
      {
        label: 'Existing Customer',
        data: [6.9, 11.8, 18.9, 21.9, 9.8],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
    ],
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">Pipeline Sales Cycle</h5>
        <Bar data={data} />
      </div>
    </div>
  );
};

export default PipelineChart;