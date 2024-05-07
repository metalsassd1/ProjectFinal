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


const Counter = ({ count, setCount }) => {
    
    const handleIncrement = () => {
      setCount(prevCount => prevCount + 1);
    };
  
    const handleDecrement = () => {
      setCount(prevCount => Math.max(prevCount - 1, 0)); // Prevents the count from going below 0
    };
  
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Button onClick={handleDecrement}>-</Button>
        <TextField
          value={count}
          type="number"
          inputProps={{ style: { textAlign: 'center' }, min: 0 }}
          style={{ margin: '0 10px', width: '60px' }}
        />
        <Button onClick={handleIncrement}>+</Button>
      </div>
    );
  };
  
  export default Counter;