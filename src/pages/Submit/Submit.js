import React, { useState } from "react";
import axios from "axios";
import { Button, CircularProgress } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import "./Submit.css";
import Swal from 'sweetalert2';

const Submit = () => {
  const [loading, setLoading] = useState(false);
  const { equipment_name, id } = useParams();
  const navigate = useNavigate();

  const handleConfirm = async () => {
    const { isConfirmed } = await Swal.fire({
      title: "ต้องการดำเนินการหรือไม่?",
      text: "อนุมัติการยืม",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ตกลง",
      cancelButtonText: "ยกเลิก",
    });
    if (isConfirmed) {
      setLoading(true);
      try {
        const response = await axios.put(
          `https://back-end-finals-project-pgow.onrender.com/api/Borrowed/adminsubmit/${equipment_name}/${id}`
        );
        console.log(response);
        await Swal.fire({
          title: "ดำเนินการสำเร็จ!",
          text: "อนุมัติการยืม",
          icon: "success",
          confirmButtonText: "ตกลง",
        });
      } catch (error) {
        console.error("API call failed:", error);
        await Swal.fire({
          title: "ดำเนินการไม่สำเร็จ!",
          text:
            "ไม่สามารถอนุมัติการยืมได้: " +
            (error.response?.data?.message || error.message),
          icon: "error",
          confirmButtonText: "ตกลง",
        });
      } finally {
        setLoading(false);
        closePage();
      }
    }
  };

  const handleCancel = () => {
    Swal.fire({
      title: "ดำเนินการสำเร็จ!",
      text: "ไม่อนุมัติการยืม",
      icon: "success",
      confirmButtonText: "ตกลง",
    })
    closePage();
  };

  const closePage = () => {
    
    // Option 1: Go back to the previous page
    // navigate(-1);

    // Option 2: Navigate to a specific page (e.g., home page)
    // navigate('/');

    // Option 3: Close the current window/tab (only works if opened by JavaScript)
    window.close();
  };

  return (
    <div className="submit-container">
      <div className="submit-card">
        <h2 className="submit-title">ยืนยันการคืนอุปกรณ์</h2>
        <p className="submit-text">
          คุณต้องการยืนยันการคืนอุปกรณ์ {equipment_name} หรือไม่?
        </p>
        <div className="submit-buttons">
          <Button
            variant="contained"
            onClick={handleConfirm}
            disabled={loading}
            className="submit-btn confirm-btn"
          >
            {loading ? <CircularProgress size={24} /> : "ยืนยัน"}
          </Button>
          <Button
            variant="outlined"
            onClick={handleCancel}
            disabled={loading}
            className="submit-btn cancel-btn"
          >
            ยกเลิก
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Submit;
