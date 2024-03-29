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
import EditModal from "../../../components/modalComponent/EditPage";
const row = [
  {
    id: 1,
   username: "ฟุตบอล",
    quantity: 25,
    equipment_equipment_type: "New York",
    status: "พร้อมใช้งาน",
    email: "คฤจพัชหัสฤทัย คชามาสผจญ",
    registration_date: "10/12/23",
    return_date: "1/10/27",
  },
  {
    id: 2,
    username: "ฟุตบอล",
    quantity: 30,
    equipment_equipment_type: "Los Angeles",
    status: "ถูกยืม",
    email: "คฤจพัชหัสฤทัย คชามาสผจญ",
    registration_date: "10/12/23",
    return_date: "1/10/27",
  },
  {
    id: 3,
   username: "ฟุตบอล",
    quantity: 22,
    equipment_equipment_type: "Chicago",
    status: "",
    email: "คฤจพัชหัสฤทัย คชามาสผจญ",
    registration_date: "10/12/23",
    return_date: "1/10/27",
  },
  {
    id: 4,
   username: "ฟุตบอล",
    quantity: 30,
    equipment_equipment_type: "Los Angeles",
    status: "ถูกยืม",
    email: "คฤจพัชหัสฤทัย คชามาสผจญ",
    registration_date: "10/12/23",
    return_date: "1/10/27",
  },
  {
    id: 5,
   username: "ฟุตบอล",
    quantity: 22,
    equipment_equipment_type: "Chicago",
    status: "หายไป",
    email: "คฤจพัชหัสฤทัย คชามาสผจญ",
    registration_date: "10/12/23",
    return_date: "1/10/27",
  },
  {
    id: 6,
   username: "ฟุตบอล",
    quantity: 30,
    equipment_equipment_type: "Los Angeles",
    status: "พร้อมใช้งาน",
    email: "คฤจพัชหัสฤทัย คชามาสผจญ",
    registration_date: "10/12/23",
    return_date: "1/10/27",
  },
  {
    id: 7,
   username: "ฟุตบอล",
    quantity: 22,
    equipment_equipment_type: "Chicago",
    status: "ถูกยืม",
    email: "คฤจพัชหัสฤทัย คชามาสผจญ",
    registration_date: "10/12/23",
    return_date: "1/10/27",
  },
  {
    id: 8,
   username: "ฟุตบอล",
    quantity: 22,
    equipment_equipment_type: "Chicago",
    status: "",
    email: "คฤจพัชหัสฤทัย คชามาสผจญ",
    registration_date: "10/12/23",
    return_date: "1/10/27",
  },
];
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

  const handleEditClose = () => {
    setModalEditOpen(false);
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
          {row.map((row) => (
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
        />
      )}
    </TableContainer>
  );
};

export default MyTable;
