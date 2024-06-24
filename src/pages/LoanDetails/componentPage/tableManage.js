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
import EditModal from "../../../components/modalComponent/EditPageLoanEdit";

const MyTable = ({ searchTerms }) => {
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [selectedLoD, setSelectedLoD] = useState(null);
  const [modalEditOpen, setModalEditOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterData();
  }, [rows, searchTerms]);

  const handleEditOpen = (row) => {
    setSelectedLoD(row);
    setModalEditOpen(true);
  };

  const handleEditClose = () => {
    setModalEditOpen(false);
    fetchData();
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No date provided';
    const date = new Date(dateString);
    if (isNaN(date)) return 'Invalid date';
    return date.toLocaleDateString("TH", {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  const fetchData = async () => {
    try {
      const response = await axios.get("https://back-end-finals-project-pgow.onrender.com/api/home/management");
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

  const filterData = () => {
    const filtered = rows.filter(item =>
      item.id.toString().toLowerCase().includes(searchTerms.id.toLowerCase()) &&
      item.equipment_name.toLowerCase().includes(searchTerms.equipment_name.toLowerCase()) &&
      item.equipment_type.toLowerCase().includes(searchTerms.equipment_type.toLowerCase()) &&
      item.borrower_name.toLowerCase().includes(searchTerms.borrower_name.toLowerCase()) &&
      item.borrow_date.toLowerCase().includes(searchTerms.borrow_date.toLowerCase()) // เพิ่มเงื่อนไขสำหรับค้นหาด้วยวันที่ยืม
    );
    setFilteredRows(filtered);
  };

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm("คุณต้องการลบข้อมูลนี้ใช่หรือไม่?");
    if (isConfirmed) {
      try {
        await axios.delete(`https://back-end-finals-project-pgow.onrender.com/api/manage/delete/${id}`);
        fetchData();
      } catch (error) {
        console.error("Error deleting data:", error);
      }
    }
  };

  const getStatusColor = (loan_status) => {
    switch (loan_status) {
      case "คืน": return "#32CD32";
      case "ยืม": return "#FFA500";
      default: return "#D3D3D3";
    }
  };

  const getRowStyle_Stock = (quantityInStock) => {
    return { backgroundColor: "#D3D3D3" };
  };

  const getRowStyle_borrowed = (quantity_borrowed) => {
    return quantity_borrowed > 0 ? { backgroundColor: "#FFA500" } : { backgroundColor: "#D3D3D3" };
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
            <TableCell>สถานะ</TableCell>
            <TableCell>การดำเนินการ</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredRows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.equipment_name}</TableCell>
              <TableCell style={getRowStyle_Stock(row.total_stock)}>{row.total_stock}</TableCell>
              <TableCell>{row.quantity_data}</TableCell>
              <TableCell style={getRowStyle_borrowed(row.quantity_borrowed)}>{row.quantity_borrowed}</TableCell>
              <TableCell>{row.equipment_type}</TableCell>
              <TableCell>{row.borrower_name}</TableCell>
              <TableCell>{row.borrow_date}</TableCell>
              <TableCell>{row.return_date}</TableCell>
              <TableCell style={{ backgroundColor: getStatusColor(row.loan_status) }}>{row.loan_status || ''}</TableCell>
              <TableCell>
                <Button variant="contained" color="primary" onClick={() => handleEditOpen(row)}>
                  Edit
                </Button>
                <Button variant="contained" color="secondary" style={{ marginLeft: 10 }} onClick={() => handleDelete(row.id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {selectedLoD && (
        <EditModal
          open={modalEditOpen}
          handleClose={handleEditClose}
          loanData={selectedLoD}
          label={"ข้อมูลการยืม"}
        />
      )}
    </TableContainer>
  );
};

export default MyTable;
