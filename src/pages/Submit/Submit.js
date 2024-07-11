import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, CircularProgress } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import "./Submit.css";
import Swal from "sweetalert2";
import emailjs from "emailjs-com";

const Submit = () => {
  const location = useLocation();
  const data = new URLSearchParams(location.search).get("data");
  const borrowData = JSON.parse(decodeURIComponent(data));
  const [loading, setLoading] = useState(false);
  const [adminUser, setAdminUser] = useState("");
  const [admin, setAdmin] = useState("");
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [updatedData, setUpdatedData] = useState(null);

  useEffect(() => {
    emailjs.init("S25g4RkhBGztGOJc_");
    console.log(borrowData.borrowData);
    setAdminUser(borrowData.user.full_name);
    setAdmin(borrowData.user.email);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchDataUpdateStatus();
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const closeOrNavigateBack = () => {
    if (window.opener && !window.opener.closed) {
      window.close(); 
      console.log(window.opener);
    } else {
      navigate(-1); 
      console.log("mobile");
    }
  };

  const sendEmail = async (templateParams) => {
    try {
      const result = await emailjs.send(
        "service_ql4evuj",
        "template_7vnhc6g",
        templateParams
      );
      console.log("Email sent successfully:", result.text);
    } catch (error) {
      console.error("Failed to send email:", error);
    }
  };

  const fetchDataUpdateStatus = async () => {
    try {
      const response = await axios.get(
        `https://back-end-finals-project-vibo.onrender.com/api/Borrowed/loan/${borrowData.borrowData.id}`
      );
      const formattedData = {
        ...response.data,
        borrow_date: formatDate(response.data.borrow_date),
        return_date: formatDate(response.data.return_date),
      };
      setUpdatedData(formattedData);
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

  const handleConfirm = async () => {
    if (updatedData && updatedData.loan_status === "ยืม") {
      await Swal.fire({
        title: "ไม่สามารถอนุมัติได้",
        text: "ไม่สามารถอนุมัติการยืมได้ เนื่องจากมีการอนุมัติไปแล้ว",
        icon: "error",
        confirmButtonText: "ตกลง",
      });
      closeOrNavigateBack();
      return;
    }
    
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
        // ส่ง request สำหรับทุกรายการที่ยืม
        const requests = borrowData.borrowData.items.map(item => 
          axios.put(
            `https://back-end-finals-project-vibo.onrender.com/api/Borrowed/adminsubmit/${item.equipment_name}/${borrowData.borrowData.id}`,
            {
              quantity_data: item.quantity_data,
              quantity_borrowed: item.quantity_borrowed,
            }
          )
        );

        const responses = await Promise.all(requests);
        console.log(responses);

        const dataToEncode = updatedData || borrowData.borrowData;
        const encodedData = encodeURIComponent(JSON.stringify(dataToEncode));

        // ส่งอีเมลแจ้งอนุมัติ
        await sendEmail({
          to: borrowData.borrowData.contact.email,
          equipment_list: borrowData.borrowData.items.map(item => 
            `${item.equipment_name} (${item.quantity_borrowed} ชิ้น)`
          ).join(', '),
          status: "อนุมัติ",
          Approve: adminUser,
          useSubmit: `https://pimcantake.netlify.app/qr?data=${encodedData}`,
          cellNum: borrowData.user.cellNum,
        });

        await Swal.fire({
          title: "ดำเนินการสำเร็จ!",
          text: "อนุมัติการยืม",
          icon: "success",
          confirmButtonText: "ตกลง",
        });
        closeOrNavigateBack();
      } catch (error) {
        console.error("API call failed:", error);
        
        const { isConfirmed } = await Swal.fire({
          title: "เกิดข้อผิดพลาด",
          text: "ไม่สามารถอนุมัติการยืมได้ คุณต้องการลบข้อมูลการยืมนี้หรือไม่?",
          icon: "error",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3085d6",
          confirmButtonText: "ลบข้อมูล",
          cancelButtonText: "เก็บข้อมูลไว้",
        });

        if (isConfirmed) {
          await handleReject();
        }
      } finally {
        setLoading(false);
      }
    }
  };

  const handleReject = async () => {
    try {
      // ลบข้อมูลการยืม
      await axios.delete(`https://back-end-finals-project-vibo.onrender.com/api/manage/delete/${borrowData.borrowData.id}`);

      const dataToEncode = updatedData || borrowData.borrowData;
      const encodedData = encodeURIComponent(JSON.stringify(dataToEncode));
      
      // ส่งอีเมลแจ้งไม่อนุมัติ
      await sendEmail({
        to: borrowData.borrowData.contact.email,
        equipment_list: borrowData.borrowData.items.map(item => 
          `${item.equipment_name} (${item.quantity_borrowed} ชิ้น)`
        ).join(', '),
        status: "ไม่ถูกอนุมัติ",
        Approve: adminUser,
        useSubmit: `https://pimcantake.netlify.app/qr?data=${encodedData}`,
        cellNum: borrowData.user.cellNum,
      });

      await Swal.fire({
        title: "ดำเนินการสำเร็จ!",
        text: "ไม่อนุมัติการยืมและลบข้อมูลเรียบร้อยแล้ว",
        icon: "success",
        confirmButtonText: "ตกลง",
      });
      closeOrNavigateBack();
    } catch (error) {
      console.error("Error rejecting and deleting loan:", error);
      await Swal.fire({
        title: "ดำเนินการไม่สำเร็จ!",
        text: "เกิดข้อผิดพลาดในการไม่อนุมัติและลบข้อมูล",
        icon: "error",
        confirmButtonText: "ตกลง",
      });
    }
  };

  const handleCancel = async () => {
    const { isConfirmed } = await Swal.fire({
      title: "ยืนยันการไม่อนุมัติ",
      text: "คุณต้องการไม่อนุมัติการยืมและลบข้อมูลใช่หรือไม่?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "ใช่, ไม่อนุมัติ",
      cancelButtonText: "ยกเลิก"
    });

    if (isConfirmed) {
      setLoading(true);
      await handleReject();
      setLoading(false);
      closeOrNavigateBack();
    }
  };

  return (
    <div className="submit-container">
      <div className="submit-card">
        <h2 className="submit-title">ยืนยันการคืนอุปกรณ์</h2>
        <p className="submit-text">
          คุณต้องการยืนยันการอนุมัติการยืมอุปกรณ์หรือไม่
        </p>
        <strong className="submit-text">
          ผู้ยืม :{borrowData.borrowData.borrower_name}
        </strong>
        {borrowData.borrowData.items.map((item, index) => (
          <div key={index}>
            <p className="submit-text">
              <strong>อุปกรณ์ :{item.equipment_name} |</strong>
              <strong>| จำนวน :{item.quantity_borrowed} หรือไม่?</strong>
            </p>
          </div>
        ))}
        <div className="submit-buttons">
          <Button
            variant="contained"
            onClick={handleConfirm}
            disabled={loading}
            className="submit-btn confirm-btn"
          >
            {loading ? <CircularProgress size={24} /> : "อนุมัติ"}
          </Button>
          <Button
            variant="outlined"
            onClick={handleCancel}
            disabled={loading}
            className="submit-btn cancel-btn"
          >
            ไม่อนุมัติ
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Submit;
