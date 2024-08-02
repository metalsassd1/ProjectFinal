import React, { useState, useEffect, useCallback } from "react";
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
  IconButton,
} from "@mui/material";
import ModalAddPage from "../../../components/modalComponent/addPageCustoms";
import EditModal from "../../../components/modalComponent/EditPageCustom";
import Grid from "@mui/material/Grid";
import Swal from "sweetalert2";
import { useRecoilState, useResetRecoilState } from "recoil";
import {
  userPageState,
  userRowsPerPageState,
  userRowsState,
  filteredUserRowsState,
  searchUserTermsState,
  selectedUserIdsState,
  selectedUserState,
} from "../../../Recoils/AdminRecoil/UserRecoil";
import { useResetUserStates } from "../../../Recoils/AdminRecoil/UserStateReset";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const MyTable = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [rows, setRows] = useRecoilState(userRowsState);
  const [filteredRows, setFilteredRows] = useRecoilState(filteredUserRowsState);
  const [page, setPage] = useRecoilState(userPageState);
  const [rowsPerPage, setRowsPerPage] = useRecoilState(userRowsPerPageState);
  const [selectedUser, setSelectedUser] = useRecoilState(selectedUserState);
  const [searchTerms, setSearchTerms] = useRecoilState(searchUserTermsState);
  const [selectedIds, setSelectedIds] = useRecoilState(selectedUserIdsState);
  const resetSearchTerms = useResetRecoilState(searchUserTermsState);
  const ResetUserStates = useResetUserStates();
  const [showPassword, setShowPassword] = useState({});
  const [originalPasswords, setOriginalPasswords] = useState({});

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => {
    setModalOpen(false);
    fetchData();
  };

  const handleEditOpen = (user) => {
    setSelectedUser(user);
    setModalEditOpen(true);
  };

  useEffect(() => {
    ResetUserStates();
    return () => ResetUserStates();
  }, []);

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

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(
        "https://back-end-finals-project-vibo.onrender.com/api/user/table"
      );
      const formattedData = response.data.map((item) => ({
        ...item,
        registration_date: formatDate(item.registration_date),
        last_update: formatDate(item.last_update),
      }));
      setRows(formattedData);
      setFilteredRows(formattedData);

      // Store the original passwords
      const passwordMap = {};
      formattedData.forEach((item) => {
        passwordMap[item.id] = item.password;
      });
      setOriginalPasswords(passwordMap);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [setRows, setFilteredRows]);

  useEffect(() => {
    fetchData();
    resetSearchTerms();
  }, [fetchData]);

  useEffect(() => {
    filterData();
  }, [rows, searchTerms]);

  const filterData = () => {
    const safeString = (value) => (value?.toString() || "").toLowerCase();
    const safeIncludes = (itemValue, searchValue) =>
      safeString(itemValue).includes(safeString(searchValue));

    const filtered = rows.filter((item) => {
      return (
        safeIncludes(item.id, searchTerms.id) &&
        safeIncludes(item.username, searchTerms.username) &&
        safeIncludes(item.email, searchTerms.email) &&
        safeIncludes(getRoleLabel(item.is_admin), searchTerms.is_admin)
      );
    });

    setFilteredRows(filtered);
  };

  const togglePasswordVisibility = (id) => {
    setShowPassword((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const displayPassword = (row) => {
    if (showPassword[row.id]) {
      return originalPasswords[row.id] || "********";
    }
    return "********";
  };

  const handleEditClose = () => {
    setModalEditOpen(false);
    fetchData();
  };

  const addAPI =
    "https://back-end-finals-project-vibo.onrender.com/api/user/add";
  const editAPI =
    "https://back-end-finals-project-vibo.onrender.com/api/user/update";

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
              `https://back-end-finals-project-vibo.onrender.com/api/user/delete/${id}`
            )
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

  const getRoleLabel = (is_admin) => (is_admin === 1 ? "Admin" : "User");

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
        style={{ border: "1px solid black" }}
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
              label="ค้นหาด้วยชื่อผู้ใช้"
              variant="outlined"
              size="small"
              value={searchTerms.username}
              onChange={(e) => handleSearch("username", e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="ค้นหาด้วยอีเมล"
              variant="outlined"
              size="small"
              value={searchTerms.email}
              onChange={(e) => handleSearch("email", e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="ค้นหาด้วยสถานะ Admin"
              variant="outlined"
              size="small"
              value={searchTerms.is_admin}
              onChange={(e) => handleSearch("is_admin", e.target.value)}
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
          ตารางแสดงรายละเอียดข้อมูลผู้ใช้
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
              <TableCell style={{ color: "#fff" }}>อีเมล</TableCell>
              <TableCell style={{ color: "#fff" }}>ชื่อผู้ใช้</TableCell>
              <TableCell style={{ color: "#fff" }}>เบอร์โทรศัพท์</TableCell>
              <TableCell style={{ color: "#fff" }}>username</TableCell>
              <TableCell style={{ color: "#fff" }}>password</TableCell>
              <TableCell style={{ color: "#fff" }}>วันที่นำเข้า</TableCell>
              <TableCell style={{ color: "#fff" }}>
                วันที่อัพเดตล่าสุด
              </TableCell>
              <TableCell style={{ color: "#fff" }}>Admin</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "#33CC66",
                    border: "1px solid black",
                  }}
                  onClick={handleOpen}
                >
                  เพิ่มข้อมูล
                </Button>
                <ModalAddPage
                  open={modalOpen}
                  handleClose={handleClose}
                  label={"ผู้ใช้"}
                  API={addAPI}
                />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentRows.map((row) => (
              <TableRow
                key={row.id}
                style={{
                  backgroundColor: selectedIds.includes(row.id)
                    ? "#e0e0e0"
                    : "#fff",
                }}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedIds.includes(row.id)}
                    onChange={(event) => handleCheckboxChange(event, row.id)}
                  />
                </TableCell>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.full_name}</TableCell>
                <TableCell>{row.cellNum}</TableCell>
                <TableCell>{row.username}</TableCell>
                <TableCell>
                  {displayPassword(row)}
                  <IconButton onClick={() => togglePasswordVisibility(row.id)}>
                    {showPassword[row.id] ? (
                      <VisibilityOffIcon />
                    ) : (
                      <VisibilityIcon />
                    )}
                  </IconButton>
                </TableCell>
                <TableCell>{row.registration_date}</TableCell>
                <TableCell>{row.last_update}</TableCell>
                <TableCell>{getRoleLabel(row.is_admin)}</TableCell>
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
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={filteredRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
      {selectedIds.length > 0 && (
        <Button
          variant="contained"
          style={{
            backgroundColor: "#d32f2f",
            color: "#fff",
            border: "1px solid black",
            marginTop: "10px",
            marginBottom: "10px",
            marginLeft: "10px",
          }}
          onClick={handleDelete}
        >
          ลบข้อมูล ({selectedIds.length})
        </Button>
      )}
      {selectedUser && (
        <EditModal
          open={modalEditOpen}
          handleClose={handleEditClose}
          user={selectedUser}
          label={"ผู้ใช้"}
          API={editAPI}
        />
      )}
    </>
  );
};

export default MyTable;
