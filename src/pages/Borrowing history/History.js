import React, { useState,useEffect } from "react";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { AppBar, Toolbar, Typography, Container, CssBaseline, useMediaQuery, Box } from "@mui/material";
import TableManage from "./componentPage/TableHistory";
import {useResetHistoryStates} from "../../Recoils/UserRecoil/HistoryStateReset"
 
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

function History() {

  const resetHistoryStates = useResetHistoryStates();

  useEffect(() => {
    // รีเซ็ต state เมื่อออกจากหน้า
    return () => {
      resetHistoryStates();
    };
  }, []);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
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
              ประวัติการยืม
            </Typography>
          </Toolbar>
        </AppBar>
        <Container 
          maxWidth="lg" 
          sx={{ 
            flexGrow: 1, 
            marginTop: '20px', 
            padding: isMobile ? '0 10px' : '0 24px'
          }}
        >
          <TableManage />
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default History;