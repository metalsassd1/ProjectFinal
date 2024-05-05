import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const MyTable = () => {
  const [rows, setRows] = useState([]);

  const formatDate = (dateString) => {
    if (!dateString) return "No date provided"; // Handles null, undefined, or empty string

    const date = new Date(dateString);
    if (isNaN(date)) return "Invalid date"; // Check if the date is invalid

    return date.toLocaleDateString("TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/home/management"
      );
      const formattedData = response.data.map((item) => ({
        ...item,
        borrow_date: formatDate(item.borrow_date),
        return_date: formatDate(item.return_date),
      }));
      setRows(formattedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getStatusColor = (loan_status) => {
    switch (loan_status) {
      case "คืน":
        return "#32CD32"; // Green color for returned items
      case "ยืม":
        return "#FFA500"; // Orange color for borrowed items
      default:
        return "#D3D3D3"; // Gray color for other statuses
    }
  };
  
  const getRowStyle_Stock = (quantityInStock) => {
    if (quantityInStock > 0 ) {
      return { backgroundColor: "#D3D3D3" }; 
    } else if(quantityInStock <= 0) {
      return { backgroundColor: "#D3D3D3" }; 
    }
  };

  const getRowStyle_borrowed = (quantity_borrowed) => {
    if (quantity_borrowed > 0) {
      return { backgroundColor: "#FFA500" }; 
    } else {
      return { backgroundColor: "#D3D3D3" }; 
    }
  };



  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
        <TableRow style={{backgroundColor: "#D3D3D3"}}>
            <TableCell>ID</TableCell>
            <TableCell>ชื่ออุปกรณ์</TableCell>
            <TableCell>คลังคงเหลือ</TableCell>
            <TableCell>จำนวนที่ถูกยืมทั้งหมด</TableCell>
            <TableCell>จำนวนที่ถูกยืม</TableCell>
            <TableCell>ประเภท</TableCell>
            <TableCell>ผู้ยืม</TableCell>
            <TableCell>วันที่ยืม</TableCell>
            <TableCell>วันที่คืน</TableCell>
            <TableCell >สถานะ</TableCell>
            <TableCell ></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.equipment_name}</TableCell>
              <TableCell style={getRowStyle_Stock(row.total_stock)}>
                {row.total_stock}
              </TableCell>
              <TableCell>{row.quantity_data}</TableCell>
              <TableCell style={getRowStyle_borrowed(row.quantity_borrowed)}
              >{row.quantity_borrowed}</TableCell>
              <TableCell>{row.equipment_type}</TableCell>
              <TableCell>{row.borrower_name}</TableCell>
              <TableCell>{row.borrow_date}</TableCell>
              <TableCell>{row.return_date}</TableCell>
              <TableCell style={{ backgroundColor: getStatusColor(row.loan_status) }}>
              {row.loan_status || ''}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MyTable;
