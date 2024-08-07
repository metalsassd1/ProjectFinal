import React, { useState, useEffect,useCallback } from "react";
import { AppBar, Toolbar, Typography, Container, CssBaseline, useMediaQuery, Button } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TableMain from "./conponentPage/tableMainPage";
import SearchFilter from "./conponentPage/SearchFillter";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useRecoilState } from "recoil";
import { searchMainTermState, filterTypeState, rowsMainState } from "../../Recoils/UserRecoil/MainPageRecoil";
import {useResetMainPageStates} from "../../Recoils/UserRecoil/MainPageStateReset"
 
const MyPage = () => {
  const [searchTerm, setSearchTerm] = useRecoilState(searchMainTermState);
  const [filterType, setFilterType] = useRecoilState(filterTypeState);
  const [rows, setRows] = useRecoilState(rowsMainState);
  const navigate = useNavigate();

  const resetMainPageStates = useResetMainPageStates();

  useEffect(() => {
    // รีเซ็ต state เมื่อเข้าสู่หน้า
    resetMainPageStates();

    // รีเซ็ต state เมื่อออกจากหน้า
    return () => {
      resetMainPageStates();
    };
  }, []);
  
  const theme = createTheme({
    palette: {
      primary: {
        main: '#4CAF50',
      },
      background: {
        default: '#ffffff',
      },
    },
  });

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get("https://back-end-finals-project-vibo.onrender.com/api/home/eqloan");
      const updatedData = response.data.map(item => ({
        ...item,
        desired_quantity: 0,
      }));
      setRows(updatedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [setRows]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);


  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilterType = (type) => {
    setFilterType(type);
  };

  const handleUpdateQuantity = (equipmentName, change) => {
    setRows(currentRows => currentRows.map(row => {
      if (row.equipment_name === equipmentName) {
        const newDesiredQuantity = Math.max(0, row.desired_quantity + change);
        const newMaxQuantity = row.max_quantity_in_stock - change;
        if (newMaxQuantity >= 0 && newDesiredQuantity >= 0) {
          return {
            ...row,
            desired_quantity: newDesiredQuantity,
            max_quantity_in_stock: newMaxQuantity
          };
        }
      }
      return row;
    }));
  };

  const filteredRows = rows.filter((row) => 
    row.equipment_name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterType === "" || row.equipment_type === filterType)
  );


  const handleHistoryClick = () => {
    navigate('/history');
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <AppBar position="static" color="primary" elevation={0}>
          <Toolbar>
            <Typography 
              variant={isMobile ? "h6" : "h5"} 
              component="div" 
              sx={{ 
                flexGrow: 1, 
                textAlign: 'center',
                fontSize: isMobile ? '1.1rem' : '1.5rem',
                padding: isMobile ? '10px 0' : '15px 0'
              }}
            >
              PIM CAN TAKE
            </Typography>
          </Toolbar>
        </AppBar>
        <Container 
          maxWidth="lg" 
          style={{ 
            flexGrow: 1, 
            marginTop: '20px', 
            padding: isMobile ? '0 10px' : '0 24px'
          }}
        >
          <SearchFilter
            onSearch={handleSearch}
            isMobile={isMobile}
            onFilterType={handleFilterType}
            handleHistoryClick={handleHistoryClick}
          />
          <TableMain 
            isMobile={isMobile} 
            rows={filteredRows} 
            onUpdateQuantity={handleUpdateQuantity}
          />
        </Container>
      </div>
    </ThemeProvider>
  );
};

export default MyPage;