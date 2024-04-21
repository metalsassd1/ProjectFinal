import React, { useState, useEffect } from "react";
import { PieChart, Pie, Tooltip, Legend } from "recharts";
import axios from "axios";

const CustomPieChart = () => {
  const [equipmentData, setEquipmentData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/home/management"
        );
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
    พร้อมใช้งาน: 0,
    ถูกยืม: 0,
    หายไป: 0,
  };

  equipmentData.forEach((item) => {
    if (item.status === "พร้อมใช้งาน") {
      statusCounts["พร้อมใช้งาน"] += 1;
    } else if (item.status === "ถูกยืม") {
      statusCounts["ถูกยืม"] += 1;
    } else if (item.status === "หายไป") {
      statusCounts["หายไป"] += 1;
    }
  });

  const pieData = Object.entries(statusCounts).map(([status, count]) => ({
    name: status,
    value: count,
  }));

  console.log("Pie Data:", pieData); // Debugging line

  return (
    <PieChart width={500} height={370}>
      <Pie
        dataKey="value"
        isAnimationActive={false}
        data={pieData}
        cx="50%"
        cy="50%"
        outerRadius={130}
        fill="#8884d8"
        label
      />
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default CustomPieChart;
