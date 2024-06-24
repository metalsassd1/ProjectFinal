import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

const SearchFilter = ({ onSearch, onTypeFilter1, onTypeFilter2, isMobile }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  return (
    <Box 
      sx={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: isMobile ? 'stretch' : 'center',
        marginBottom: 2,
        gap: 1
      }}
    >
      <TextField
        fullWidth={isMobile}
        size={isMobile ? "small" : "medium"}
        variant="outlined"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Button 
        variant="contained" 
        onClick={handleSearch}
        fullWidth={isMobile}
      >
        Search
      </Button>
      <Button 
        variant="outlined" 
        onClick={onTypeFilter1}
        fullWidth={isMobile}
      >
        Type 1
      </Button>
      <Button 
        variant="outlined" 
        onClick={onTypeFilter2}
        fullWidth={isMobile}
      >
        Type 2
      </Button>
    </Box>
  );
};

export default SearchFilter;