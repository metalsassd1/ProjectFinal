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
  useTheme,
  Alert,
  AlertTitle,
  Grid,
  TablePagination,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import InfoIcon from "@mui/icons-material/Info";
import { useRecoilState } from "recoil";
import {
  allRowsState,
  HistoryfilteredRowsState,
  HistorypageState,
  showResultsState,
  errorState,
  isSearchingState,
  HistoryrowsPerPageState,
  HistorysearchTermState
} from "../../../Recoils/UserRecoil/HistoryRecoil";

const TableHistory = () => {
  const [allRows, setAllRows] = useRecoilState(allRowsState);
  const [filteredRows, setFilteredRows] = useRecoilState(HistoryfilteredRowsState);
  const [searchTerm, setSearchTerm] = useRecoilState(HistorysearchTermState);
  const [showResults, setShowResults] = useRecoilState(showResultsState);
  const [error, setError] = useRecoilState(errorState);
  const [isSearching, setIsSearching] = useRecoilState(isSearchingState);
  const [page, setPage] = useRecoilState(HistorypageState);
  const [rowsPerPage, setRowsPerPage] = useRecoilState(HistoryrowsPerPageState);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://back-end-finals-project-vibo.onrender.com/api/home/management"
      );
      const formattedData = response.data.map((item, index) => ({
        ...item,
        borrow_date: formatDate(item.borrow_date),
        return_date: formatDate(item.return_date),
        identifier_number: item.identifier_number
          ? item.identifier_number.trim()
          : "",
        uniqueId: `${item.id}-${index}`, // Add a unique identifier
      }));
      setAllRows(formattedData);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("ไม่สามารถดึงข้อมูลได้ กรุณาลองใหม่อีกครั้ง");
    }
  };

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

  const filterData = () => {
    setError("");
    setIsSearching(true);

    if (!searchTerm.trim()) {
      setError("กรุณากรอกข้อมูลเพื่อค้นหา");
      setFilteredRows([]);
      setShowResults(false);
      setIsSearching(false);
      return;
    }

    const searchTermLower = searchTerm.toLowerCase().trim();
    const filtered = allRows.filter(
      (item) =>
        (item.identifier_number &&
          item.identifier_number.toLowerCase().includes(searchTermLower)) ||
        (item.borrower_name &&
          item.borrower_name.toLowerCase().includes(searchTermLower)) ||
        (item.equipment_name &&
          item.equipment_name.toLowerCase().includes(searchTermLower))
    );

    if (filtered.length === 0) {
      setError("ไม่พบข้อมูลที่ตรงกับคำค้นหา");
    }

    setFilteredRows(filtered);
    setShowResults(true);
    setIsSearching(false);
    setPage(0); // Reset to first page when filtering
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Get current rows for pagination
  const currentRows = filteredRows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const renderTableHeader = () => (
    <TableHead>
      <TableRow style={{ backgroundColor: "#4CAF50" }}>
        <TableCell style={{ color: "#fff" }}>ID</TableCell>
        <TableCell style={{ color: "#fff" }}>ชื่ออุปกรณ์</TableCell>
        <TableCell style={{ color: "#fff" }}>ผู้ยืม</TableCell>
        <TableCell style={{ color: "#fff" }}>เลขประจำตัว</TableCell>
        <TableCell style={{ color: "#fff" }}>วันที่ยืม</TableCell>
        <TableCell style={{ color: "#fff" }}>วันที่คืน</TableCell>
        <TableCell style={{ color: "#fff" }}>สถานะ</TableCell>
      </TableRow>
    </TableHead>
  );

  const renderDesktopView = () => (
    <>
      <TableContainer component={Paper}>
        <Table>
          {renderTableHeader()}
          <TableBody>
            {currentRows.map((row) => (
              <TableRow key={row.uniqueId}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.equipment_name}</TableCell>
                <TableCell>{row.borrower_name}</TableCell>
                <TableCell>{row.identifier_number || "N/A"}</TableCell>
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
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={filteredRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );

  const renderMobileView = () => (
    <>
      <Grid container spacing={2}>
        {currentRows.map((row) => (
          <Grid item xs={12} key={row.uniqueId}>
            <Paper elevation={2} sx={{ p: 2 }}>
              <Typography variant="subtitle1">
                <strong>ID:</strong> {row.id}
              </Typography>
              <Typography variant="body2">
                <strong>ชื่ออุปกรณ์:</strong> {row.equipment_name}
              </Typography>
              <Typography variant="body2">
                <strong>ผู้ยืม:</strong> {row.borrower_name}
              </Typography>
              <Typography variant="body2">
                <strong>เลขประจำตัว:</strong> {row.identifier_number || "N/A"}
              </Typography>
              <Typography variant="body2">
                <strong>วันที่ยืม:</strong> {row.borrow_date}
              </Typography>
              <Typography variant="body2">
                <strong>วันที่คืน:</strong> {row.return_date}
              </Typography>
              <Box sx={{ mt: 1, p: 1, ...getStatusColor(row.loan_status) }}>
                <Typography variant="body2">
                  <strong>สถานะ:</strong> {row.loan_status || ""}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={filteredRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );

  return (
    <Box sx={{ mt: 2 }}>
      <Box
        component="form"
        sx={{
          mb: 2,
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: 2,
          alignItems: "center",
        }}
      >
        <TextField
          fullWidth
          label="ค้นหาด้วยเลขประจำตัว, ชื่อผู้ยืม หรือชื่ออุปกรณ์"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputLabelProps={{ shrink: true }}
          InputProps={{
            endAdornment: <SearchIcon color="action" />,
          }}
        />
        <Box
          sx={{ display: "flex", gap: 2, width: isMobile ? "100%" : "auto" }}
        >
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate("/Mainpage")}
            fullWidth={isMobile}
          >
            กลับไปยังหน้าหลัก
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={filterData}
            fullWidth={isMobile}
            disabled={!searchTerm.trim() || isSearching}
            startIcon={<SearchIcon />}
          >
            {isSearching ? "กำลังค้นหา..." : "ค้นหา"}
          </Button>
        </Box>
      </Box>

      {error && (
        <Alert severity="info" sx={{ mb: 2 }} icon={<InfoIcon />}>
          <AlertTitle>ผลการค้นหา</AlertTitle>
          {error}
        </Alert>
      )}

      {showResults && filteredRows.length > 0 && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            ผลการค้นหา
          </Typography>
          {isMobile ? renderMobileView() : renderDesktopView()}
        </Box>
      )}
    </Box>
  );
};

export default TableHistory;