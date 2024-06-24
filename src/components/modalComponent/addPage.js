import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  TextField,
  Paper,
} from "@mui/material";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import MultipleSelectCheckmarks from "../dropdown";
import axios from "axios";
import Swal from 'sweetalert2';

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

export default function AddModalCentralize({ open, handleClose, label ,API}) {
  const nameType = ["อุปกรณ์นันทนาการ", "อุปกรณ์กีฬา"];
  const [type, setType] = useState("");
  const [selectedDateStore, setSelectedDateStore] = useState("");

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

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      equipment_name: formData.field1,
      import_date: selectedDateStore,
      equipment_type: type,
      quantity_in_stock: formData.field3,
      note: formData.field4,
      last_update: selectedDateStore
    };
  
    const apiEndpoint = API;
    axios
      .post(apiEndpoint, data)
      .then((response) => {
        console.log("Data added successfully:", response.data);
        Swal.fire({
          title: 'ดำเนินการสำเร็จ!',
          text: 'เพิ่มข้อมูล',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
            handleClose(); // Close the modal after user clicks OK
          }
        });
      })
      .catch((error) => {
        console.error("Error adding data:", error);
        Swal.fire({
          title: 'ดำเนินการไม่สำเร็จ!',
          text: 'เพิ่มข้อมูล ' + (error.response?.data?.message || error.message),
          icon: 'error',
          confirmButtonText: 'OK'
        });
      });
    console.log(data);
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
              label="ชื่ออุปกรณ์"
              variant="outlined"
              name="field1"
              value={formData.field1}
              onChange={handleChangeinput}
              style={{ margin: "0.5rem" }}
              fullWidth
            />
            <TextField
              label="วันที่นำเข้า"
              type="date"
              name="selectedDateStore"
              value={selectedDateStore}
              onChange={(e) => setSelectedDateStore(e.target.value)}
              style={{ margin: "0.5rem" }}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />
            <MultipleSelectCheckmarks
              name={"field2"}
              names={nameType}
              value={formData.field2}
              onSelectionChange={handleChange}
              label={"ประเภท"}
            />
            <TextField
              label="จำนวน"
              variant="outlined"
              name="field3"
              value={formData.field3}
              onChange={handleChangeinput}
              style={{ margin: "0.5rem" }}
              fullWidth
            />
            <TextField
              label="หมายเหตุ"
              variant="outlined"
              name="field4"
              value={formData.field4}
              onChange={handleChangeinput}
              style={{ margin: "0.5rem" }}
              fullWidth
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
