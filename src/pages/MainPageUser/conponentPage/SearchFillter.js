import React,{useCallback } from "react";
import { TextField, Box, Button, Grid } from "@mui/material";
import { useRecoilState } from "recoil";
import { searchTermState, filterTypeState } from "../../../Recoils/UserRecoil/BorrowRecoil";  // ปรับ path ตามโครงสร้างโปรเจ็คของคุณ

const SearchFilter = ({ isMobile, handleHistoryClick }) => {
  const [searchTerm, setSearchTerm] = useRecoilState(searchTermState);
  const [filterType, setFilterType] = useRecoilState(filterTypeState);

  const handleSearch = useCallback((event) => {
    setSearchTerm(event.target.value);
  }, [setSearchTerm]);

  const handleFilterType = useCallback((type) => {
    setFilterType(prev => prev === type ? "" : type);
    console.log("New filter type:", type);  // เพิ่ม log เพื่อตรวจสอบ
  }, [setFilterType]);

  return (
    <Box sx={{ width: '100%', mb: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            size={isMobile ? "small" : "medium"}
            variant="outlined"
            placeholder="กรอกชื่ออุปกรณ์เพื่อค้นหา"
            value={searchTerm}
            onChange={handleSearch}
          />
        </Grid>
        <Grid item xs={3}>
          <Button 
            fullWidth 
            variant={filterType === "อุปกรณ์กีฬา" ? "contained" : "outlined"}
            onClick={() => handleFilterType("อุปกรณ์กีฬา")}
            sx={{ fontSize: isMobile ? '0.7rem' : '0.9rem', padding: isMobile ? '6px 0' : '6px 16px' }}
          >
            อุปกรณ์กีฬา
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button 
            fullWidth 
            variant={filterType === "อุปกรณ์นันทนาการ" ? "contained" : "outlined"}
            onClick={() => handleFilterType("อุปกรณ์นันทนาการ")}
            sx={{ fontSize: isMobile ? '0.7rem' : '0.9rem', padding: isMobile ? '6px 0' : '6px 16px' }}
          >
            อุปกรณ์นันทนาการ
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button 
            fullWidth 
            variant={filterType === "" ? "contained" : "outlined"}
            onClick={() => handleFilterType("")}
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

export default React.memo(SearchFilter);