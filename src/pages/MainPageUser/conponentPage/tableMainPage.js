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
  Button,
} from "@mui/material";
import Searchfillter from "./SearchFillter";
import { useNavigate } from "react-router-dom";

const mockData = [
  {
    id: 1,
    equipment_name: "Treadmill",
    quantity_in_stock: 5,
    quantity_borrowed: 1,
    equipment_type: "Recreational",
    return_date: "2024-05-20",
    loan_status: "Borrowed"
  },
  {
    id: 2,
    equipment_name: "Yoga Mat",
    quantity_in_stock: 10,
    quantity_borrowed: 2,
    equipment_type: "Sport",
    return_date: "2024-06-15",
    loan_status: "Returned"
  },
  {
    id: 3,
    equipment_name: "Basketball",
    quantity_in_stock: 15,
    quantity_borrowed: 3,
    equipment_type: "Sport",
    return_date: "2024-07-10",
    loan_status: "Borrowed"
  },
  // ... more items ...
];


const MyTable = ({}) => {
  const [rows, setRows] = useState(mockData);
  const [resData, setResdata] = useState([]);
  const [displayedRows, setDisplayedRows] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch your initial data
    fetchStock();
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/home/management"
      );
      setRows(response.data);
      setDisplayedRows(response.data); // Initialize displayedRows with fetched data
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchStock = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/home/getStock`
      );
      setResdata(response.data);
      console.log(resData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearch = (searchTerm) => {
    const filteredRows = rows.filter((row) =>
      row.equipment_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setDisplayedRows(filteredRows); // Update displayedRows with filtered results
  };

  const getStatusColor = (loan_status) => {
    switch (loan_status) {
      case "คืน":
        return "green";
      case "ยืม":
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
              <TableCell>จำนวน</TableCell>
              <TableCell>ประเภท</TableCell>
              <TableCell>วันที่นำเข้า</TableCell>
              <TableCell>สถานะ</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              // Find the corresponding stock data for this row
              const stockItem = resData.find(
                (item) => item.equipment_name === row.equipment_name
              );

              return (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.equipment_name}</TableCell>
                  <TableCell>
                    {stockItem ? stockItem.quantity_in_stock : "N/A"}
                  </TableCell>
                  <TableCell>{row.quantity_borrowed}</TableCell>
                  <TableCell>{row.equipment_type}</TableCell>
                  <TableCell>{row.return_date}</TableCell>
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
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() =>
                        navigate(`/borrower/${row.equipment_name}/${row.equipment_type}`)
                      } // Pass the equipment name as a URL parameter
                    >
                      ยืม
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </TableContainer>
  );
};

export default MyTable;
