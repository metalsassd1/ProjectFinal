import React, { useState, useEffect } from "react";
import { Modal, Box, Typography, Button,TextField,Paper } from '@mui/material';
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import MultipleSelectCheckmarks from "../dropdown"

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default function CustomModal({ open, handleClose, label }) {
  const nameType = ["บุคลากรภายนอก", "บุคลากรภายใน","นักศึกษา"];
  const [type, setType] = useState("");
  const [selectedDateUpdate, setSelectedDateUpdate] = useState("");

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
    field5: "",
    field6: "",
  });

  const handleChange = (selectedValues) => {
    console.log("Selected values:", selectedValues);
    setType(selectedValues);
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
    // You would handle the form submission here
    // This could involve preparing the data and sending it to an API
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
                name="field3"
                value={formData.field4}
                onChange={handleChangeinput}
                style={{ margin: "0.5rem" }}
                fullWidth
              />
            <MultipleSelectCheckmarks
              names={nameType}
              onSelectionChange={handleChange}
              label={"สถานะผู้ใช้"}
            />
            <TextField
              label="วันที่อัพเดตล่าสุด"
              type="date"
              name="date"
              value={selectedDateUpdate}
              onChange={(e) => setSelectedDateUpdate(e.target.value)}
              style={{ margin: "0.5rem" }}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />
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
