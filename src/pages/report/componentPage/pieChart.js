import React from 'react';
import { PieChart, Pie, Tooltip, Legend } from 'recharts';

const row = [
    {
      id: 1,
      equipment_name: "ฟุตบอล",
      quantity: 25,
      equipment_equipment_type: "New York",
      status: "พร้อมใช้งาน",
      borrower_name: "คฤจพัชหัสฤทัย คชามาสผจญ",
      loan_date: "10/12/23",
      return_date: "1/10/27",
    },
    {
      id: 2,
      equipment_name: "ฟุตบอล",
      quantity: 30,
      equipment_equipment_type: "Los Angeles",
      status: "ถูกยืม",
      borrower_name: "คฤจพัชหัสฤทัย คชามาสผจญ",
      loan_date: "10/12/23",
      return_date: "1/10/27",
    },
    {
      id: 3,
      equipment_name: "ฟุตบอล",
      quantity: 22,
      equipment_equipment_type: "Chicago",
      status: "",
      borrower_name: "คฤจพัชหัสฤทัย คชามาสผจญ",
      loan_date: "10/12/23",
      return_date: "1/10/27",
    },
    {
      id: 4,
      equipment_name: "ฟุตบอล",
      quantity: 30,
      equipment_equipment_type: "Los Angeles",
      status: "ถูกยืม",
      borrower_name: "คฤจพัชหัสฤทัย คชามาสผจญ",
      loan_date: "10/12/23",
      return_date: "1/10/27",
    },
    {
      id: 5,
      equipment_name: "ฟุตบอล",
      quantity: 22,
      equipment_equipment_type: "Chicago",
      status: "หายไป",
      borrower_name: "คฤจพัชหัสฤทัย คชามาสผจญ",
      loan_date: "10/12/23",
      return_date: "1/10/27",
    },
    {
      id: 6,
      equipment_name: "ฟุตบอล",
      quantity: 30,
      equipment_equipment_type: "Los Angeles",
      status: "พร้อมใช้งาน",
      borrower_name: "คฤจพัชหัสฤทัย คชามาสผจญ",
      loan_date: "10/12/23",
      return_date: "1/10/27",
    },
    {
      id: 7,
      equipment_name: "ฟุตบอล",
      quantity: 22,
      equipment_equipment_type: "Chicago",
      status: "ถูกยืม",
      borrower_name: "คฤจพัชหัสฤทัย คชามาสผจญ",
      loan_date: "10/12/23",
      return_date: "1/10/27",
    },
    {
      id: 8,
      equipment_name: "ฟุตบอล",
      quantity: 22,
      equipment_equipment_type: "Chicago",
      status: "",
      borrower_name: "คฤจพัชหัสฤทัย คชามาสผจญ",
      loan_date: "10/12/23",
      return_date: "1/10/27",
    },
  ];
  const CustomPieChart = () => {
    // Assuming you want to show the quantity of equipment in the PieChart
    const pieData = row.map((item) => ({
      name: item.equipment_name,
      value: item.quantity,
    }));
  
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
  
