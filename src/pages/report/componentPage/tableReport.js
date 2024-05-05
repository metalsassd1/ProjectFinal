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
  TextField
} from "@mui/material";


const MyTable = ({exportToExcel}) => {
  const [rows, setRows] = useState([]);
  const [showInputBox, setShowInputBox] = useState(false);
  const [fileName, setFileName] = useState('Report');
  const [resData,setResdata] = useState('');


  const formatDate = (dateString) => {
    if (!dateString) return 'No date provided'; // Handles null, undefined, or empty string
  
    const date = new Date(dateString);
    if (isNaN(date)) return 'Invalid date'; // Check if the date is invalid
  
    return date.toLocaleDateString("TH", {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/home/management"
      );
      const formattedData = response.data.map(item => ({
        ...item,
        borrow_date: formatDate(item.borrow_date),
        return_date: formatDate(item.return_date)
      }));
      setRows(formattedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
}, []); 

   // Handler to show the input box and initiate export process
   const handleExportClick = () => {
    setShowInputBox(true); 
  };

 

  // Handler for the final export action
  const handleFinalExport = () => {
    exportToExcel(rows, 'EquipmentData', fileName);
    setShowInputBox(false); // Hide input box after export
    setFileName('Report'); 
  };

  // Handler to cancel the export process
  const handleCancel = () => {
    setShowInputBox(false); // Hide input box
    setFileName('Report'); 
  };
  
  return (
    <TableContainer component={Paper}>
      <h2 style={{ textAlign: "center" }}>
        ตารางแสดงรายละเอียดอุปกรณ์ที่มีการยืมล่าสุด
      </h2>
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
            <TableCell>สถานะ</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.equipment_name}</TableCell>
              <TableCell>{row.total_stock}</TableCell>
              <TableCell>{row.quantity_data}</TableCell>
              <TableCell>{row.quantity_borrowed}</TableCell>
              <TableCell>{row.equipment_type}</TableCell>
              <TableCell>{row.borrower_name}</TableCell>
              <TableCell>{row.borrow_date}</TableCell>
              <TableCell>{row.return_date}</TableCell>
              <TableCell>{row.loan_status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {showInputBox && (
        <div>
          <TextField
            label="ชื่อไฟล์"
            variant="outlined"
            size="small"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)} // Update fileName on change
            style={{ marginRight: '10px' }}
          />
          <Button variant="contained" color="primary" onClick={handleFinalExport} style={{ marginRight: '10px' }}>
            ยืนยัน
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleCancel}>
            ยกเลิก
          </Button>
        </div>
      )}
      {!showInputBox && (
        <Button onClick={handleExportClick}>Export to Excel</Button>
      )}
    </TableContainer>
  );
};

export default MyTable;
