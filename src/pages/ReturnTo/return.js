import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Return.css';

const Return = ({ data }) => {
  const borrowData = data;
  const [rows, setRows] = useState([]);
  const [containerClass, setContainerClass] = useState('return-container');

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
      }
    }
  }, [rows, borrowData.id]);

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
    const matchingRow = rows.find(row => row.id == borrowData.id) || {};
    displayContent = (
      <div className={containerClass}>
        <h1 className="return-title">ข้อมูลการยืม</h1>
        <p className="return-text"><strong>อุปกรณ์:</strong> {borrowData.equipment_name}</p>
        <p className="return-text"><strong>ชื่อ:</strong> {borrowData.borrower_name}</p>
        <p className="return-text"><strong>ID:</strong> {borrowData.identification_id}</p>
        <p className="return-text"><strong>สถานะ:</strong> {matchingRow.loan_status}</p>
        <p className="return-text"><strong>วันที่ยืม:</strong> {matchingRow.borrow_date}</p>
        <p className="return-text"><strong>วันที่คืน:</strong> {matchingRow.return_date}</p>
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