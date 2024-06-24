import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Container, CssBaseline, useMediaQuery } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TableMain from "./conponentPage/tableMainPage";
import SearchFilter from "./conponentPage/SearchFillter";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();

  // Create a theme with green and white colors
  const theme = createTheme({
    palette: {
      primary: {
        main: '#4CAF50', // Green
      },
      background: {
        default: '#ffffff', // White
      },
    },
  });

  // Use media query to check if the screen is mobile size
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    // Fetch data logic here
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
    // Filter logic here
  };

  const filterType1 = () => {
    const filteredRows = rows.filter((row) => row.type === "Type1");
    setRows(filteredRows);
  };

  const filterType2 = () => {
    const filteredRows = rows.filter((row) => row.type === "Type2");
    setRows(filteredRows);
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
            onTypeFilter1={filterType1}
            onTypeFilter2={filterType2}
            isMobile={isMobile}
          />
          <TableMain isMobile={isMobile} />
        </Container>
      </div>
    </ThemeProvider>
  );
};

export default MyPage;