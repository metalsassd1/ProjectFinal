import React, { useState, useEffect } from "react";
import { Modal, Box, Typography, Button, TextField, Paper } from "@mui/material";
import axios from "axios";

const CustomModal = ({ open, handleClose, label, user }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    full_name: "",
    email: "",
    is_admin: false,
  });

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || "",
        password: user.password || "",
        full_name: user.full_name || "",
        email: user.email || "",
        is_admin: user.is_admin || false,
      });
    }
  }, [user]);

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
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <h1>{label}</h1>
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
            <Box textAlign="center" my={2}>
              <Button type="submit" variant="contained" color="primary">
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
