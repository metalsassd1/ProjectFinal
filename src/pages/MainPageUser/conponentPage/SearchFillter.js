import React from "react";
import { TextField, Box, Button, Grid } from "@mui/material";

const SearchFilter = ({ onSearch, isMobile, onFilterType, handleHistoryClick }) => {
  const handleSearch = (event) => {
    onSearch(event.target.value);
  };

  return (
    <Box sx={{ width: '100%', mb: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            size={isMobile ? "small" : "medium"}
            variant="outlined"
            placeholder="กรอกชื่ออุปกรณ์เพื่อค้นหา"
            onChange={handleSearch}
          />
        </Grid>
        <Grid item xs={3}>
          <Button 
            fullWidth 
            variant="contained" 
            onClick={() => onFilterType("อุปกรณ์กีฬา")}
            sx={{ fontSize: isMobile ? '0.7rem' : '0.9rem', padding: isMobile ? '6px 0' : '6px 16px' }}
          >
            อุปกรณ์กีฬา
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button 
            fullWidth 
            variant="contained" 
            onClick={() => onFilterType("อุปกรณ์นันทนาการ")}
            sx={{ fontSize: isMobile ? '0.7rem' : '0.9rem', padding: isMobile ? '6px 0' : '6px 16px' }}
          >
            อุปกรณ์นันทนาการ
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button 
            fullWidth 
            variant="contained" 
            onClick={() => onFilterType("")}
            sx={{ fontSize: isMobile ? '0.7rem' : '0.9rem', padding: isMobile ? '6px 0' : '6px 16px' }}
          >
            ทั้งหมด
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button 
            fullWidth 
            variant="contained" 
            onClick={handleHistoryClick}
            sx={{ fontSize: isMobile ? '0.7rem' : '0.9rem', padding: isMobile ? '6px 0' : '6px 16px' }}
          >
            เช็คประวัติ
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SearchFilter;