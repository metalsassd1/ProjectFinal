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
} from "@mui/material";
import ModalAddPage from "../../../components/modalComponent/addPageCustoms";
import EditModal from "../../../components/modalComponent/EditPageCustom";
import Grid from "@mui/material/Grid";
import Swal from "sweetalert2";

const MyTable = () => {
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [searchTerms, setSearchTerms] = useState({
    id: "",
    username: "",
    email: "",
    is_admin: "",
  });

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  const handleEditOpen = (user) => {
    setSelectedUser(user);
    setModalEditOpen(true);
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
        "https://back-end-finals-project-vibo.onrender.com/api/user/table"
      );
      const formattedData = response.data.map((item) => ({
        ...item,
        registration_date: formatDate(item.registration_date),
        last_update: formatDate(item.last_update),
      }));
      setRows(formattedData);
      setFilteredRows(formattedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterData();
  }, [rows, searchTerms]);

  const filterData = () => {
    const filtered = rows.filter(
      (item) =>
        (item.id?.toString().toLowerCase().includes(searchTerms.id.toLowerCase() || "")) &&
        (item.username?.toLowerCase().includes(searchTerms.username.toLowerCase() || "")) &&
        (item.email?.toLowerCase().includes(searchTerms.email.toLowerCase() || "")) &&
        (getRoleLabel(item.is_admin)?.toLowerCase().includes(searchTerms.is_admin.toLowerCase() || ""))
    );
    setFilteredRows(filtered);
  };

  const handleEditClose = () => {
    setModalEditOpen(false);
    fetchData();
  };

  const addAPI =
    "https://back-end-finals-project-vibo.onrender.com/api/user/add";
  const editAPI =
    "https://back-end-finals-project-vibo.onrender.com/api/user/update";

  const handleDelete = async (id) => {
    const { isConfirmed } = await Swal.fire({
      title: "ต้องการดำเนินการหรือไม่?",
      text: "ลบข้อมูล",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ตกลง",
      cancelButtonText: "ยกเลิก",
    });
    if (isConfirmed) {
      try {
        await axios.delete(
          `https://back-end-finals-project-vibo.onrender.com/api/user/delete/${id}`
        );
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

  const getRoleLabel = (is_admin) => (is_admin === 1 ? "Admin" : "User");

  const handleSearch = (field, value) => {
    setSearchTerms((prev) => ({ ...prev, [field]: value }));
  };

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
              label="ค้นหาด้วยชื่ออุปกรณ์"
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
              label="ค้นหาด้วยประเภท"
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
              label="ค้นหาด้วยชื่อผู้ยืม"
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
      <h2 style={{ 
        textAlign: "center", 
        backgroundColor: "#2c3e75",
        color: "#fff",
        margin: 0,
        padding: "15px",
        width: "100%",
        border: "1px solid black"
      }}>
        ตารางแสดงรายละเอียดข้อมูลผู้ใช้
      </h2>
        <Table>
          <TableHead>
            <TableRow
              style={{ backgroundColor: "#2c3e75", border: "1px solid black" }}
            >
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
            {filteredRows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.full_name}</TableCell>
                <TableCell>{row.cellNum}</TableCell>
                <TableCell>{row.username}</TableCell>
                <TableCell>{row.password}</TableCell>
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
                  <Button
                    variant="contained"
                    color="secondary"
                    style={{
                      backgroundColor: "#CC0033",
                      marginLeft: 10,
                      border: "1px solid black",
                    }}
                    onClick={() => handleDelete(row.id)}
                  >
                    ลบ
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {selectedUser && (
          <EditModal
            open={modalEditOpen}
            handleClose={handleEditClose}
            user={selectedUser}
            label={"ผู้ใช้"}
            API={editAPI}
          />
        )}
      </TableContainer>
    </>
  );
};

export default MyTable;
