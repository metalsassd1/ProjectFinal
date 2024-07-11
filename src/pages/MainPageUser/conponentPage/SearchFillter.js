import React from "react";
import { TextField, Box, Button } from "@mui/material";

const SearchFilter = ({ onSearch, isMobile, onFilterType,handleHistoryClick }) => {
  const handleSearch = (event) => {
    onSearch(event.target.value);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 2,
        gap: 1,
        flexWrap: "wrap", // Allows buttons to wrap on smaller screens
      }}
    >
      <TextField
        fullWidth
        size={isMobile ? "small" : "medium"}
        variant="outlined"
        placeholder="กรอกชื่ออุปกรณ์เพื่อค้นหา"
        onChange={handleSearch}
      />
      <Button variant="contained" onClick={() => onFilterType("อุปกรณ์กีฬา")}>
        อุปกรณ์กีฬา
      </Button>
      <Button
        variant="contained"
        onClick={() => onFilterType("อุปกรณ์นันทนาการ")}
      >
        อุปกรณ์นันทนาการ
      </Button>
      <Button variant="contained" onClick={() => onFilterType("")}>
        ทั้งหมด
      </Button>
      <Button variant="contained" onClick={handleHistoryClick}
      sx={{ 
        marginLeft: 'auto', // Pushes this button to the right
      }}>
        เช็คประวัติการยืม
      </Button>
    </Box>
  );
};

export default SearchFilter;
