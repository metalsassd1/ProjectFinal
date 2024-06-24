import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CustomBarChart = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://back-end-finals-project-pgow.onrender.com/api/home/management");
        setRows(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Transform data to have quantities summed by equipment_name and loan_status
  const equipmentStatusData = rows.reduce((acc, item) => {
    const { equipment_name, loan_status, quantity_data } = item;
    acc[equipment_name] = acc[equipment_name] || {};
    acc[equipment_name][loan_status] = (acc[equipment_name][loan_status] || 0) + quantity_data;
    return acc;
  }, {});

  // Format data for rendering in BarChart
  const barData = Object.entries(equipmentStatusData).map(([name, statuses]) => ({
    name,
    ...statuses
  }));

  console.log(barData);
  return (
    <ResponsiveContainer width="50%" height={400}>
      <BarChart data={barData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        {Object.keys(rows.reduce((acc, item) => {
          acc[item.loan_status] = 1; // Collect unique statuses
          return acc;
        }, {})).map(status => (
          <Bar key={status} dataKey={status} stackId="a" fill={getRandomColor()} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
};

// Function to generate random colors for each bar
const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export default CustomBarChart;
