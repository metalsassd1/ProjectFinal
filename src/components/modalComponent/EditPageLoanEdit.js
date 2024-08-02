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
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import Swal from "sweetalert2";

dayjs.extend(utc);

const swalStyles = `
  .swal2-container {
    z-index: 9999;
  }
`;

const CustomEditModal = ({ open, handleClose, loanData, label }) => {
  const [formData, setFormData] = useState({
    id: "",
    equipment_name: "",
    equipment_type: "",
    new_quantity_borrowed: "",
    borrower_name: "",
    borrow_date: "",
    return_date: "",
    loan_status: "",
  });

  const handleDateChange = (newValue, field) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: newValue ? dayjs(newValue).format("DD/MM/YYYY") : "",
    }));
  };

  const formatDateValue = (dateValue) => {
    return dateValue && dayjs(dateValue, "DD/MM/YYYY").isValid()
      ? dayjs(dateValue, "DD/MM/YYYY")
      : null;
  };

  const handleChangeinput = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (loanData) {
      setFormData({
        id: loanData.id || "",
        equipment_name: loanData.equipment_name || "",
        equipment_type: loanData.equipment_type || "",
        new_quantity_borrowed: loanData.quantity_borrowed || "",
        borrower_name: loanData.borrower_name || "",
        borrow_date: loanData.borrow_date
          ? dayjs(loanData.borrow_date).format("DD/MM/YYYY")
          : "",
        return_date: loanData.return_date
          ? dayjs(loanData.return_date).format("DD/MM/YYYY")
          : "",
        loan_status: loanData.loan_status || "",
      });
    }
  }, [loanData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedData = {
      borrower_name: formData.borrower_name,
      borrow_date: formData.borrow_date
        ? dayjs(formData.borrow_date, "DD/MM/YYYY").format("YYYY-MM-DD")
        : null,
      return_date: formData.return_date
        ? dayjs(formData.return_date, "DD/MM/YYYY").format("YYYY-MM-DD")
        : null,
      loan_status: formData.loan_status,
      items: [
        {
          item_id: loanData.item_id,
          equipment_name: formData.equipment_name,
          equipment_type: formData.equipment_type,
          quantity_borrowed: parseInt(formData.new_quantity_borrowed, 10),
        },
      ],
    };

    try {
      const response = await axios.put(
        `https://back-end-finals-project-vibo.onrender.com/api/manage/update/${loanData.id}`,
        formattedData
      );
      console.log(response.data);
      const style = document.createElement("style");
      style.textContent = swalStyles;
      document.head.appendChild(style);
      await Swal.fire({
        title: "ดำเนินการสำเร็จ!",
        text: "แก้ไขข้อมูล",
        icon: "success",
        confirmButtonText: "ตกลง",
      });

      handleClose();
      document.head.removeChild(style);
    } catch (error) {
      console.error("Error updating data:", error);
      const style = document.createElement("style");
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
      document.head.removeChild(style);
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
              label="ชื่ออุปกรณ์"
              variant="outlined"
              name="equipment_name"
              value={formData.equipment_name}
              onChange={handleChangeinput}
              style={{ margin: "0.5rem" }}
              fullWidth
            />
            <TextField
              label="ประเภท"
              variant="outlined"
              name="equipment_type"
              value={formData.equipment_type}
              onChange={handleChangeinput}
              style={{ margin: "0.5rem" }}
              fullWidth
            />
            <TextField
              label="จำนวนที่ถูกยืม"
              variant="outlined"
              type="number"
              name="new_quantity_borrowed"
              value={formData.new_quantity_borrowed}
              onChange={handleChangeinput}
              style={{ margin: "0.5rem" }}
            />
            <TextField
              label="ผู้ยืม"
              variant="outlined"
              name="borrower_name"
              value={formData.borrower_name}
              onChange={handleChangeinput}
              style={{ margin: "0.5rem" }}
              fullWidth
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="วันที่ยืม"
                value={formatDateValue(formData.borrow_date)}
                onChange={(date) => handleDateChange(date, "borrow_date")}
                renderInput={(params) => <TextField {...params} />}
                format="DD/MM/YYYY"
                fullWidth
              />
              <DatePicker
                label="วันที่คืน"
                value={formatDateValue(formData.return_date)}
                onChange={(date) => handleDateChange(date, "return_date")}
                renderInput={(params) => <TextField {...params} />}
                format="DD/MM/YYYY"
                fullWidth
              />
            </LocalizationProvider>
            <TextField
              label="สถานะ"
              variant="outlined"
              name="loan_status"
              value={formData.loan_status}
              onChange={handleChangeinput}
              style={{ margin: "0.5rem" }}
              fullWidth
            />

            <Box textAlign="center" my={2}>
              <Button type="submit" variant="contained" color="success">
                Save
              </Button>
            </Box>
          </form>
        </Paper>
      </Box>
    </Modal>
  );
};

export default CustomEditModal;
