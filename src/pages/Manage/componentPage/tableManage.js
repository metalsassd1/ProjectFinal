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
          "http://localhost:4000/api/home/management"
        );
        setRows(response.data); // setRows เพื่ออัพเดท state rows
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // ในที่นี้ใส่ [] เพื่อให้ useEffect ทำงานเพียงครั้งเดียวเมื่อ component ถูก mount

  const getStatusColor = (status) => {
    switch (status) {
      case "พร้อมใช้งาน":
        return "green";
      case "ถูกยืม":
        return "orange";
      case "หายไป":
        return "red";
      default:
        return "gray";
    }
  };

  const handleEdit = (id) => {};
  const handleDelete = (id) => {};

  // test mock
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
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {row.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.equipment_name}</TableCell>
              <TableCell>{row.quantity}</TableCell>
              <TableCell>{row.equipment_equipment_type}</TableCell>
              <TableCell>{row.borrower_name}</TableCell>
              <TableCell>{row.loan_date}</TableCell>
              <TableCell>{row.return_date}</TableCell>
              <TableCell>
                <div
                  style={{
                    backgroundColor: getStatusColor(row.status),
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    display: "inline-block",
                    marginRight: "5px",
                  }}
                />
                {row.status}
              </TableCell>
              <TableCell style={{ backgroundColor: "" }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleEdit(row.id)}
                >
                  แก้ไข
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  style={{ marginLeft: 10 }}
                  onClick={() => handleDelete(row.id)}
                >
                  ลบ
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
