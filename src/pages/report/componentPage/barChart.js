import React,{useEffect,useState} from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

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

  const CustomBarChart = () => {
    // Assuming you want to show the quantity of equipment in the BarChart
    const barData = row.map((item) => ({
      name: item.equipment_name,
      quantity: item.quantity,
    }));
  
    const [rows, setRows] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            "http://localhost:4000/api/home/management"
          );
          setRows(response.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
  
      fetchData();
    }, []); // ในที่นี้ใส่ [] เพื่อให้ useEffect ทำงานเพียงครั้งเดียวเมื่อ component ถูก mount

    console.log(rows)
    return (
      <BarChart width={700} height={350} data={barData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="quantity" fill="#8884d8" />
      </BarChart>
    );
  };
  
  export default CustomBarChart;
  