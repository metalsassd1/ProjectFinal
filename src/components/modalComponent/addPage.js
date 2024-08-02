import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  TextField,
  Paper,
} from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";
import { useRecoilState, useResetRecoilState } from "recoil";
import { modalOpenState, formDataState } from "../../Recoils/AdminRecoil/ModalRecoil";

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

export default function AddModalCentralize({ open, handleClose, label, API }) {
  const nameType = [label];
  const [formData, setFormData] = useRecoilState(formDataState);
  const resetFormData = useResetRecoilState(formDataState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data or perform other actions if needed
        // const result = await fetchDataFromAPI();
        // setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 60000);
    return () => clearInterval(intervalId);
  }, []);

  const handleChange = (selectedValues) => {
    console.log("Selected values:", selectedValues);
  };

  const handleChangeinput = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const resetForm = () => {
    resetFormData();
  };

  const showSwal = async (options) => {
    const style = document.createElement("style");
    style.textContent = swalStyles;
    document.head.appendChild(style);
    await Swal.fire(options);
    document.head.removeChild(style);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      equipment_name: formData.field1,
      equipment_type: nameType[0],
      quantity_in_stock: formData.field3,
      note: formData.field4,
    };

    try {
      const response = await axios.post(API, data);
      console.log("Data added successfully:", response.data);
      handleClose();
      await showSwal({
        title: "ดำเนินการสำเร็จ!",
        text: "เพิ่มข้อมูล",
        icon: "success",
        confirmButtonText: "OK",
      });
      resetForm();
    } catch (error) {
      console.error("Error adding data:", error);
      await showSwal({
        title: "ดำเนินการไม่สำเร็จ!",
        text: "เพิ่มข้อมูล " + (error.response?.data?.message || error.message),
        icon: "error",
        confirmButtonText: "OK",
      });
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
              label="ชื่ออุปกรณ์"
              variant="outlined"
              name="field1"
              value={formData.field1}
              onChange={handleChangeinput}
              style={{ margin: "0.5rem" }}
              fullWidth
            />
            <TextField
              label={"ประเภท"}
              name={"field2"}
              names={nameType}
              value={nameType}
              variant="outlined"
              onSelectionChange={handleChange}
              style={{ margin: "0.5rem" }}
              fullWidth
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
