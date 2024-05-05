import React, { useState, useEffect } from "react";
import { PieChart, Pie, Tooltip, Legend, Cell } from "recharts";
import axios from "axios";

const CustomPieChart = () => {
  const [equipmentData, setEquipmentData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/home/management");
        console.log("Equipment Data:", response.data); // Debugging line
        setEquipmentData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (equipmentData.length === 0) return <p>Loading data...</p>; // Handling no data

  const statusCounts = {
    'พร้อมใช้งาน': { count: 0, color: '#32CD32' }, // Green
    'ถูกยืม': { count: 0, color: '#ff7300' }, // Blue
    'ไม่ได้ถูกใช้งาน': { count: 0, color: '#8884d8' }, // Orange
  };

  equipmentData.forEach((item) => {
    if (item.loan_status === "คืน") {
      statusCounts['พร้อมใช้งาน'].count += 1;
    } else if (item.loan_status === "ยืม") {
      statusCounts['ถูกยืม'].count += 1;
    } else if (item.loan_status === "") {
      statusCounts['ไม่ได้ถูกใช้งาน'].count += 1;
    }
  });

  const pieData = Object.entries(statusCounts).map(([name, data]) => ({
    name,
    value: data.count,
    color: data.color
  }));


  return (
    <PieChart width={500} height={370}>
      <Pie
        dataKey="value"
        isAnimationActive={false}
        data={pieData}
        cx="50%"
        cy="50%"
        outerRadius={160}
        label
      >
        {
          pieData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))
        }
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default CustomPieChart;
