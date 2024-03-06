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

const MyTable = () => {
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();

  const handleRedirect = (path) => {
    navigate(path);
  };

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
            <TableCell>Username</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Registration date</TableCell>
            <TableCell>Last login</TableCell>
            <TableCell>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleRedirect("/4/add")}
              >
                Add User
              </Button>
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
