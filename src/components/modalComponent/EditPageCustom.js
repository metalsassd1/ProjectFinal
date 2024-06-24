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
import axios from "axios";
import Swal from "sweetalert2";

const CustomEdirModal = ({ open, handleClose, user, label }) => {
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const [formData, setFormData] = useState({
    id: user?.id || "",
    username: user?.username || "",
    password: user?.password || "",
    full_name: user?.full_name || "",
    email: user?.email || "",
    registration_date: user?.registration_date
      ? new Date(user.registration_date)
      : getCurrentDate(),
    is_admin: user?.is_admin || "",
  });

  const handleRoleChange = (event) => {
    // Assuming value is passed as a string from the dropdown, convert to number
    const isAdminValue = event.target.value;
    console.log(isAdminValue);
    setFormData((prevState) => ({
      ...prevState,
      is_admin: isAdminValue,
    }));
  };

  const handleChangeinput = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:4000/api/user/update/${user.id}`,
        formData
      );
      console.log("Data updated successfully:", response.data);

        await Swal.fire({
          title: "ดำเนินการสำเร็จ!",
          text: "แก้ไขข้อมูล",
          icon: "success",
          confirmButtonText: "ตกลง",
        });

        handleClose(); // Close the modal after user clicks OK
    } catch (error) {
      console.error("Error updating data:", error);

      await Swal.fire({
        title: "ดำเนินการไม่สำเร็จ!",
        text:
          "ไม่สามารถแก้ไขข้อมูลได้: " +
          (error.response?.data?.message || error.message),
        icon: "error",
        confirmButtonText: "ตกลง",
      });
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80%",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography id="modal-modal-title" variant="h4" component="h1">
          แก้ไข{label}
        </Typography>
        <Paper elevation={3} style={{ margin: "1rem", padding: "1rem" }}>
          <form onSubmit={handleSubmit}>
            <TextField
              label="ชื่อ-นามสกุล"
              variant="outlined"
              name="full_name"
              value={formData.full_name}
              placeholder={user.full_name} // Use user data as placeholder
              onChange={handleChangeinput}
              style={{ margin: "0.5rem" }}
              fullWidth
            />
            <TextField
              label="ชื่อผู้ใช้"
              variant="outlined"
              name="username"
              value={formData.username}
              placeholder={user.username} // Use user data as placeholder
              onChange={handleChangeinput}
              style={{ margin: "0.5rem" }}
              fullWidth
            />
            <TextField
              label="รหัสผ่าน"
              variant="outlined"
              name="password"
              value={formData.password}
              placeholder={user.password} // Use user data as placeholder
              onChange={handleChangeinput}
              style={{ margin: "0.5rem" }}
              fullWidth
            />
            <TextField
              label="Email"
              variant="outlined"
              name="email"
              value={formData.email}
              placeholder={user.email} // Use user data as placeholder
              onChange={handleChangeinput}
              style={{ margin: "0.5rem" }}
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel id="is-admin-label">Role</InputLabel>
              <Select
                labelId="is-admin-label"
                id="is-admin-select"
                value={formData.is_admin.toString()}
                label="Role"
                onChange={(e) => handleRoleChange(e)}
              >
                <MenuItem value={"Admin"}>Admin</MenuItem>
                <MenuItem value={"User"}>User</MenuItem>
              </Select>
            </FormControl>

            <Box textAlign="center" my={2}>
              <Button type="submit" variant="contained" color="success">
                บันทึก
              </Button>
            </Box>
          </form>
        </Paper>
      </Box>
    </Modal>
  );
};

export default CustomEdirModal;
