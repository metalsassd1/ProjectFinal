import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  TextField,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import axios from "axios";
import Swal from 'sweetalert2';

const swalStyles = `
  .swal2-container {
    z-index: 9999;
  }
`;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function CustomAddModal({ open, handleClose, label, user }) {


  const [formData, setFormData] = useState({
    field1: "",
    field2: "",
    field3: "",
    field4: "",
    field5: "User",
    field6: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        field1: user.username || "",
        field2: user.password || "",
        field3: user.full_name || "",
        field4: user.email || "",
        field5: user.is_admin ? "Admin" : "User",
        field6: user.cellNum || ""
      });
    }
  }, [user]);

  const handleRoleChange = (event) => {
    const isAdminValue = event.target.value;
    setFormData((prevState) => ({
      ...prevState,
      field5: isAdminValue,
    }));
  };

  const handleChangeinput = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      field1: "",
      field2: "",
      field3: "",
      field4: "",
      field5: "User",
      field6: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      username: formData.field1,
      password: formData.field2,
      full_name: formData.field3,
      email: formData.field4,
      is_admin: formData.field5 === "Admin" ? 1 : 0,
      cellNum: formData.field6,
    };

    try {
      const response = await axios.post("https://back-end-finals-project-vibo.onrender.com/api/user/add", data)
      .then((result) => {
      console.log("Data added successfully:", response.data);
        if (result.isConfirmed) {
          handleClose();
          const style = document.createElement('style');
          style.textContent = swalStyles;
          document.head.appendChild(style);
          
          Swal.fire({
            title: 'ดำเนินการสำเร็จ!',
            text: 'เพิ่มข้อมูล',
            icon: 'success',
            confirmButtonText: 'ตกลง'
          })
          document.head.removeChild(style);
          resetForm();
        }
      });
    } catch (error) {
      const style = document.createElement('style');
      style.textContent = swalStyles;
      document.head.appendChild(style);
      console.error("Error adding data:", error);
      Swal.fire({
        title: 'ดำเนินการไม่สำเร็จ!',
        text: 'ไม่สามารถเพิ่มข้อมูล ' + (error.response?.data?.message || error.message),
        icon: 'error',
        confirmButtonText: 'ตกลง'
      });
      document.head.removeChild(style);
    }
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        handleClose();
        resetForm();
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <h1>เพิ่มข้อมูล{label}</h1>
        <Paper elevation={3} style={{ margin: "1rem", padding: "1rem" }}>
          <form onSubmit={handleSubmit}>
            <TextField
              label="ชื่อ-นามสกุล"
              variant="outlined"
              name="field1"
              value={formData.field1}
              onChange={handleChangeinput}
              style={{ margin: "0.5rem" }}
              fullWidth
            />
            <TextField
              label="ชื่อผู้ใช้"
              variant="outlined"
              name="field2"
              value={formData.field2}
              onChange={handleChangeinput}
              style={{ margin: "0.5rem" }}
              fullWidth
            />
            <TextField
              label="รหัสผ่าน"
              variant="outlined"
              name="field3"
              value={formData.field3}
              onChange={handleChangeinput}
              style={{ margin: "0.5rem" }}
              fullWidth
            />
            <TextField
              label="Email"
              variant="outlined"
              name="field4"
              value={formData.field4}
              onChange={handleChangeinput}
              style={{ margin: "0.5rem" }}
              fullWidth
            />
            <TextField
              label="เบอร์โทรศัพท์"
              variant="outlined"
              name="field6"
              value={formData.field6}
              onChange={handleChangeinput}
              style={{ margin: "0.5rem" }}
              fullWidth
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Role</InputLabel>
              <Select
                name="field5"
                value={formData.field5}
                label="Role"
                onChange={handleRoleChange}
              >
                <MenuItem value="Admin">Admin</MenuItem>
                <MenuItem value="User">User</MenuItem>
              </Select>
            </FormControl>
            <Box textAlign="center" my={2}>
              <Button type="submit" variant="contained" color="success">
                เพิ่มข้อมูล
              </Button>
            </Box>
          </form>
        </Paper>
      </Box>
    </Modal>
  );
}