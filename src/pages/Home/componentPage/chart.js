// src/components/Chart.js
import React from "react";
import { Line } from "react-chartjs-2"; // Replace with your preferred chart library

const Chart = ({ data }) => {
  // Example data format for Chart.js
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: "Example Chart",
        data: data.values,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  return (
    <div>
      <h3>Monitoring Chart</h3>
      <Line data={chartData} />
    </div>
  );
};

export default Chart;
