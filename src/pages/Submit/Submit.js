import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, CircularProgress } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import "./Submit.css";
import Swal from 'sweetalert2';
import emailjs from "emailjs-com";

const Submit = () => {
  const location = useLocation();
  const data = new URLSearchParams(location.search).get('data');
  const borrowData = JSON.parse(decodeURIComponent(data));
  const [loading, setLoading] = useState(false);
  const [adminUser, setAdminUser] = useState('');
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [updatedData, setUpdatedData] = useState(null);

  useEffect(() => {
    emailjs.init("S25g4RkhBGztGOJc_");
    console.log(borrowData.user.username);
    setAdminUser(borrowData.user.email);
  }, []);
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchDataUpdateStatus();
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);
  
  const sendEmail = async (templateParams) => {
    try {
      const result = await emailjs.send(
        'service_ql4evuj',
        'template_7vnhc6g',
        templateParams
      );
      console.log('Email sent successfully:', result.text);
    } catch (error) {
      console.error('Failed to send email:', error);
    }
  };

  const fetchDataUpdateStatus = async () => {
    try {
      const response = await axios.get(
        "https://back-end-finals-project-pgow.onrender.com/api/home/management"
      );

      const formattedData = response.data.map((item) => ({
        ...item,
        borrow_date: formatDate(item.borrow_date),
        return_date: formatDate(item.return_date),
      }));
      setRows(formattedData);

      compareDataAndUpdate(formattedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "No date provided";
    const date = new Date(dateString);
    if (isNaN(date)) return "Invalid date";
    return date.toLocaleDateString("TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const compareDataAndUpdate = (formattedData) => {
    const matchingRow = formattedData.find(row => row.id == borrowData.borrowData.id);
    if (matchingRow) {
      const updatedBorrowData = {
        ...borrowData.borrowData,
        loan_status: matchingRow.loan_status,
        borrow_date: matchingRow.borrow_date,
        return_date: matchingRow.return_date
      };
      setUpdatedData(updatedBorrowData);
    }
  };

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
          `https://back-end-finals-project-pgow.onrender.com/api/Borrowed/adminsubmit/${borrowData.borrowData.equipment_name}/${borrowData.borrowData.id}`
        );
        console.log(response);
        
        const dataToEncode = updatedData || borrowData.borrowData;
        const encodedData = encodeURIComponent(JSON.stringify(dataToEncode));
        
        // Send email
        await sendEmail({
          to: borrowData.borrowData.contact.email,
          equipment_name: borrowData.borrowData.equipment_name,
          status: "อนุมัติ",
          Approve: adminUser,
          useSubmit: `http://localhost:3000/qr?data=${encodedData}`
        });

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
    window.close();
  };

  return (
    <div className="submit-container">
      <div className="submit-card">
        <h2 className="submit-title">ยืนยันการคืนอุปกรณ์</h2>
        <p className="submit-text">
          คุณต้องการยืนยันการคืนอุปกรณ์ {borrowData.borrowData.equipment_name} หรือไม่?
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