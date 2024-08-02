import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from 'recharts';
import { useRecoilState } from "recoil";
import {barChartState} from "../../../Recoils/AdminRecoil/ReportRecoil"

const CustomBarChart = () => {
  const [rows, setRows] = useRecoilState(barChartState);

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

  // Process and group the data
  const processData = () => {
    const groupedData = rows.reduce((acc, item) => {
      const name = item.equipment_name;
      const quantity = parseInt(item.quantity_data, 10) || 0;
      
      if (!acc[name]) {
        acc[name] = 0;
      }
      acc[name] += quantity;
      
      return acc;
    }, {});

    return Object.entries(groupedData)
      .map(([name, จำนวน]) => ({ name, จำนวน }))
      .sort((a, b) => b.จำนวน - a.จำนวน)
      .slice(0, 10);  // Take only top 10 items
  };

  const barData = processData();

  console.log(barData);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={barData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="name" 
          interval={0}
          textAnchor="end"
          height={100}
          tick={{fontSize: 16}}
        />
        <YAxis label={{ value: 'จำนวนการยืม', angle: -90, position: 'insideLeft' }} />
        <Tooltip />
        <Legend />
        <Bar dataKey="จำนวน" fill="#8884d8" name="จำนวนการยืม">
          <LabelList dataKey="จำนวน" position="top" />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CustomBarChart;