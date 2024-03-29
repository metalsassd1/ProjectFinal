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
import ModalAddPage from "../../../components/addPage/addPageCustoms";

const MyTable = () => {
  const [rows, setRows] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/user/table"
        );
        setRows(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (userId) => {
    // Implement edit functionality using userId
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

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>ชื่อผู้ใช้</TableCell>
            <TableCell>password</TableCell>
            <TableCell>วันที่นำเข้า</TableCell>
            <TableCell>วันที่อัพเดตล่าสุด</TableCell>
            <TableCell>
            <Button
                variant="contained"
                color="primary"
                onClick={handleOpen}
              >
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
              <TableCell>{row.registration_date}</TableCell>
              <TableCell>{row.last_login}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleEdit(row.user_id)}
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
    </TableContainer>
  );
};

export default MyTable;
