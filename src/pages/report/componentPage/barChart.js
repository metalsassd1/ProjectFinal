import React,{useEffect,useState} from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

  const CustomBarChart = () => {
    // Assuming you want to show the quantity of equipment in the BarChart
    
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
      
      const barData = rows.map((item) => ({
        name: item.equipment_name,
        quantity: item.quantity_borrowed,
      }));

      
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
  