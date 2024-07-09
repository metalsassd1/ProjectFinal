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

  const columnMapping = {
    'id': 'รหัส',
    'equipment_name': 'ชื่ออุปกรณ์',
    'total_stock': 'คลังคงเหลือ',
    'quantity_data': 'จำนวนที่ถูกยืมทั้งหมด',
    'quantity_borrowed': 'จำนวนที่ถูกยืม',
    'equipment_type': 'ประเภท',
    'borrower_name': 'ผู้ยืม',
    'borrow_date': 'วันที่ยืม',
    'return_date': 'วันที่คืน',
    'loan_status': 'สถานะ'
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'ไม่ระบุวันที่';
    const date = new Date(dateString);
    if (isNaN(date)) return 'วันที่ไม่ถูกต้อง';
    return date.toLocaleDateString("th-TH", {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://back-end-finals-project-vibo.onrender.com/api/home/management"
      );
      const formattedData = response.data.map(item => {
        const newItem = {};
        Object.keys(item).forEach(key => {
          const thaiKey = columnMapping[key] || key;
          newItem[thaiKey] = key.includes('date') ? formatDate(item[key]) : item[key];
        });
        return newItem;
      });
      setRows(formattedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleExportClick = () => {
    setShowInputBox(true);
  };

  const handleFinalExport = () => {
    exportToExcel(rows, 'ข้อมูลอุปกรณ์', fileName);
    setShowInputBox(false);
    setFileName('Report');
  };

  const handleCancel = () => {
    setShowInputBox(false);
    setFileName('Report');
  };
  
  return (
    <TableContainer component={Paper}>
      <h2 style={{ 
        textAlign: "center", 
        backgroundColor: "#2c3e75",
        color: "#fff",
        margin: 0,
        padding: "15px",
        width: "100%",
        border: "1px solid black"
      }}>
        ตารางแสดงรายละเอียดการยืมอุปกรณ์
      </h2>
      <Table>
        <TableHead>
          <TableRow style={{ backgroundColor: "#2c3e75", border: "1px solid black" }}>
            {Object.values(columnMapping).map((header, index) => (
              <TableCell key={index} style={{ color: "#fff" }}>{header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              {Object.values(columnMapping).map((key, cellIndex) => (
                <TableCell key={cellIndex}>{row[key]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {showInputBox && (
        <div style={{ margin: '20px', display: 'flex' }}>
          <TextField
            label="ชื่อไฟล์"
            variant="outlined"
            size="small"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            style={{ marginRight: '10px' }}
          />
          <Button variant="contained" onClick={handleFinalExport} style={{ marginRight: '10px',backgroundColor: "#2c3e75" }}>
            ยืนยัน
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleCancel}>
            ยกเลิก
          </Button>
        </div>
      )}  
      {!showInputBox && (
        <div style={{ margin: '20px', display: 'flex' }}>
          <Button variant="contained" style={{ backgroundColor: "#2c3e75"}} onClick={handleExportClick}>
            Export to Excel
          </Button>
        </div>
      )}
    </TableContainer>
  );
};

export default MyTable;