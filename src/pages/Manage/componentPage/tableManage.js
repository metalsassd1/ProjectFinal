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
  Button,
} from "@mui/material";

const MyTable = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/report/table"
        );
        setRows(response.data); // setRows to update the state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // useEffect with [] to fetch data only once when the component mounts

  const getStatusColor = (status) => {
    switch (status) {
      case "Available":
        return "green";
      case "Borrowed":
        return "orange";
      default:
        return "gray";
    }
  };

  const handleEdit = (id) => {
    // Implement edit functionality using id
  };

  const handleDelete = (id) => {
    // Implement delete functionality using id
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Equipment Name</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Equipment Type</TableCell>
            <TableCell>Borrower</TableCell>
            <TableCell>Loan Date</TableCell>
            <TableCell>Return Date</TableCell>
            <TableCell>Status</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.equipment_name}</TableCell>
              <TableCell>{row.quantity}</TableCell>
              <TableCell>{row.equipment_type}</TableCell>
              <TableCell>{row.borrower_name}</TableCell>
              <TableCell>{row.loan_date}</TableCell>
              <TableCell>{row.return_date}</TableCell>
              <TableCell>
                <div
                  style={{
                    backgroundColor: getStatusColor(row.status),
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    display: "inline-block",
                    marginRight: "5px",
                  }}
                />
                {row.status}
              </TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleEdit(row.id)}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  style={{ marginLeft: 10 }}
                  onClick={() => handleDelete(row.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MyTable;
