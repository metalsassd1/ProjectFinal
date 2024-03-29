import React, { useState, useEffect } from "react";
import { Modal, Box, Typography, Button, TextField, Paper } from "@mui/material";
import axios from "axios";
import MultipleSelectCheckmarks from '../dropdown'; // Import the dropdown component

const CustomModal = ({ open, handleClose, user,label }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    full_name: "",
    email: "",
    is_admin: [],
  });

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || "",
        password: user.password || "", // For security, consider not prefilling passwords
        full_name: user.full_name || "",
        email: user.email || "",
        is_admin: user.is_admin ? ['Admin'] : ['User'], // Set the dropdown based on the is_admin boolean
      });
    }
  }, [user]);

  const handleRoleChange = (selectedRoles) => {
    // Update the formData to reflect the changes in role
    setFormData(prevState => ({
      ...prevState,
      is_admin: selectedRoles.includes('Admin')
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
      console.log(response.data); // Log response from server
      handleClose(); // Close modal after successful submission
    } catch (error) {
      console.error("Error updating data:", error);
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
        <Typography id="modal-modal-title" variant="h4" component="h1">แก้ไข{label}</Typography>
        <Paper elevation={3} style={{ margin: "1rem", padding: "1rem" }}>
          <form onSubmit={handleSubmit}>
            <TextField
              label="ชื่อ-นามสกุล"
              variant="outlined"
              name="full_name"
              value={formData.full_name}
              onChange={handleChangeinput}
              style={{ margin: "0.5rem" }}
              fullWidth
            />
            <TextField
              label="ชื่อผู้ใช้"
              variant="outlined"
              name="username"
              value={formData.username}
              onChange={handleChangeinput}
              style={{ margin: "0.5rem" }}
              fullWidth
            />
            <TextField
              label="รหัสผ่าน"
              variant="outlined"
              name="password"
              value={formData.password}
              onChange={handleChangeinput}
              style={{ margin: "0.5rem" }}
              fullWidth
            />
            <TextField
              label="Email"
              variant="outlined"
              name="email"
              value={formData.email}
              onChange={handleChangeinput}
              style={{ margin: "0.5rem" }}
              fullWidth
            />
            <MultipleSelectCheckmarks
            names={['Admin', 'User']}
            onSelectionChange={handleRoleChange}
            label="Role"
          />
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

export default CustomModal;
