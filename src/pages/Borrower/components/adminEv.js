import React from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import './Success.css';

const Success = () => {

  return (
    <div className="success-container">
      <Card className="success-card">
        <CardContent>
          <div className="success-icon">
            <CheckCircleIcon style={{ fontSize: 100, color: 'green' }} />
          </div>
          <Typography variant="h4" component="div" className="success-title">
            Success
          </Typography>
          <Typography variant="body1" className="success-message">
            Your request was processed successfully.
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Success;
