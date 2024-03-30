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

export default function CustomModal({ open, handleClose, label, user }) {
  const nameType = ["Admin", "not_Admin"];
  const [type, setType] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      // Fetch data or perform other actions if needed
      try {
        // const result = await fetchDataFromAPI();
        // setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Fetch data on mount
    fetchData();

    // Set up an interval for fetching data
    const intervalId = setInterval(fetchData, 60000); // Assuming a 1-minute interval
    return () => clearInterval(intervalId); // Cleanup the interval on component unmount
  }, []);

  const [formData, setFormData] = useState({
    field1: "",
    field2: "",
    field3: "",
    field4: "",
    field5: "User", // Initialize as "User" to match the MenuItem value and avoid uncontrolled component warning
    field6: null,
  });

  useEffect(() => {
    if (user) {
      setFormData({
        field1: user.username || "",
        field2: user.password || "",
        field3: user.full_name || "",
        field4: user.email || "",
        registration_date:
          user.registration_date || new Date().toISOString().split("T")[0], // Adjusted to directly use ISO string split
        field5: user.is_admin || 0,
      });
    }
  }, [user]);

  const handleChangeType = (selectedValues) => {
    console.log("Selected values:", selectedValues);
    setType(selectedValues);
  };

  const handleRoleChange = (event) => {
    // Assuming value is passed as a string from the dropdown, convert to number
    const isAdminValue = event.target.value;
    console.log(isAdminValue);
    setFormData((prevState) => ({
      ...prevState,
      field5: isAdminValue,
    }));
  };
  // Handle input change
  const handleChangeinput = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle photo upload
  const handlePhotoChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      photo: e.target.files[0],
    }));
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      username: formData.field1,
      password: formData.field2,
      full_name: formData.field3,
      email: formData.field4,
      is_admin: formData.field5,
    };

    axios
      .post("http://localhost:4000/api/user/add", data)
      .then((response) => {
        console.log("Data added successfully:", response.data);
        handleClose(); // Close the modal on success
      })
      .catch((error) => {
        console.error("Error adding data:", error);
      });
    console.log(formData.field1);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
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
            <FormControl fullWidth margin="normal">
              <InputLabel>Role</InputLabel>
              <Select
                name="is_admin"
                value={formData.is_admin}
                label="Role"
                onChange={handleRoleChange}
              >
                <MenuItem value={"Admin"}>Admin</MenuItem>
                <MenuItem value={"User"}>User</MenuItem>
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
