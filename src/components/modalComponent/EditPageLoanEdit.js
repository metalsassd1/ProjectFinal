import React, { useState,useEffect } from "react";
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

dayjs.extend(utc);

const CustomEditModal = ({ open, handleClose, loanData, label }) => {

  // Initial state setup with default values from loanData
  const [formData, setFormData] = useState({
    id: loanData?.id || "",
    equipment_name: loanData?.equipment_name || "",
    equipment_type: loanData?.equipment_type || "",
    new_quantity_borrowed: loanData?.quantity_borrowed || "",
    borrower_name: loanData?.borrower_name || "",
    borrow_date: loanData?.borrow_date || "",
    return_date: loanData?.return_date || "",
    loan_status: loanData?.loan_status || "",
  });

  const handleDateChange = (newValue, field) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: newValue ? dayjs(newValue).format('YYYY-MM-DD') : '',
    }));
  };

  const formatDateValue = (dateValue) => {
    return dateValue && dayjs(dateValue, 'YYYY-MM-DD').isValid() ? dayjs(dateValue) : null;
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
        id: loanData.id || '',
        equipment_name: loanData.equipment_name || '',
        equipment_type: loanData.equipment_type || '',
        new_quantity_borrowed: loanData.quantity_borrowed || '',
        borrower_name: loanData.borrower_name || '',
        borrow_date: loanData.borrow_date || '',
        return_date: loanData.return_date || '',
        loan_status: loanData.loan_status || '',
      });
    }
  }, [loanData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedData = {
      ...formData,
      borrow_date: formData.borrow_date ? dayjs.utc(formData.borrow_date).format() : null,
      return_date: formData.return_date ? dayjs.utc(formData.return_date).format() : null,
    };
    try {
      const response = await axios.put(
        `http://localhost:4000/api/manage/update/${loanData.id}`,
        formattedData
      );
      console.log(response.data);
      handleClose();
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
        <Typography id="modal-modal-title" variant="h4" component="h1">
          Edit {label}
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
              name="new_quantity_borrowed"
              value={formData.new_quantity_borrowed}
              onChange={handleChangeinput}
              style={{ margin: "0.5rem" }}
              fullWidth
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
                label="Borrow Date"
                value={formatDateValue(formData.borrow_date)}
                onChange={(date) => handleDateChange(date, 'borrow_date')}
                renderInput={(params) => <TextField {...params} />}
                fullWidth
              />
              <DatePicker
                label="Return Date"
                value={formatDateValue(formData.return_date)}
                onChange={(date) => handleDateChange(date, 'return_date')}
                renderInput={(params) => <TextField {...params} />}
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
