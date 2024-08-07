import React, { useState, useEffect,useCallback } from "react";
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
  Checkbox,
  TablePagination,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ModalAddPage from "../../../components/modalComponent/addPage";
import EditModal from "../../../components/modalComponent/EditPage";
import Grid from "@mui/material/Grid";
import Swal from "sweetalert2";
import { useRecoilState,useResetRecoilState } from "recoil";
import {
  searchSportTermsState,
  selectedSportIdsState,
  selectedSportState,
  sportPageState,
  sportRowsPerPageState,
  sportRowsState,
  filteredSportRowsState
} from "../../../Recoils/AdminRecoil/SportRecoil";

import {useResetSportStates} from "../../../Recoils/AdminRecoil/SportStateReset"

const MyTable = () => {
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [rows, setRows] = useRecoilState(sportRowsState);
  const [filteredRows, setFilteredRows] = useRecoilState(filteredSportRowsState);
  const [page, setPage] = useRecoilState(sportPageState);
  const [rowsPerPage, setRowsPerPage] = useRecoilState(sportRowsPerPageState);
  const [selectedSport, setSelectedSport] = useRecoilState(selectedSportState);
  const [searchTerms, setSearchTerms] = useRecoilState(searchSportTermsState);
  const [selectedIds, setSelectedIds] = useRecoilState(selectedSportIdsState);
  const ResetSportStates = useResetSportStates();

  const handleOpen = () => setModalOpen(true);
  const handleClose=(() => {
    setModalOpen(false);
    fetchData();
  })
  const navigate = useNavigate();

  const addAPI =
    "https://back-end-finals-project-vibo.onrender.com/api/sport/add";
  const editAPI =
    "https://back-end-finals-project-vibo.onrender.com/api/sport/update";

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
    // รีเซ็ต state เมื่อเข้าสู่หน้า
    ResetSportStates();

    // รีเซ็ต state เมื่อออกจากหน้า
    return () => {
      ResetSportStates();
    };
  }, []);

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(
        "https://back-end-finals-project-vibo.onrender.com/api/sport/table"
      );
      const formattedData = response.data.map((item) => ({
        ...item,
        import_date: formatDate(item.import_date),
        last_update: formatDate(item.last_update),
      }));
      setRows(formattedData);
      setFilteredRows(formattedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },[setRows, setFilteredRows]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);;

  useEffect(() => {
    filterData();
  }, [rows, searchTerms]);


  const filterData = () => {
    const filtered = rows.filter((item) => {
      const lowerCaseSearch = (field) => 
        (searchTerms[field] || '').toLowerCase();
      const lowerCaseItem = (field) => 
        (item[field]?.toString() || '').toLowerCase();
  
      return (
        lowerCaseItem('id').includes(lowerCaseSearch('id')) &&
        lowerCaseItem('equipment_name').includes(lowerCaseSearch('equipment_name')) &&
        lowerCaseItem('import_date').includes(lowerCaseSearch('import_date')) &&
        lowerCaseItem('last_update').includes(lowerCaseSearch('last_update'))
      );
    });
    setFilteredRows(filtered);
  };

  const handleEditOpen = (user) => {
    setSelectedSport(user);
    setModalEditOpen(true);
  };

  const handleEditClose = () => {
    setModalEditOpen(false);
    fetchData();
  };

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
            axios.delete(
              `https://back-end-finals-project-vibo.onrender.com/api/sport/delete/${id}`
            )
          )
        );
        fetchData();
        await Swal.fire({
          title: "ดำเนินการสำเร็จ!",
          text: "ลบข้อมูลเรียบร้อย",
          icon: "success",
          confirmButtonText: "ตกลง",
        });
        setSelectedIds([]);
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

  const handleSearch = (field, value) => {
    setSearchTerms((prev) => ({ ...prev, [field]: value }));
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
              label="ค้นหาด้วยวันที่นำเข้า"
              variant="outlined"
              size="small"
              value={searchTerms.import_date}
              onChange={(e) => handleSearch("import_date", e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="ค้นหาด้วยวันที่อัพเดท"
              variant="outlined"
              size="small"
              value={searchTerms.last_update}
              onChange={(e) => handleSearch("last_update", e.target.value)}
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
          ตารางแสดงรายละเอียดข้อมูลอุปกรณ์กีฬา
        </h2>
        <Table>
          <TableHead>
            <TableRow
              style={{ backgroundColor: "#2c3e75", border: "1px solid black" }}
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
              <TableCell style={{ color: "#fff" }}>จำนวน</TableCell>
              <TableCell style={{ color: "#fff" }}>ประเภท</TableCell>
              <TableCell style={{ color: "#ffffff" }}>วันที่นำเข้า</TableCell>
              <TableCell style={{ color: "#ffffff" }}>อัพเดทล่าสุด</TableCell>
              <TableCell style={{ color: "#ffffff" }}>หมายเหตุ</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  onClick={handleOpen}
                  style={{
                    backgroundColor: "#33CC66",
                    border: "1px solid black",
                  }}
                >
                  เพิ่มข้อมูล
                </Button>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentRows.map((row) => (
              <TableRow key={row.id}>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedIds.includes(row.id)}
                    onChange={(event) => handleCheckboxChange(event, row.id)}
                  />
                </TableCell>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.equipment_name}</TableCell>
                <TableCell>{row.Sp_quantity_in_stock}</TableCell>
                <TableCell>{row.equipment_type}</TableCell>
                <TableCell>{row.import_date}</TableCell>
                <TableCell>{row.last_update}</TableCell>
                <TableCell>{row.note}</TableCell>
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
      <ModalAddPage
        open={modalOpen}
        handleClose={handleClose}
        label={"อุปกรณ์กีฬา"}
        API={addAPI}
      />
      {selectedSport && (
        <EditModal
          open={modalEditOpen}
          handleClose={handleEditClose}
          storeData={selectedSport}
          label={"อุปกรณ์กีฬา"}
          API={editAPI}
        />
      )}
    </>
  );
};

export default MyTable;
