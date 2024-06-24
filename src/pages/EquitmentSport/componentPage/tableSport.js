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
import { useNavigate } from "react-router-dom";
import ModalAddPage from "../../../components/modalComponent/addPage";
import EditModal from "../../../components/modalComponent/EditPage"
import Grid from '@mui/material/Grid';

const MyTable = () => {
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [selectedSport, setSelectedSport] = useState(null);
  const [searchTerms, setSearchTerms] = useState({
    id: "",
    equipment_name: "",
    import_date: "",
    last_update: ""
  });

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);
  const navigate = useNavigate();

  const addAPI = "https://back-end-finals-project-pgow.onrender.com/api/sport/add"
  const editAPI = "https://back-end-finals-project-pgow.onrender.com/api/sport/update"

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

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterData();
  }, [rows, searchTerms]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://back-end-finals-project-pgow.onrender.com/api/sport/table"
      );
      const formattedData = response.data.map(item => ({
        ...item,
        import_date: formatDate(item.import_date),
        last_update: formatDate(item.last_update)
      }));
      setRows(formattedData);
      setFilteredRows(formattedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

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
    setSelectedSport(user);
    setModalEditOpen(true);
  };

  const handleEditClose = () => {
    setModalEditOpen(false);
    fetchData();
  };

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm("คุณต้องการลบข้อมูลนี้ใช่หรือไม่?");
    if (isConfirmed) {
      try {
        await axios.delete(`https://back-end-finals-project-pgow.onrender.com/api/sport/delete/${id}`);
        fetchData();
      } catch (error) {
        console.error("Error deleting data:", error);
      }
    }
  };

  const handleSearch = (field, value) => {
    setSearchTerms(prev => ({ ...prev, [field]: value }));
  };

  return (
    <>
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
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>ชื่ออุปกรณ์</TableCell>
              <TableCell>จำนวน</TableCell>
              <TableCell>ประเภท</TableCell>
              <TableCell>วันที่นำเข้า</TableCell>
              <TableCell>อัพเดทล่าสุด</TableCell>
              <TableCell>หมายเหตุ</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleOpen}
                >
                  เพิ่มข้อมูล
                </Button>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.map((row) => (
              <TableRow key={row.id}>
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
                    color="primary"
                    onClick={() => handleEditOpen(row)}
                  >
                    แก้ไข
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    style={{ marginLeft: 10 }}
                    onClick={() => handleDelete(row.id)}
                  >
                    ลบ
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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