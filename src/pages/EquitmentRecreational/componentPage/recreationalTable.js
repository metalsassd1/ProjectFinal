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
import EditModal from "../../../components/modalComponent/EditPage"

const MyTable = () => {
  const [rows, setRows] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [selectedRec, setSelectedRec] = useState(null);

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);
  const navigate = useNavigate();

  const addAPI = "http://localhost:4000/api/recreational/add"
  const editAPI = "http://localhost:4000/api/recreational/update"

  const handleRedirect = (path) => {
    navigate(path);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/recreational/table"
      );
      setRows(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {

    fetchData();
  }, []);

  const handleEditOpen = (user) => {
    console.log(user)
    setSelectedRec(user); // Set the selected user to edit
    setModalEditOpen(true); // Open the edit modal
  };

  const handleEditClose = () => {
    setModalEditOpen(false);
    fetchData(); // Refresh data after closing the modal
  };

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm("คุณต้องการลบข้อมูลนี้ใช่หรือไม่?");

    if (isConfirmed) {
      try {
        await axios.delete(
          `http://localhost:4000/api/recreational/delete/${id}`
        );
        // หลังจากลบข้อมูลสำเร็จ สามารถทำการ fetch ข้อมูลใหม่เพื่ออัปเดตหน้าตาราง
        const response = await axios.get(
          "http://localhost:4000/api/recreational/table"
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
          {rows.map((row) => (
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
                  onClick={() =>handleEditOpen(row)}
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
