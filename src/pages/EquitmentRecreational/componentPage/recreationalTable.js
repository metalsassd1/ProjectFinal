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
              <Button variant="contained" color="primary" onClick={handleOpen}>
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
  );
};

export default MyTable;
