import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const MyTable = () => {
  const rows = [
    { id: 1, Ename: "ฟุตบอล", item: 25, type: "New York", borrower: "John Doe", borrowDate: "2023-01-01", returnDate: "2023-01-10", status: "Returned" },
    { id: 1, Ename: "ฟุตบอล", item: 25, type: "New York", borrower: "John Doe", borrowDate: "2023-01-01", returnDate: "2023-01-10", status: "Returned" },
    { id: 1, Ename: "ฟุตบอล", item: 25, type: "New York", borrower: "John Doe", borrowDate: "2023-01-01", returnDate: "2023-01-10", status: "Returned" },
    { id: 1, Ename: "ฟุตบอล", item: 25, type: "New York", borrower: "John Doe", borrowDate: "2023-01-01", returnDate: "2023-01-10", status: "Returned" },
    { id: 1, Ename: "ฟุตบอล", item: 25, type: "New York", borrower: "John Doe", borrowDate: "2023-01-01", returnDate: "2023-01-10", status: "Returned" },
    { id: 1, Ename: "ฟุตบอล", item: 25, type: "New York", borrower: "John Doe", borrowDate: "2023-01-01", returnDate: "2023-01-10", status: "Returned" },
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
            <TableCell>ผุ้ยืม</TableCell>
            <TableCell>วันที่ยืม</TableCell>
            <TableCell>วันที่คืน</TableCell>
            <TableCell>สถานะ</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.age}</TableCell>
              <TableCell>{row.city}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.age}</TableCell>
              <TableCell>{row.city}</TableCell>
              <TableCell>{row.city}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MyTable;
