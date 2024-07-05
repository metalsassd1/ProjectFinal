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
  Grid,
  TextField,
  Box
} from "@mui/material";
import EditModal from "../../../components/modalComponent/EditPageLoanEdit";
import Swal from 'sweetalert2';

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
    const { isConfirmed } = await Swal.fire({
      title: "ต้องการดำเนินการหรือไม่?",
      text: "ลบข้อมูล",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ตกลง",
      cancelButtonText: "ยกเลิก"
    });
    if (isConfirmed) {
      try {
        await axios.delete(`https://back-end-finals-project-pgow.onrender.com/api/manage/delete/${id}`);
        fetchData();
        await Swal.fire({
          title: "ดำเนินการสำเร็จ!",
          text: "ลบข้อมูล",
          icon: "success",
          confirmButtonText: "ตกลง",
        });
      } catch (error) {
        console.error("Error deleting data:", error);
        await Swal.fire({
          title: "ดำเนินการไม่สำเร็จ!",
          text:
            "ไม่สามารถลบข้อมูลมูลได้: " +
            (error.response?.data?.message || error.message),
          icon: "error",
          confirmButtonText: "ตกลง",
        });
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
    <>
          <Box component="form" className="search-container" noValidate autoComplete="off">
    <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                label="ค้นหาด้วย ID"
                variant="outlined"
                size="small"
                value={searchTerms.id}
                onChange={(e) => handleSearch("id", e.target.value)}
                InputLabelProps={{ shrink: true }}

            />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                label="ค้นหาด้วยชื่ออุปกรณ์"
                variant="outlined"
                size="small"
                value={searchTerms.equipment_name}
                onChange={(e) => handleSearch("equipment_name", e.target.value)}
                InputLabelProps={{ shrink: true }}

              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                label="ค้นหาด้วยประเภท"
                variant="outlined"
                size="small"
                value={searchTerms.equipment_type}
                onChange={(e) => handleSearch("equipment_type", e.target.value)}
                InputLabelProps={{ shrink: true }}

              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                label="ค้นหาด้วยชื่อผู้ยืม"
                variant="outlined"
                size="small"
                value={searchTerms.borrower_name}
                onChange={(e) => handleSearch("borrower_name", e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                label="ค้นหาด้วยวันที่ยืม"
                variant="outlined"
                size="small"
                value={searchTerms.borrow_date}
                onChange={(e) => handleSearch("borrow_date", e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
          </Box>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow style={{backgroundColor: "#556cca"}}>
            <TableCell style={{ color: "#fff" }}>ID</TableCell>
            <TableCell style={{ color: "#fff" }}>ชื่ออุปกรณ์</TableCell>
            <TableCell style={{ color: "#fff" }}>คลังคงเหลือ</TableCell>
            <TableCell style={{ color: "#fff" }}>จำนวนที่ถูกยืมทั้งหมด</TableCell>
            <TableCell style={{ color: "#fff" }}>จำนวนที่ถูกยืม</TableCell>
            <TableCell style={{ color: "#fff" }}>ประเภท</TableCell>
            <TableCell style={{ color: "#fff" }}>ผู้ยืม</TableCell>
            <TableCell style={{ color: "#fff" }}>วันที่ยืม</TableCell>
            <TableCell style={{ color: "#fff" }}>วันที่คืน</TableCell>
            <TableCell style={{ color: "#fff" }}>สถานะ</TableCell>
            <TableCell style={{ color: "#fff" }}>การดำเนินการ</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredRows.map((row) => (
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
              <TableCell style={{ backgroundColor: getStatusColor(row.loan_status) }}>{row.loan_status || ''}</TableCell>
              <TableCell>
                <Button variant="contained" color="primary" onClick={() => handleEditOpen(row)}>
                  แก้ไข
                </Button>
                <Button variant="contained" color="secondary" style={{ marginLeft: 10 }} onClick={() => handleDelete(row.id)}>
                  ลบ
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
    </>
  );
};

export default MyTable;
