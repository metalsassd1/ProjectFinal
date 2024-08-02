import React, { useState, useEffect,useCallback } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Button,
  TextField,
} from "@mui/material";
import { useRecoilState } from "recoil";
import {
  tableRowsState,
  fileNameState,
  showInputBoxState,
  reportPageState,
  reportRowsPerPageState,
} from "../../../Recoils/AdminRecoil/ReportRecoil";
import { useResetReportStates } from "../../../Recoils/AdminRecoil/ReportStateReset";

const MyTable = ({ exportToExcel }) => {
  const [rows, setRows] = useRecoilState(tableRowsState);
  const [showInputBox, setShowInputBox] = useRecoilState(showInputBoxState);
  const [fileName, setFileName] = useRecoilState(fileNameState);
  const [page, setPage] = useRecoilState(reportPageState);
  const [rowsPerPage, setRowsPerPage] = useRecoilState(reportRowsPerPageState);
  const ResetReportStates = useResetReportStates();

  useEffect(() => {
    ResetReportStates();
    return () => ResetReportStates();
  },[]);
  const columnMapping = {
    id: "รหัส",
    equipment_name: "ชื่ออุปกรณ์",
    total_stock: "คลังคงเหลือ",
    quantity_data: "จำนวนที่ถูกยืมทั้งหมด",
    quantity_borrowed: "จำนวนที่ถูกยืม",
    equipment_type: "ประเภท",
    borrower_name: "ผู้ยืม",
    borrow_date: "วันที่ยืม",
    return_date: "วันที่คืน",
    loan_status: "สถานะ",
  };

  const formatDate = (dateString) => {
    if (!dateString) return "ไม่ระบุวันที่";
    const date = new Date(dateString);
    if (isNaN(date)) return "วันที่ไม่ถูกต้อง";
    return date.toLocaleDateString("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(
        "https://back-end-finals-project-vibo.onrender.com/api/home/management"
      );
      const formattedData = response.data.map((item) => {
        const newItem = {};
        Object.keys(item).forEach((key) => {
          const thaiKey = columnMapping[key] || key;
          newItem[thaiKey] = key.includes("date")
            ? formatDate(item[key])
            : item[key];
        });
        return newItem;
      });
      setRows(formattedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [setRows]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleExportClick = () => {
    setShowInputBox(true);
  };

  const handleFinalExport = () => {
    exportToExcel(rows, "ข้อมูลอุปกรณ์", fileName);
    setShowInputBox(false);
    setFileName("Report");
  };

  const handleCancel = () => {
    setShowInputBox(false);
    setFileName("Report");
  };

  const currentRows = rows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <>
      <TableContainer component={Paper}>
        <h2
          style={{
            textAlign: "center",
            backgroundColor: "#2c3e75",
            color: "#fff",
            margin: 0,
            padding: "15px",
            width: "100%",
            border: "1px solid black",
          }}
        >
          ตารางแสดงรายละเอียดการยืมอุปกรณ์
        </h2>
        <Table>
          <TableHead>
            <TableRow
              style={{ backgroundColor: "#2c3e75", border: "1px solid black" }}
            >
              {Object.values(columnMapping).map((header, index) => (
                <TableCell key={index} style={{ color: "#fff" }}>
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {currentRows.map((row, index) => (
              <TableRow key={index}>
                {Object.values(columnMapping).map((key, cellIndex) => (
                  <TableCell key={cellIndex}>{row[key]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
      {showInputBox && (
        <div style={{ margin: "20px", display: "flex" }}>
          <TextField
            label="ชื่อไฟล์"
            variant="outlined"
            size="small"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            style={{ marginRight: "10px" }}
          />
          <Button
            variant="contained"
            onClick={handleFinalExport}
            style={{ marginRight: "10px", backgroundColor: "#2c3e75" }}
          >
            ยืนยัน
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleCancel}>
            ยกเลิก
          </Button>
        </div>
      )}
      {!showInputBox && (
        <div style={{ margin: "20px", display: "flex" }}>
          <Button
            variant="contained"
            style={{ backgroundColor: "#2c3e75" }}
            onClick={handleExportClick}
          >
            Export to Excel
          </Button>
        </div>
      )}
    </>
  );
};

export default MyTable;
