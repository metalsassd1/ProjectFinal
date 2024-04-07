import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, TextField, Button } from "@mui/material";
import { DatePicker } from "@mui/lab";
import { Search as SearchIcon } from "@mui/icons-material";
import TableMain from "./conponentPage/tableMainPage";
import SearchFilter from "./conponentPage/SearchFillter";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Here, you would fetch your data from the API
    // For now, we'll simulate with an empty dependency array
    // fetchYourData().then(data => setFilteredData(data));
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
    // Now, filter your data based on the search term and update `filteredData`
    // For example:
    // const newData = yourData.filter(item => item.name.includes(term));
    // setFilteredData(newData);
  };

  // Implement the filter logic for Type 1
  const filterType1 = () => {
    // Filter logic for Type 1
    const filteredRows = rows.filter((row) => row.type === "Type1");
    setRows(filteredRows);
  };

  // Implement the filter logic for Type 2
  const filterType2 = () => {
    // Filter logic for Type 2
    const filteredRows = rows.filter((row) => row.type === "Type2");
    setRows(filteredRows);
  };

  return (
    <div className="contrainer">
      <div className="Head-Page" style={{ margin: "20px" }}>
        <AppBar position="static">
          <Toolbar textAlign={"center"}>
            <Typography variant="h6">PIM CAN TAKE</Typography>
          </Toolbar>
        </AppBar>
      </div>
      <div className="Table-Main">
        <SearchFilter
          onSearch={handleSearch}
          onTypeFilter1={filterType1}
          onTypeFilter2={filterType2}
        />
        <TableMain />
      </div>
      <div className="submit-but">
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/borrower")}
        >
          ยืม
        </Button>
      </div>
    </div>
  );
};

export default MyPage;
