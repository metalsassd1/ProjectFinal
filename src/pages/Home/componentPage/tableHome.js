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
  TablePagination,
  Checkbox,
  Button
} from "@mui/material";
import Swal from "sweetalert2";
import "./TableStyles.css";

const MyTable = ({ searchTerms }) => {
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedRows, setSelectedRows] = useState([]);

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

  const handleSelectRow = (row) => {
    const selectedIndex = selectedRows.findIndex((selectedRow) => selectedRow.id === row.id);
    let newSelectedRows = [];

    if (selectedIndex === -1) {
      newSelectedRows = [...selectedRows, row];
    } else {
      newSelectedRows = selectedRows.filter((selectedRow) => selectedRow.id !== row.id);
    }

    setSelectedRows(newSelectedRows);
  };

  const handleSelectAllRows = (event) => {
    if (event.target.checked) {
      const newSelectedRows = currentRows.filter(row => row.loan_status === "ยืม");
      setSelectedRows(newSelectedRows);
      return;
    }
    setSelectedRows([]);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log("searchTerms changed:", searchTerms);
    filterData();
  }, [rows, searchTerms]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://back-end-finals-project-vibo.onrender.com/api/home/management"
      );
      const formattedData = response.data.map((item, index) => ({
        ...item,
        borrow_date: formatDate(item.borrow_date),
        return_date: formatDate(item.return_date),
        uniqueId: item.id ? item.id : `generated-${index}`
      }));
      console.log("Fetched data:", formattedData);
      setRows(formattedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const filterData = () => {
    console.log("Filtering data with searchTerms:", searchTerms);
    const filtered = rows.filter(
      (item) =>
        item.id.toString().toLowerCase().includes(searchTerms.id.toLowerCase()) &&
        item.equipment_name.toLowerCase().includes(searchTerms.equipment_name.toLowerCase()) &&
        item.equipment_type.toLowerCase().includes(searchTerms.equipment_type.toLowerCase()) &&
        (item.borrower_name || "").toLowerCase().includes(searchTerms.borrower_name.toLowerCase()) &&
        item.borrow_date.toLowerCase().includes(searchTerms.borrow_date.toLowerCase())
    );
    console.log("Filtered rows:", filtered);
    setFilteredRows(filtered);
  };

  const getStatusStyle = (loan_status) => {
    switch (loan_status) {
      case "คืน":
        return { backgroundColor: "#556cca", color: "#ffffff" };
      case "ยืม":
        return { backgroundColor: "#32CD32", color: "#ffffff" };
      default:
        return { backgroundColor: "#FF4500", color: "#ffffff" };
    }
  };

  const handleReturn = async () => {
    if (selectedRows.length === 0) {
      Swal.fire({
        title: "ไม่มีรายการที่เลือก",
        text: "กรุณาเลือกรายการที่ต้องการคืน",
        icon: "warning",
        confirmButtonText: "ตกลง",
      });
      return;
    }

    const { isConfirmed } = await Swal.fire({
      title: "ต้องการดำเนินการหรือไม่?",
      text: `คืนอุปกรณ์ ${selectedRows.length} รายการ`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ตกลง",
      cancelButtonText: "ยกเลิก",
    });
  
    if (isConfirmed) {
      try {
        const returnData = selectedRows.map(row => ({
          id: row.id,
          equipment_name: row.equipment_name,
          quantity_borrowed: row.quantity_borrowed,
        }));
  
        const response = await axios.put(
          "https://back-end-finals-project-vibo.onrender.com/api/Borrowed/return",
          returnData
        );
  
        Swal.fire({
          title: "ดำเนินการสำเร็จ!",
          text: "การคืนอุปกรณ์เสร็จสมบูรณ์",
          icon: "success",
          confirmButtonText: "ตกลง",
        });
  
        fetchData();
        setSelectedRows([]);
      } catch (error) {
        console.error("Error processing return:", error);
        Swal.fire({
          title: "ดำเนินการไม่สำเร็จ!",
          text: "การคืน: " + (error.response?.data?.message || error.message),
          icon: "error",
          confirmButtonText: "ตกลง",
        });
      }
    }
  };

  const handleChangePage = (event, newPage) => {
    console.log("Page changed to:", newPage);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    console.log("Rows per page changed to:", newRowsPerPage);
    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };

  // Get current rows for pagination
  const currentRows = filteredRows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
  console.log("Current rows:", currentRows);

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
             <TableCell padding="checkbox">
              <Checkbox
                indeterminate={selectedRows.length > 0 && selectedRows.length < currentRows.filter(row => row.loan_status === "ยืม").length}
                checked={currentRows.filter(row => row.loan_status === "ยืม").length > 0 && selectedRows.length === currentRows.filter(row => row.loan_status === "ยืม").length}
                onChange={handleSelectAllRows}
                style={{ color: "#ffffff" }}
              />
            </TableCell>
            <TableCell style={{ color: "#ffffff" }}>ID</TableCell>
            <TableCell style={{ color: "#ffffff" }}>ชื่ออุปกรณ์</TableCell>
            <TableCell style={{ color: "#ffffff" }}>ประเภท</TableCell>
            <TableCell style={{ color: "#ffffff" }}>คลังทั้งหมด</TableCell>
            <TableCell style={{ color: "#ffffff" }}>จำนวนที่ถูกยืม</TableCell>
            <TableCell style={{ color: "#ffffff" }}>คลังคงเหลือ</TableCell>
            <TableCell style={{ color: "#ffffff" }}>
              จำนวนที่ถูกยืมทั้งหมด
            </TableCell>
            <TableCell style={{ color: "#ffffff" }}>ผู้ยืม</TableCell>
            <TableCell style={{ color: "#ffffff" }}>วันที่ยืม</TableCell>
            <TableCell style={{ color: "#ffffff" }}>วันที่คืน</TableCell>
            <TableCell style={{ color: "#ffffff" }}>สถานะ</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentRows.map((row, index) => {
            const isApproved = row.loan_status === "ยืม";
            const totalStock =
              row.total_stock + (isApproved ? row.quantity_borrowed : 0);

            const uniqueKey = `${row.uniqueId}-${index}`;

            return (
              <TableRow key={uniqueKey}>
                 <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedRows.some(selectedRow => selectedRow.id === row.id)}
                    onChange={() => handleSelectRow(row)}
                    disabled={row.loan_status !== "ยืม"}
                  />
                </TableCell>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.equipment_name}</TableCell>
                <TableCell>{row.equipment_type}</TableCell>
                <TableCell>{totalStock}</TableCell>
                <TableCell>{isApproved ? row.quantity_borrowed : 0}</TableCell>
                <TableCell>{row.total_stock}</TableCell>
                <TableCell>{row.quantity_data}</TableCell>
                <TableCell>{row.borrower_name}</TableCell>
                <TableCell>{row.borrow_date}</TableCell>
                <TableCell>{row.return_date}</TableCell>
                <TableCell style={getStatusStyle(row.loan_status)}>
                  {row.loan_status || ""}
                </TableCell>
              </TableRow>
            );
          })}
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
      {selectedRows.length > 0 && (
        <Button
          variant="contained"
          color="primary"
          onClick={handleReturn}
          style={{ margin: '10px' }}
        >
          คืนอุปกรณ์ที่เลือก ({selectedRows.length})
        </Button>
      )}
    </>
  );
};

export default MyTable;