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
  TextField,
  Box,
  Typography,
  useMediaQuery,
  useTheme
} from "@mui/material";

const TableHistory = () => {
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    fetchData();
  }, []);

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
    } catch (error) {
      console.error("Error fetching data:", error);
    }
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

  const filterData = () => {
    const filtered = rows.filter(item => 
      item.identifier_number && item.identifier_number.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRows(filtered);
    setShowResults(true);
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

  const renderMobileView = () => (
    <Box>
      {filteredRows.map((row) => (
        <Paper key={row.id} elevation={2} sx={{ mb: 2, p: 2 }}>
          <Typography variant="subtitle1"><strong>ID:</strong> {row.id}</Typography>
          <Typography variant="body2"><strong>ชื่ออุปกรณ์:</strong> {row.equipment_name}</Typography>
          <Typography variant="body2"><strong>ผู้ยืม:</strong> {row.borrower_name}</Typography>
          <Typography variant="body2"><strong>เลขประจำตัว:</strong> {row.identifier_number || 'N/A'}</Typography>
          <Typography variant="body2"><strong>วันที่ยืม:</strong> {row.borrow_date}</Typography>
          <Typography variant="body2"><strong>วันที่คืน:</strong> {row.return_date}</Typography>
          <Box sx={{ mt: 1, p: 1, ...getStatusColor(row.loan_status) }}>
            <Typography variant="body2"><strong>สถานะ:</strong> {row.loan_status || ""}</Typography>
          </Box>
        </Paper>
      ))}
    </Box>
  );

  const renderDesktopView = () => (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow style={{backgroundColor: "#4CAF50"}}>
            <TableCell style={{ color: "#fff" }}>ID</TableCell>
            <TableCell style={{ color: "#fff" }}>ชื่ออุปกรณ์</TableCell>
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
              <TableCell>{row.borrower_name}</TableCell>
              <TableCell>{row.identifier_number || 'N/A'}</TableCell>
              <TableCell>{row.borrow_date}</TableCell>
              <TableCell>{row.return_date}</TableCell>
              <TableCell style={getStatusColor(row.loan_status)}>
                {row.loan_status || ""}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <Box sx={{ mt: 2 }}>
      <Box component="form" sx={{ mb: 2, display: 'flex', gap: 2, flexDirection: isMobile ? 'column' : 'row' }}>
        <TextField
          fullWidth
          label="ค้นหาด้วยเลขประจำตัว"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <Button variant="contained" color="primary" onClick={filterData}>
          ค้นหา
        </Button>
      </Box>
      
      {showResults && (
        <>
          <Typography variant="h6" sx={{ mb: 2 }}>ผลการค้นหา</Typography>
          {isMobile ? renderMobileView() : renderDesktopView()}
        </>
      )}
    </Box>
  );
};

export default TableHistory;