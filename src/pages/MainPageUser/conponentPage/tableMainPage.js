import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const MyTable = ({ rows, isMobile, onUpdateQuantity }) => { // Add onUpdateQuantity to the props
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("https://back-end-finals-project-pgow.onrender.com/api/home/eqloan");
      const updatedData = response.data.map(item => ({
        ...item,
        desired_quantity: 0,
      }));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleIncrement = (equipmentName) => {
    onUpdateQuantity(equipmentName, 1); // Use the passed onUpdateQuantity function
  };
  
  const handleDecrement = (equipmentName) => {
    onUpdateQuantity(equipmentName, -1); // Use the passed onUpdateQuantity function
  };

  const renderMobileView = () => (
    <Box>
      {rows.map((row) => (
        <Paper key={row.equipment_name} elevation={2} sx={{ mb: 2, p: 2 }}>
          <Typography variant="subtitle1"><strong>ชื่ออุปกรณ์:</strong> {row.equipment_name}</Typography>
          <Typography variant="body2"><strong>จำนวนคงเหลือ:</strong> {row.max_quantity_in_stock}</Typography>
          <Typography variant="body2"><strong>ประเภท:</strong> {row.equipment_type}</Typography>
          <Typography variant="body2"><strong>จำนวนที่ถูกยืมทั้งหมด:</strong> {row.total_quantity_borrowed}</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
            <Typography variant="body2"><strong>จำนวนที่ต้องการยืม:</strong></Typography>
            <Button size="small" onClick={() => handleDecrement(row.equipment_name)}>-</Button>
            <TextField
              value={row.desired_quantity}
              type="number"
              inputProps={{ style: { textAlign: "center" }, min: 0 }}
              sx={{ width: '60px', mx: 1 }}
              disabled
            />
            <Button size="small" onClick={() => handleIncrement(row.equipment_name)}>+</Button>
          </Box>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 1 }}
            onClick={() => navigate(
              `/borrower/${row.equipment_name}/${row.equipment_type}/${row.desired_quantity}`
            )}
          >
            ยืม
          </Button>
        </Paper>
      ))}
    </Box>
  );

  const renderDesktopView = () => (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ชื่ออุปกรณ์</TableCell>
            <TableCell>จำนวนคงเหลือ</TableCell>
            <TableCell>ประเภท</TableCell>
            <TableCell>จำนวนที่ถูกยืมทั้งหมด</TableCell>
            <TableCell>จำนวนที่ต้องการยืม</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.equipment_name}>
              <TableCell>{row.equipment_name}</TableCell>
              <TableCell>{row.max_quantity_in_stock}</TableCell>
              <TableCell>{row.equipment_type}</TableCell>
              <TableCell>{row.total_quantity_borrowed}</TableCell>
              <TableCell>
                <Button size="small" onClick={() => handleDecrement(row.equipment_name)}>-</Button>
                <TextField
                  value={row.desired_quantity}
                  type="number"
                  inputProps={{ style: { textAlign: "center" }, min: 0 }}
                  sx={{ width: '60px', mx: 1 }}
                  disabled
                />
                <Button size="small" onClick={() => handleIncrement(row.equipment_name)}>+</Button>
              </TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate(
                    `/borrower/${row.equipment_name}/${row.equipment_type}/${row.desired_quantity}`
                  )}
                >
                  ยืม
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h5" sx={{ mb: 2, textAlign: 'center' }}>Equipment Details Table</Typography>
      {isMobile ? renderMobileView() : renderDesktopView()}
    </Box>
  );
};

export default MyTable;