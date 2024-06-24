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
import Swal from "sweetalert2";

const MyTable = ({ searchTerms }) => {
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);

  const formatDate = (dateString) => {
    if (!dateString) return "No date provided";
    const date = new Date(dateString);
    if (isNaN(date)) return "Invalid date";
    return date.toLocaleDateString("TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterData();
  }, [rows, searchTerms]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://back-end-finals-project-pgow.onrender.com/api/home/management"
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

  const filterData = () => {
    const filtered = rows.filter(
      (item) =>
        item.id
          .toString()
          .toLowerCase()
          .includes(searchTerms.id.toLowerCase()) &&
        item.equipment_name
          .toLowerCase()
          .includes(searchTerms.equipment_name.toLowerCase()) &&
        item.equipment_type
          .toLowerCase()
          .includes(searchTerms.equipment_type.toLowerCase()) &&
        (item.borrower_name || "")
          .toLowerCase()
          .includes(searchTerms.borrower_name.toLowerCase()) &&
        item.borrow_date
          .toLowerCase()
          .includes(searchTerms.borrow_date.toLowerCase()) // เพิ่มเงื่อนไขการกรองตาม borrow_date
    );
    setFilteredRows(filtered);
  };

  const getStatusColor = (loan_status) => {
    switch (loan_status) {
      case "คืน":
        return "#32CD32";
      case "ยืม":
        return "#FFA500";
      default:
        return "#D3D3D3";
    }
  };

  const getRowStyle_Stock = (quantityInStock) => {
    return { backgroundColor: "#D3D3D3" };
  };

  const getRowStyle_borrowed = (quantity_borrowed) => {
    if (quantity_borrowed > 0) {
      return { backgroundColor: "#FFA500" };
    } else {
      return { backgroundColor: "#D3D3D3" };
    }
  };
  const handleReturn = async (data) => {
    const { isConfirmed } = await Swal.fire({
      title: "ต้องการดำเนินการหรือไม่?",
      text: "คืนอุปกรณ์",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ตกลง",
      cancelButtonText: "ยกเลิก",
    });

    const body = {
      id: data.id,
      equipment_name: data.equipment_name,
      quantity_borrowed: data.quantity_borrowed,
    };
    if (isConfirmed) {
      try {
        const response = await axios.put(
          "https://back-end-finals-project-pgow.onrender.com/api/Borrowed/return",
          body
        );
        Swal.fire({
          title: "ดำเนินการสำเร็จ!",
          text: "การคืน",
          icon: "success",
          confirmButtonText: "OK",
        });
      } catch (error) {
        console.error("Error processing return:", error);
        Swal.fire({
          title: "ดำเนินการไม่สำเร็จ!",
          text: "การคืน: " + (error.response?.data?.message || error.message),
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }
  };
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow style={{ backgroundColor: "#D3D3D3" }}>
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
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredRows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.equipment_name}</TableCell>
              <TableCell style={getRowStyle_Stock(row.total_stock)}>
                {row.total_stock}
              </TableCell>
              <TableCell>{row.quantity_data}</TableCell>
              <TableCell style={getRowStyle_borrowed(row.quantity_borrowed)}>
                {row.quantity_borrowed}
              </TableCell>
              <TableCell>{row.equipment_type}</TableCell>
              <TableCell>{row.borrower_name}</TableCell>
              <TableCell>{row.borrow_date}</TableCell>
              <TableCell>{row.return_date}</TableCell>
              <TableCell
                style={{ backgroundColor: getStatusColor(row.loan_status) }}
              >
                {row.loan_status || ""}
              </TableCell>
              <TableCell>
                {row.loan_status === "ยืม" && (
                  <button
                    className="qr-button"
                    onClick={() => handleReturn(row)}
                  >
                    คืน
                  </button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MyTable;
