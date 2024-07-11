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
  Box,
  Checkbox,
  TablePagination,
} from "@mui/material";
import EditModal from "../../../components/modalComponent/EditPageLoanEdit";
import Swal from "sweetalert2";

const MyTable = () => {
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [selectedLoD, setSelectedLoD] = useState(null);
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [searchTerms, setSearchTerms] = useState({
    id: "",
    equipment_name: "",
    equipment_type: "",
    borrower_name: "",
    borrow_date: "",
  });
  const [selectedIds, setSelectedIds] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

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
    if (!dateString) return "No date provided";
    const date = new Date(dateString);
    if (isNaN(date)) return "Invalid date";
    return date.toLocaleDateString("TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://back-end-finals-project-vibo.onrender.com/api/home/management"
      );
      const formattedData = response.data.map((item) => ({
        ...item,
        borrow_date: formatDate(item.borrow_date),
        return_date: formatDate(item.return_date),
      }));
      setRows(formattedData);
      setFilteredRows(formattedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const filterData = () => {
    const filtered = rows.filter((item) => {
      const idMatch =
        item.id != null
          ? item.id
              .toString()
              .toLowerCase()
              .includes(searchTerms.id.toLowerCase())
          : true;
      const equipmentNameMatch = item.equipment_name
        ? item.equipment_name
            .toLowerCase()
            .includes(searchTerms.equipment_name.toLowerCase())
        : true;
      const equipmentTypeMatch = item.equipment_type
        ? item.equipment_type
            .toLowerCase()
            .includes(searchTerms.equipment_type.toLowerCase())
        : true;
      const borrowerNameMatch = item.borrower_name
        ? item.borrower_name
            .toLowerCase()
            .includes(searchTerms.borrower_name.toLowerCase())
        : true;
      const borrowDateMatch = item.borrow_date
        ? item.borrow_date
            .toLowerCase()
            .includes(searchTerms.borrow_date.toLowerCase())
        : true;

      return (
        idMatch &&
        equipmentNameMatch &&
        equipmentTypeMatch &&
        borrowerNameMatch &&
        borrowDateMatch
      );
    });
    setFilteredRows(filtered);
  };
console.log(rows);
  const handleDelete = async () => {
    if (selectedIds.length === 0) {
      return;
    }
    const { isConfirmed } = await Swal.fire({
      title: "ต้องการดำเนินการหรือไม่?",
      text: `ลบข้อมูล ${selectedIds.length} รายการ`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ตกลง",
      cancelButtonText: "ยกเลิก",
    });
    if (isConfirmed) {
      try {
        await Promise.all(
          selectedIds.map((id) =>
            axios.delete(`https://back-end-finals-project-vibo.onrender.com/api/manage/delete/${id}`)
          )
        );
        await Swal.fire({
          title: "ดำเนินการสำเร็จ!",
          text: "ลบข้อมูลเรียบร้อย",
          icon: "success",
          confirmButtonText: "ตกลง",
        });
        setSelectedIds([]);
        fetchData();
      } catch (error) {
        console.error("Error deleting data:", error);
        await Swal.fire({
          title: "ดำเนินการไม่สำเร็จ!",
          text:
            "ไม่สามารถลบข้อมูลได้: " +
            (error.response?.data?.message || error.message),
          icon: "error",
          confirmButtonText: "ตกลง",
        });
      }
    }
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

  const handleCheckboxChange = (event, id) => {
    if (event.target.checked) {
      setSelectedIds([...selectedIds, id]);
    } else {
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
    }
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedIds(currentRows.map((row) => row.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSearch = (field, value) => {
    setSearchTerms((prev) => ({ ...prev, [field]: value }));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const currentRows = filteredRows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <>
      <Box
        component="form"
        className="search-container"
        noValidate
        autoComplete="off"
      >
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
              style={{
                backgroundColor: "#2c3e75",
                border: "1px solid black",
                width: "100%",
              }}
            >
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={
                    selectedIds.length > 0 &&
                    selectedIds.length < currentRows.length
                  }
                  checked={
                    currentRows.length > 0 &&
                    selectedIds.length === currentRows.length
                  }
                  onChange={handleSelectAll}
                  style={{ color: "#fff" }}
                />
              </TableCell>
              <TableCell style={{ color: "#fff" }}>ID</TableCell>
              <TableCell style={{ color: "#fff" }}>ชื่ออุปกรณ์</TableCell>
              <TableCell style={{ color: "#fff" }}>คลังคงเหลือ</TableCell>
              <TableCell style={{ color: "#fff" }}>
                จำนวนที่ถูกยืมทั้งหมด
              </TableCell>
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
            {currentRows.map((row, index) => (
              <TableRow key={`${row.id}-${index}`}>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedIds.includes(row.id)}
                    onChange={(event) => handleCheckboxChange(event, row.id)}
                  />
                </TableCell>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.equipment_name}</TableCell>
                <TableCell>{row.total_stock}</TableCell>
                <TableCell>{row.quantity_data}</TableCell>
                <TableCell>{row.quantity_borrowed}</TableCell>
                <TableCell>{row.equipment_type}</TableCell>
                <TableCell>{row.borrower_name}</TableCell>
                <TableCell>{row.borrow_date}</TableCell>
                <TableCell>{row.return_date}</TableCell>
                <TableCell style={getStatusColor(row.loan_status)}>
                  {row.loan_status || ""}
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    style={{
                      backgroundColor: "#2c3e75",
                      border: "1px solid black",
                    }}
                    onClick={() => handleEditOpen(row)}
                  >
                    แก้ไข
                  </Button>
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
      {selectedIds.length > 0 && (
        <Button
          variant="contained"
          style={{
            backgroundColor: "#CC0033",
            color: "#fff",
            border: "1px solid black",
            margin: "10px",
          }}
          onClick={handleDelete}
        >
          ลบข้อมูล ({selectedIds.length})
        </Button>
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
