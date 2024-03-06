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
  Button,
} from "@mui/material";

const MyTable = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/manage/table"
        );
        setRows(response.data); // setRows to update the state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // useEffect with [] to fetch data only once when the component mounts

  const getStatusColor = (loan_status) => {
    switch (loan_status) {
      case "Returned":
        return "green";
      case "Borrowed":
        return "orange";
      default:
        return "gray";
    }
  };

  const handleEdit = (id) => {
    // Implement edit functionality using id
  };

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm("คุณต้องการลบข้อมูลนี้ใช่หรือไม่?");

    if (isConfirmed) {
      try {
        await axios.delete(`http://localhost:4000/api/manage/delete/${id}`);
        // หลังจากลบข้อมูลสำเร็จ สามารถทำการ fetch ข้อมูลใหม่เพื่ออัปเดตหน้าตาราง
        const response = await axios.get(
          "http://localhost:4000/api/manage/table"
        );
        setRows(response.data);
      } catch (error) {
        console.error("Error deleting data:", error);
      }
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>ชื่ออุปกรณ์</TableCell>
            <TableCell>จำนวน</TableCell>
            <TableCell>ประเภท</TableCell>
            <TableCell>ผู้ยืม</TableCell>
            <TableCell>วันที่ยืม</TableCell>
            <TableCell>วันที่คืน</TableCell>
            <TableCell>สถานะ</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.loan_id}</TableCell>
              <TableCell>{row.equipment_name}</TableCell>
              <TableCell>{row.quantity_borrowed}</TableCell>
              <TableCell>{row.equipment_type}</TableCell>
              <TableCell>{row.borrower_name}</TableCell>
              <TableCell>{row.borrow_date}</TableCell>
              <TableCell>{row.return_date}</TableCell>
              <TableCell>
                <div
                  style={{
                    backgroundColor: getStatusColor(row.loan_status),
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    display: "inline-block",
                    marginRight: "5px",
                  }}
                />
                {row.loan_status}
              </TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleEdit(row.id)}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  style={{ marginLeft: 10 }}
                  onClick={() => handleDelete(row.id)}
                >
                  Delete
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
