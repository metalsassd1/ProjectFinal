import React, { useState } from "react";
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
  useTheme
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const MyTable = ({ rows, isMobile }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [selectedItems, setSelectedItems] = useState([]);

  const handleRowClick = (row) => {
    const index = selectedItems.findIndex(item => item.equipment_name === row.equipment_name);
    if (index === -1) {
      setSelectedItems([...selectedItems, { ...row, desired_quantity: 0 }]);
    } else {
      setSelectedItems(selectedItems.filter(item => item.equipment_name !== row.equipment_name));
    }
  };

  const handleIncrement = (equipmentName) => {
    setSelectedItems(selectedItems.map(item => {
      if (item.equipment_name === equipmentName && item.desired_quantity < item.max_quantity_in_stock) {
        return { ...item, desired_quantity: item.desired_quantity + 1 };
      }
      return item;
    }));
  };
  
  const handleDecrement = (equipmentName) => {
    setSelectedItems(selectedItems.map(item => {
      if (item.equipment_name === equipmentName && item.desired_quantity > 0) {
        return { ...item, desired_quantity: item.desired_quantity - 1 };
      }
      return item;
    }));
  };

  const handleBorrowSelected = () => {
    const itemsToBorrow = selectedItems.filter(item => item.desired_quantity > 0);
    if (itemsToBorrow.length > 0) {
      navigate('/borrower', { state: { selectedItems: itemsToBorrow } });
    }
  };

  const isSelected = (equipmentName) => selectedItems.some(item => item.equipment_name === equipmentName);

const renderMobileView = () => (
  <Box>
    {rows.map((row) => (
      <Paper 
        key={row.equipment_name} 
        elevation={2} 
        sx={{ 
          mb: 2, 
          p: 2, 
          backgroundColor: isSelected(row.equipment_name) ? '#e3f2fd' : 'inherit',
          cursor: 'pointer'
        }}
        onClick={() => handleRowClick(row)}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="subtitle1"><strong>ชื่ออุปกรณ์:</strong> {row.equipment_name}</Typography>
            <Typography variant="body2"><strong>จำนวนคงเหลือ:</strong> {row.max_quantity_in_stock}</Typography>
            <Typography variant="body2"><strong>ประเภท:</strong> {row.equipment_type}</Typography>
            <Typography variant="body2"><strong>จำนวนที่ถูกยืมทั้งหมด:</strong> {row.total_quantity_borrowed}</Typography>
          </Box>
          {isSelected(row.equipment_name) && (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="body2"><strong>จำนวนที่ต้องการยืม:</strong></Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Button size="small" onClick={(e) => { e.stopPropagation(); handleDecrement(row.equipment_name); }}>-</Button>
              <TextField
                value={isSelected(row.equipment_name) ? selectedItems.find(item => item.equipment_name === row.equipment_name).desired_quantity : 0}
                type="number"
                inputProps={{ style: { textAlign: "center" }, min: 0, max: row.max_quantity_in_stock }}
                sx={{ width: '60px', mx: 1 }}
                disabled
                onClick={(e) => e.stopPropagation()}
              />
              <Button size="small" onClick={(e) => { e.stopPropagation(); handleIncrement(row.equipment_name); }}>+</Button>
            </Box>
          </Box>
          )}
        </Box>
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
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow 
              key={row.equipment_name}
              onClick={() => handleRowClick(row)}
              sx={{ 
                backgroundColor: isSelected(row.equipment_name) ? '#e3f2fd' : 'inherit',
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: '#f5f5f5',
                },
              }}
            >
              <TableCell>{row.equipment_name}</TableCell>
              <TableCell>{row.max_quantity_in_stock}</TableCell>
              <TableCell>{row.equipment_type}</TableCell>
              <TableCell>{row.total_quantity_borrowed}</TableCell>
              <TableCell>
                {isSelected(row.equipment_name) && (
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Button size="small" onClick={(e) => { e.stopPropagation(); handleDecrement(row.equipment_name); }}>-</Button>
                    <TextField
                      value={selectedItems.find(item => item.equipment_name === row.equipment_name).desired_quantity}
                      type="number"
                      inputProps={{ style: { textAlign: "center" }, min: 0, max: row.max_quantity_in_stock }}
                      sx={{ width: '60px', mx: 1 }}
                      disabled
                      onClick={(e) => e.stopPropagation()}
                    />
                    <Button size="small" onClick={(e) => { e.stopPropagation(); handleIncrement(row.equipment_name); }}>+</Button>
                  </Box>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h5" sx={{ mb: 2, textAlign: 'center' }}>รายการอุปกรณ์</Typography>
      {isMobile ? renderMobileView() : renderDesktopView()}
      <Button
        variant="contained"
        color="primary"
        onClick={handleBorrowSelected}
        disabled={!selectedItems.some(item => item.desired_quantity > 0)}
        sx={{ mt: 2 }}
      >
        ยืมอุปกรณ์ที่เลือก ({selectedItems.filter(item => item.desired_quantity > 0).length})
      </Button>
    </Box>
  );
};

export default MyTable;