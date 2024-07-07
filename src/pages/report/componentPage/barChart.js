import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CustomBarChart = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://back-end-finals-project-vibo.onrender.com/api/home/management");
        setRows(response.data);
      } catch (error) {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
      }
    };

    fetchData();
  }, []);


  const barData = rows.map((item) => ({
    name: item.equipment_name,
    จำนวน: item.quantity_data
  }));

  console.log(barData);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={barData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" label={{ value: 'ชื่ออุปกรณ์', position: 'insideBottomRight', offset: -10 }} />
        <YAxis label={{ value: 'จำนวน', angle: -90, position: 'insideLeft' }} />
        <Tooltip />
        <Legend />
        <Bar dataKey="จำนวน" fill="#8884d8" name="จำนวนการยืม" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CustomBarChart;