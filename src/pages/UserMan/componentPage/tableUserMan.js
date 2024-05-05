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
import ModalAddPage from "../../../components/modalComponent/addPageCustoms";
import EditModal from "../../../components/modalComponent/EditPageCustom";

const MyTable = () => {
  const [rows, setRows] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalEditOpen, setModalEditOpen] = useState(false);

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  const handleEditOpen = (user) => {
    setSelectedUser(user); // Set the selected user to edit
    setModalEditOpen(true); // Open the edit modal
  };

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
      const response = await axios.get("http://localhost:4000/api/user/table");
      const formattedData = response.data.map(item => ({
        ...item,
        registration_date: formatDate(item.registration_date),
        last_update: formatDate(item.last_update)
      }));
      setRows(formattedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEditClose = () => {
    setModalEditOpen(false);
    fetchData(); // Refresh data after closing the modal
  };

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm("คุณต้องการลบข้อมูลนี้ใช่หรือไม่?");

    if (isConfirmed) {
      try {
        await axios.delete(`http://localhost:4000/api/user/delete/${id}`);
        // หลังจากลบข้อมูลสำเร็จ สามารถทำการ fetch ข้อมูลใหม่เพื่ออัปเดตหน้าตาราง
        const response = await axios.get(
          "http://localhost:4000/api/user/table"
        );
        setRows(response.data);
      } catch (error) {
        console.error("Error deleting data:", error);
      }
    }
  };

  const getRoleLabel = (is_admin) => is_admin === 1 ? "Admin" : "User";

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>ชื่อผู้ใช้</TableCell>
            <TableCell>อีเมล</TableCell>
            <TableCell>password</TableCell>
            <TableCell>วันที่นำเข้า</TableCell>
            <TableCell>วันที่อัพเดตล่าสุด</TableCell>
            <TableCell>Admin</TableCell>
            <TableCell>
              <Button variant="contained" color="primary" onClick={handleOpen}>
                เพิ่มข้อมูล
              </Button>
              <ModalAddPage
                open={modalOpen}
                handleClose={handleClose}
                label={"ผู้ใช้"}
              />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.username}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.password}</TableCell>
              <TableCell>{row.registration_date}</TableCell>
              <TableCell>{row.last_update}</TableCell>
              <TableCell>{getRoleLabel(row.is_admin)}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleEditOpen(row)}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  style={{ marginLeft: 10 }}
                  onClick={() => handleDelete(row.id)}
                >
                  Delete
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
        />
      )}
    </TableContainer>
  );
};

export default MyTable;
