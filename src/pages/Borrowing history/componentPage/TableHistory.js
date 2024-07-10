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

const MyTable = ({  }) => {
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [selectedLoD, setSelectedLoD] = useState(null);
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [searchTerms, setSearchTerms] = useState({
    identifier_number: "",
  });
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

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
      const response = await axios.get("https://back-end-finals-project-vibo.onrender.com/api/home/management");
      const formattedData = response.data.map(item => ({
        ...item,
        borrow_date: formatDate(item.borrow_date),
        return_date: formatDate(item.return_date),
        identifier_number: item.identifier_number ? item.identifier_number.trim() : ''
      }));
      setRows(formattedData);
      console.log('Fetched data:', formattedData); // เพิ่ม log นี้
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const filterData = () => {
    const searchTerm = searchTerms.identifier_number.toLowerCase().trim();
    const filtered = rows.filter(item => {
      if (!item.identifier_number) return false;
      const itemValue = item.identifier_number.toLowerCase().trim();
      return itemValue.includes(searchTerm);
    });
    setFilteredRows(filtered);
    setShowResults(true);
    
    // เพิ่ม log เพื่อตรวจสอบ
    console.log('Search term:', searchTerm);
    console.log('Filtered rows:', filtered);
  };

  const getStatusColor = (loan_status) => {
    switch (loan_status) {
      case "คืน":
        return { backgroundColor: "#556cca", color: "#ffffff" };
      case "ยืม":
        return { backgroundColor: "#32CD32", color: "#ffffff" };
      default:
        return { backgroundColor: "#FF4500", color: "#ffffff" };
    }
  };

  const handleSearch = (field, value) => {
    setSearchTerms(prev => ({ ...prev, [field]: value }));
  };
  
  return (
    <>
      <Box component="form" className="search-container" noValidate autoComplete="off">
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6} md={3}>
          <TextField
  fullWidth
  label="ค้นหาด้วยเลขประจำตัว"
  variant="outlined"
  size="small"
  value={searchTerms.identifier_number}
  onChange={(e) => handleSearch("identifier_number", e.target.value)}
  InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button variant="contained" color="primary" onClick={filterData}>
              ค้นหา
            </Button>
          </Grid>
        </Grid>
      </Box>
      
      {showResults && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow style={{backgroundColor: "#556cca", border:"1px solid black", width: "100%" }}>
                <TableCell style={{ color: "#fff" }}>ID</TableCell>
                <TableCell style={{ color: "#fff" }}>ชื่ออุปกรณ์</TableCell>
                <TableCell style={{ color: "#fff" }}>คลังคงเหลือ</TableCell>
                <TableCell style={{ color: "#fff" }}>จำนวนที่ถูกยืมทั้งหมด</TableCell>
                <TableCell style={{ color: "#fff" }}>จำนวนที่ถูกยืม</TableCell>
                <TableCell style={{ color: "#fff" }}>ประเภท</TableCell>
                <TableCell style={{ color: "#fff" }}>ผู้ยืม</TableCell>
                <TableCell style={{ color: "#fff" }}>เลขประจำตัว</TableCell>
                <TableCell style={{ color: "#fff" }}>วันที่ยืม</TableCell>
                <TableCell style={{ color: "#fff" }}>วันที่คืน</TableCell>
                <TableCell style={{ color: "#fff" }}>สถานะ</TableCell>
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
                  <TableCell>{row.identifier_number || 'N/A'}</TableCell>
                  <TableCell>{row.borrower_name}</TableCell>
                  <TableCell>{row.borrow_date}</TableCell>
                  <TableCell>{row.return_date}</TableCell>
                  <TableCell
                    style={getStatusColor(row.loan_status)}
                  >
                    {row.loan_status || ""}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      
      {selectedLoD && (
        <EditModal
          open={modalEditOpen}
          handleClose={handleEditClose}
          loanData={selectedLoD}
          label={"ข้อมูลการยืม"}
        />
      )}
    </>
  );
};

export default MyTable;
