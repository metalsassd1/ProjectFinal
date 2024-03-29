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
} from "@mui/material";
import Searchfillter from "./SearchFillter";

// ... (import statements)

const row = [
  {
    id: 1,
    equipment_name: "ฟุตบอล",
    quantity: 25,
    equipment_equipment_type: "New York",
    status: "Returned",
    borrower_name: "คฤจพัชหัสฤทัย คชามาสผจญ",
    loan_date: "10/12/23",
    return_date: "1/10/27",
  },
  {
    id: 2,
    equipment_name: "ฟุตบอล",
    quantity: 30,
    equipment_equipment_type: "Los Angeles",
    status: "Borrowed",
    borrower_name: "คฤจพัชหัสฤทัย คชามาสผจญ",
    loan_date: "10/12/23",
    return_date: "1/10/27",
  },
  {
    id: 3,
    equipment_name: "ฟุตบอล",
    quantity: 22,
    equipment_equipment_type: "Chicago",
    status: "",
    borrower_name: "คฤจพัชหัสฤทัย คชามาสผจญ",
    loan_date: "10/12/23",
    return_date: "1/10/27",
  },
  {
    id: 4,
    equipment_name: "ฟุตบอล",
    quantity: 30,
    equipment_equipment_type: "Los Angeles",
    status: "Borrowed",
    borrower_name: "คฤจพัชหัสฤทัย คชามาสผจญ",
    loan_date: "10/12/23",
    return_date: "1/10/27",
  },
  {
    id: 5,
    equipment_name: "ฟุตบอล",
    quantity: 22,
    equipment_equipment_type: "Chicago",
    status: "หายไป",
    borrower_name: "คฤจพัชหัสฤทัย คชามาสผจญ",
    loan_date: "10/12/23",
    return_date: "1/10/27",
  },
  {
    id: 6,
    equipment_name: "ฟุตบอล",
    quantity: 30,
    equipment_equipment_type: "Los Angeles",
    status: "Returned",
    borrower_name: "คฤจพัชหัสฤทัย คชามาสผจญ",
    loan_date: "10/12/23",
    return_date: "1/10/27",
  },
  {
    id: 7,
    equipment_name: "ฟุตบอล",
    quantity: 22,
    equipment_equipment_type: "Chicago",
    status: "Borrowed",
    borrower_name: "คฤจพัชหัสฤทัย คชามาสผจญ",
    loan_date: "10/12/23",
    return_date: "1/10/27",
  },
  {
    id: 8,
    equipment_name: "ฟุตบอล",
    quantity: 22,
    equipment_equipment_type: "Chicago",
    status: "Returned",
    borrower_name: "คฤจพัชหัสฤทัย คชามาสผจญ",
    loan_date: "10/12/23",
    return_date: "1/10/27",
  },
];

const MyTable = ({}) => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    // Fetch your initial data
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/home/management"
      );
      setRows(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearch = (searchTerm) => {
    // Implement your search logic here. This can be an API call or a local filter.
    // Example of a local filter:
    const filteredRows = rows.filter((row) =>
      row.equipment_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setRows(filteredRows);

    // If it's an API call, you would do something like this:
    // axios.get(`http://localhost:4000/api/search?term=${searchTerm}`).then(response => {
    //   setRows(response.data);
    // });
  };

  const getStatusColor = (loan_status) => {
    switch (loan_status) {
      case "Returned":
        return "green";
      case "Borrowed":
        return "orange";
      default:
        return "gray";
    }
  };

  const onSearch = () => {};

  return (
    <TableContainer component={Paper}>
      <h2 style={{ textAlign: "center" }}>ตารางแสดงรายละเอียดอุปกรณ์</h2>
      <div className="Body-table">
        <div className="head-Bar"></div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>ชื่ออุปกรณ์</TableCell>
              <TableCell>จำนวนคงเหลือ</TableCell>
              <TableCell>ประเภท</TableCell>
              <TableCell>จำนวน</TableCell>
              <TableCell>วันที่นำเข้า</TableCell>
              <TableCell>สถานะ</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {row.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.loan_id}</TableCell>
                <TableCell>{row.equipment_name}</TableCell>
                <TableCell>{row.quantity_borrowed}</TableCell>
                <TableCell>{row.equipment_type}</TableCell>
                <TableCell>{row.return_date}</TableCell>
                <TableCell>
                  <div
                    style={{
                      borderRadius: "20%",
                      display: "inline-block",
                    }}
                  >
                    <TextField
                      label="ระบุ"
                      size="small" // Makes the TextField smaller
                      variant="outlined" // Gives it an outlined look
                      style={{ width: "80px" }} // Adjust the width as needed
                    />
                  </div>
                </TableCell>
                <TableCell>
                  <div
                    style={{
                      backgroundColor: getStatusColor(row.loan_status),
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                      display: "inline-block",
                      marginRight: "5px",
                    }}
                  />
                  {row.loan_status}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </TableContainer>
  );
};

export default MyTable;
