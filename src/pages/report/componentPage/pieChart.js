import React, { useState, useEffect } from "react";
import { PieChart, Pie, Tooltip, Legend, Cell } from "recharts";
import axios from "axios";

const CustomPieChart = () => {
  const [equipmentData, setEquipmentData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://back-end-finals-project-vibo.onrender.com/api/home/management");
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
    'ถูกยืม': { count: 0, color: '#ff7300' }, // Orange
    'รออนุมัติ': { count: 0, color: '#FFA500' }, // Yellow
    'อื่นๆ': { count: 0, color: '#8884d8' }, // Purple for any other status
  };

  equipmentData.forEach((item) => {
    switch (item.loan_status) {
      case "คืน":
        statusCounts['พร้อมใช้งาน'].count += 1;
        break;
      case "ยืม":
        statusCounts['ถูกยืม'].count += 1;
        break;
      case "รออนุมัติ":
        statusCounts['รออนุมัติ'].count += 1;
        break;
      default:
        statusCounts['อื่นๆ'].count += 1;
        break;
    }
  });

  const pieData = Object.entries(statusCounts)
    .filter(([_, data]) => data.count > 0) // Only include statuses with count > 0
    .map(([name, data]) => ({
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