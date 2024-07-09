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
import { format, parse, addYears } from 'date-fns';
import { th } from 'date-fns/locale'; // Import Thai locale

const swalStyles = `
  .swal2-container {
    z-index: 9999;
  }
`;


const CustomEditModal = ({ open, handleClose, user, label }) => {
  const [formData, setFormData] = useState({
    id: "",
    username: "",
    password: "",
    full_name: "",
    email: "",
    registration_date: "",
    is_admin: "",
    cellNum: "",
  });

  useEffect(() => {
    if (user) {
      let formattedDate = "";

      // Parse the Thai date string and adjust the year
      try {
        const thaiDateString = user.registration_date;
        const parsedDate = parse(thaiDateString, 'd MMMM yyyy', new Date(), { locale: th });
        
        // Adjust for Thai Buddhist year
        const gregorianDate = addYears(parsedDate, -543);
        
        if (isNaN(gregorianDate)) {
          throw new Error("Invalid date");
        }
        
        formattedDate = format(gregorianDate, 'yyyy-MM-dd');
      } catch (error) {
        console.error("Invalid date format:", user.registration_date);
      }

      setFormData({
        id: user.id,
        username: user.username,
        password: user.password,
        full_name: user.full_name,
        email: user.email,
        registration_date: formattedDate,
        is_admin: user.is_admin,
        cellNum: user.cellNum,
      });
    }
  }, [user]);

  const resetForm = () => {
    setFormData({
      id: "",
      username: "",
      password: "",
      full_name: "",
      email: "",
      registration_date: "",
      is_admin: "",
      cellNum: "",
    });
  };

  const handleRoleChange = (event) => {
    const isAdminValue = event.target.value;
    setFormData((prevState) => ({
      ...prevState,
      is_admin: isAdminValue,
    }));
  };

  const handleChangeInput = (e) => {
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
        `https://back-end-finals-project-vibo.onrender.com/api/user/update/${user.id}`,
        formData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
  
      handleClose();
      
      // Add custom styles to Swal
      const style = document.createElement('style');
      style.textContent = swalStyles;
      document.head.appendChild(style);
  
      await Swal.fire({
        title: "ดำเนินการสำเร็จ!",
        text: "แก้ไขข้อมูล",
        icon: "success",
        confirmButtonText: "ตกลง",
      });
  
      // Remove the custom styles after Swal is closed
      document.head.removeChild(style);
  
      resetForm();
    } catch (error) {
      console.error("Error updating data:", error);
      // console.log("Data updated successfully:", formData);
      const style = document.createElement('style');
      style.textContent = swalStyles;
      document.head.appendChild(style);
  
      await Swal.fire({
        title: "ดำเนินการไม่สำเร็จ!",
        text:
          "ไม่สามารถแก้ไขข้อมูลได้: " +
          (error.response?.data?.message || error.message),
        icon: "error",
        confirmButtonText: "ตกลง",
      });
  
      // Remove the custom styles after Swal is closed
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
              onChange={handleChangeInput}
              style={{ margin: "0.5rem" }}
              fullWidth
            />
            <TextField
              label="ชื่อผู้ใช้"
              variant="outlined"
              name="username"
              value={formData.username}
              placeholder={user.username} // Use user data as placeholder
              onChange={handleChangeInput}
              style={{ margin: "0.5rem" }}
              fullWidth
            />
            <TextField
              label="รหัสผ่าน"
              variant="outlined"
              name="password"
              value={formData.password}
              placeholder={user.password} // Use user data as placeholder
              onChange={handleChangeInput}
              style={{ margin: "0.5rem" }}
              fullWidth
            />
            <TextField
              label="Email"
              variant="outlined"
              name="email"
              value={formData.email}
              placeholder={user.email} // Use user data as placeholder
              onChange={handleChangeInput}
              style={{ margin: "0.5rem" }}
              fullWidth
            />
            <TextField
              label="เบอร์โทรศัพท์"
              variant="outlined"
              name="cellNum"
              value={formData.cellNum}
              placeholder={user.cellNum} // Use user data as placeholder
              onChange={handleChangeInput}
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
                onChange={handleRoleChange}
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

export default CustomEditModal;
