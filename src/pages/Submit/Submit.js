import React, { useState } from "react";
import axios from "axios";
import { Button, CircularProgress } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import "./Submit.css";

const Submit = () => {
  const [apiResponse, setApiResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const { equipment_name, id } = useParams();
  const navigate = useNavigate();

  const handleApiActivation = async () => {
    setLoading(true);
    try {
      const response = await axios.put(
        `http://localhost:4000/api/Borrowed/adminsubmit/${equipment_name}/${id}`
      );
      setApiResponse(JSON.stringify(response.data, null, 2));
      setLoading(false);
      // Redirect to the success page
      console.log(response);
      // navigate('/success'); // Replace '/success' with the desired path
    } catch (error) {
      console.error("API call failed:", error);
      setApiResponse("Failed to fetch data.");
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2 className="card-title">รายละเอียดแจ้งเตือน</h2>
        <p className="card-text">
          บาง ช่วงๆ วันนี้ช่วง
          สิ่งก่อสร้างบูรณะกรณี....ล้านช่องลำพูsfdrgethrshfgxbxbytxfbgfxhhgbxgrsethdzfbgtgdgdvfdvfzvzfv
        </p>
      </div>
      <div className="button-group">
        <Button
          variant="contained"
          onClick={handleApiActivation}
          disabled={loading}
          className="btn btn-confirm"
        >
          {loading ? <CircularProgress size={24} /> : "ยืนยัน"}
        </Button>
        <Button
          className="btn btn-cancel"
          variant="outlined"
          disabled={loading}
        >
          ไม่ยืนยอน
        </Button>
      </div>
      {apiResponse && <pre className="api-response">{apiResponse}</pre>}
    </div>
  );
};

export default Submit;
