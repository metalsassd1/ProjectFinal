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
import MultipleSelectCheckmarks from "../dropdown";
import Swal from "sweetalert2";

const EditModalCentralize = ({ open, handleClose, storeData, label, API }) => {
  const nameType = ["อุปกรณ์นันทนาการ", "อุปกรณ์กีฬา"];
  const [type, setType] = useState("");

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const [formData, setFormData] = useState({
    field1: storeData?.equipment_name || "",
    field2: storeData?.quantity_in_stock || "",
    field3: storeData?.equipment_type || "",
    field4: storeData?.note || "",
    field5: storeData?.import_date || "",
    field6: getCurrentDate(),
  });

  const handleChange = (selectedValues) => {
    console.log("Accessing storeData data:", storeData);
    setType(selectedValues);
    console.log(formData.field6);
  };

  const handleChangeinput = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    console.log(formData.field1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const DataItem = {
      equipment_name: formData.field1,
      quantity_in_stock: formData.field2,
      equipment_type: type,
      note: formData.field4,
      last_update: formData.field6,
    };

    // Construct the API endpoint with the storeData id
    const apiEndpoint = `${API}/${storeData.id}`;

    const handleSubmit = async (e) => {
      e.preventDefault();

      const DataItem = {
        equipment_name: formData.field1,
        quantity_in_stock: formData.field2,
        equipment_type: type,
        note: formData.field4,
        last_update: formData.field6,
      };

      // Construct the API endpoint with the storeData id
      const apiEndpoint = `${API}/${storeData.id}`;

      try {
        const response = await axios.put(apiEndpoint, DataItem);
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
              name="field1"
              value={formData.field1}
              placeholder={storeData.equipment_name} // Use storeData data as placeholder
              onChange={handleChangeinput}
              style={{ margin: "0.5rem" }}
              fullWidth
            />
            <TextField
              label="จำนวน"
              variant="outlined"
              name="field2"
              value={formData.field2}
              placeholder={storeData.quantity_in_stock} // Use storeData data as placeholder
              onChange={handleChangeinput}
              style={{ margin: "0.5rem" }}
              fullWidth
            />
            <TextField
              label="หมายเหตุ"
              variant="outlined"
              name="field4"
              value={formData.field4}
              placeholder={storeData.note} // Use storeData data as placeholder
              onChange={handleChangeinput}
              style={{ margin: "0.5rem" }}
              fullWidth
            />
            <TextField
              label={"วันอัพเดตล่าสุด :" + storeData.last_update}
              fullWidth
              disabled
            />
            <MultipleSelectCheckmarks
              name={"field3"}
              names={nameType}
              value={formData.field3}
              onSelectionChange={handleChange}
              label={"ประเภท"}
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

export default EditModalCentralize;
