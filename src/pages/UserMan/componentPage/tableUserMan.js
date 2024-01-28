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
import { useNavigate } from "react-router-dom";
const MyTable = () => {
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();

  const handleRedirect = (path) => {
    navigate(path);
  };
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

  const handleEdit = (id) => {};
  const handleDelete = (id) => {};

  
  // test mock
  const row = [
    {
      id: 1,
      equipment_name: "ฟุตบอล",
      quantity: 25,
      equipment_equipment_type: "New York",
      status: "พร้อมใช้",
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
      status: "พร้อมใช้",
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
            <TableCell>ชื่อ</TableCell>
            <TableCell>ชื่อผู้ใช้</TableCell>
            <TableCell>รหัสผ่าน</TableCell>
            <TableCell>สถานะ</TableCell>
            <TableCell>อัพเดตล่าสุด</TableCell>
            <TableCell>หมายเหตุ</TableCell>
            <TableCell>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleRedirect("/4/add")}
              >
                เพิ่มข้อมูล
              </Button>
            </TableCell>
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
