import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Return.css';
import Swal from 'sweetalert2';

const Return = ({ data, response }) => {
  const borrowData = data;
  const [rows, setRows] = useState([]);
  const [containerClass, setContainerClass] = useState('return-container');
  const [currentStatus, setCurrentStatus] = useState(borrowData.loan_status);

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchDataUpdateStatus();
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (rows.length > 0) {
      const matchingRow = rows.find(row => row.id == borrowData.id);
      if (matchingRow) {
        const isBorrowStatus = matchingRow.loan_status == "ยืม";
        setContainerClass(isBorrowStatus ? "return-container" : "return-container red-theme");

        // Check if status has changed
        if (matchingRow.loan_status !== currentStatus) {
          setCurrentStatus(matchingRow.loan_status);
          Swal.fire({
            title: 'สถานะถูกอนุมัติ',
            icon: 'success',
            confirmButtonText: 'ตกลง'
          });
        }
      }
    }
  }, [rows, borrowData.id, currentStatus]);

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

  let displayContent;

  try {
    const matchingRow = rows.find(row => row.id == borrowData.id);
    const borrowDateToDisplay = matchingRow ? matchingRow.borrow_date : formatDate(borrowData.borrow_date);
    const returnDateToDisplay = matchingRow ? matchingRow.return_date : formatDate(borrowData.return_date);

    displayContent = (
      <div className={containerClass}>
        <h1 className="return-title">ข้อมูลการยืม</h1>
        <p className="return-text"><strong>ID:</strong> {borrowData.id}</p>
        <p className="return-text"><strong>อุปกรณ์:</strong> {borrowData.equipment_name}</p>
        <p className="return-text"><strong>ชื่อ:</strong> {borrowData.borrower_name}</p>
        <p className="return-text"><strong>รหัสประจำตัว:</strong> {borrowData.identification_id}</p>
        <p className="return-text"><strong>สถานะ:</strong> {currentStatus}</p>
        <p className="return-text"><strong>วันที่ยืม:</strong> {borrowDateToDisplay}</p>
        <p className="return-text"><strong>วันที่คืน:</strong> {returnDateToDisplay}</p>
        <p className="return-text"><strong>จำนวน:</strong> {borrowData.quantity_borrowed}</p>
      </div>
    );
  } catch (error) {
    console.error("Error parsing data:", error);
    displayContent = <p className="return-error">Error in processing QR data. Please check the QR code and try again.</p>;
  }

  return displayContent;
};

export default Return;