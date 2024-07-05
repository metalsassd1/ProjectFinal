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
  Box,
  Grid,
  TextField
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ModalAddPage from "../../../components/modalComponent/addPage";
import EditModal from "../../../components/modalComponent/EditPage";
import Swal from 'sweetalert2';

const MyTable = ({ searchTerms }) => {
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [selectedRec, setSelectedRec] = useState(null);

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);
  const navigate = useNavigate();

  const addAPI = "https://back-end-finals-project-pgow.onrender.com/api/recreational/add";
  const editAPI = "https://back-end-finals-project-pgow.onrender.com/api/recreational/update";

  const formatDate = (dateString) => {
    if (!dateString) return "No date provided"; // Handles null, undefined, or empty string

    const date = new Date(dateString);
    if (isNaN(date)) return "Invalid date"; // Check if the date is invalid

    return date.toLocaleDateString("TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://back-end-finals-project-pgow.onrender.com/api/recreational/table"
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
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterData();
  }, [rows, searchTerms]);

  const filterData = () => {
    const filtered = rows.filter(item =>
      item.id.toString().toLowerCase().includes(searchTerms.id.toLowerCase()) &&
      item.equipment_name.toLowerCase().includes(searchTerms.equipment_name.toLowerCase()) &&
      item.import_date.toLowerCase().includes(searchTerms.import_date.toLowerCase()) &&
      item.last_update.toLowerCase().includes(searchTerms.last_update.toLowerCase())
    );
    setFilteredRows(filtered);
  };

  const handleEditOpen = (user) => {
    console.log(user);
    setSelectedRec(user); // Set the selected user to edit
    setModalEditOpen(true); // Open the edit modal
  };

  const handleEditClose = () => {
    setModalEditOpen(false);
    fetchData(); // Refresh data after closing the modal
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
        await axios.delete(
          `https://back-end-finals-project-pgow.onrender.com/api/recreational/delete/${id}`
        );
        // หลังจากลบข้อมูลสำเร็จ สามารถทำการ fetch ข้อมูลใหม่เพื่ออัปเดตหน้าตาราง
        const response = await axios.get(
          "https://back-end-finals-project-pgow.onrender.com/api/recreational/table"
        );
        setRows(response.data);
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
                value={searchTerms.import_name}
                onChange={(e) => handleSearch("import_name", e.target.value)}
                InputLabelProps={{ shrink: true }}

              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                label="ค้นหาด้วยชื่อผู้ยืม"
                variant="outlined"
                size="small"
                value={searchTerms.last_update}
                onChange={(e) => handleSearch("last_update", e.target.value)}
                InputLabelProps={{ shrink: true }}

              />
            </Grid>
            <Grid item xs={12} style={{ textAlign: 'right' }}>
            </Grid>
          </Grid>
          </Box>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow style={{ backgroundColor: "#556cca" }}>
            <TableCell style={{ color: "#fff" }}>ID</TableCell>
            <TableCell style={{ color: "#fff" }}>ชื่ออุปกรณ์</TableCell>
            <TableCell style={{ color: "#fff" }}>จำนวน</TableCell>
            <TableCell style={{ color: "#fff" }}>ประเภท</TableCell>
            <TableCell style={{ color: "#fff" }}>วันที่นำเข้า</TableCell>
            <TableCell style={{ color: "#fff" }}>อัพเดทล่าสุด</TableCell>
            <TableCell style={{ color: "#fff" }}>หมายเหตุ</TableCell>
            <TableCell>
              <Button variant="contained" color="primary" onClick={handleOpen} style={{ backgroundColor: "#33CC66" }}>
                เพิ่มข้อมูล
              </Button>
              <ModalAddPage
                open={modalOpen}
                handleClose={handleClose}
                label={"อุปกรณ์นันทนาการ"}
                API={addAPI}
              />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredRows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.equipment_name}</TableCell>
              <TableCell>{row.Eq_quantity_in_stock}</TableCell>
              <TableCell>{row.equipment_type}</TableCell>
              <TableCell>{row.import_date}</TableCell>
              <TableCell>{row.last_update}</TableCell>
              <TableCell>{row.note}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  style={{ backgroundColor: "#990099" }}
                  onClick={() => handleEditOpen(row)}
                >
                  แก้ไข
                </Button>
                <Button
                  variant="contained"
                  style={{ backgroundColor: "#CC0033" , marginLeft: 10 }}
                  onClick={() => handleDelete(row.id)}
                >
                  ลบ
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {selectedRec && (
        <EditModal
          open={modalEditOpen}
          handleClose={handleEditClose}
          storeData={selectedRec}
          label={"อุปกรณ์นันทนาการ"}
          API={editAPI}
        />
      )}
    </TableContainer>
    </>
  );
};

export default MyTable;
