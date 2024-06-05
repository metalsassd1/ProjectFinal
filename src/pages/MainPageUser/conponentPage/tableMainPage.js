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
  TextField,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const MyTable = () => {
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/home/eqloan");
      const updatedData = response.data.map(item => ({
        ...item,
        desired_quantity: 0,
      }));
      setRows(updatedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleIncrement = (equipmentName) => {
    setRows(currentRows => currentRows.map(row => {
      if (row.equipment_name === equipmentName && row.desired_quantity >= 0 ) {
        if(row.max_quantity_in_stock > 0){
          return {
            ...row,
            desired_quantity: row.desired_quantity + 1,
            max_quantity_in_stock: row.max_quantity_in_stock - 1
          };
        }
      }
      return row;
    }));
  };
  

  const handleDecrement = (equipmentName) => {
    setRows(currentRows => currentRows.map(row => {
      if (row.equipment_name === equipmentName && row.desired_quantity > 0) {
        return { ...row, desired_quantity: row.desired_quantity - 1,
          max_quantity_in_stock: row.max_quantity_in_stock + 1 };
      }
      return row;
    }));
  };

  return (
    <TableContainer component={Paper}>
      <h2 style={{ textAlign: "center" }}>Equipment Details Table</h2>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ชื่ออุปกรณ์</TableCell>
            <TableCell>จำนวนคงเหลือ</TableCell>
            <TableCell>ประเภท</TableCell>
            <TableCell>จำนวนที่ถูกยืมทั้งหมด</TableCell>
            <TableCell>จำนวนที่ต้องการยืม</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.equipment_name}> {/* Use equipment_name as key */}
              <TableCell>{row.equipment_name}</TableCell>
              <TableCell>{row.max_quantity_in_stock}</TableCell>
              <TableCell>{row.equipment_type}</TableCell>
              <TableCell>{row.total_quantity_borrowed}</TableCell>
              <TableCell>
                <Button onClick={() => handleDecrement(row.equipment_name)}>-</Button>
                <TextField
                  value={row.desired_quantity}
                  type="number"
                  inputProps={{ style: { textAlign: "center" }, min: 0 }}
                  style={{ margin: "0 10px", width: "60px" }}
                  disabled
                />
                <Button onClick={() => handleIncrement(row.equipment_name)}>+</Button>
              </TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate(
                    `/borrower/${row.equipment_name}/${row.equipment_type}/${row.desired_quantity}`
                  )}
                >
                  ยืม
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MyTable;
