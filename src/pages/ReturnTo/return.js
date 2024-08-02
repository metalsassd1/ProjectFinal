import React, { useEffect } from 'react';
import axios from 'axios';
import './Return.css';
import Swal from 'sweetalert2';
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil';
import { qrDataState, rowsState, currentStatusState, containerClassState } from '../../Recoils/UserRecoil/BorrowRecoil';

const Return = () => {
  const qrData = useRecoilValue(qrDataState);
  const rows = useRecoilValue(rowsState);
  const setRows = useSetRecoilState(rowsState);
  const [currentStatus, setCurrentStatus] = useRecoilState(currentStatusState);
  const containerClass = useRecoilValue(containerClassState);

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchDataUpdateStatus();
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (rows.length > 0 && qrData) {
      const matchingRow = rows.find(row => row.id == qrData.id);
      if (matchingRow && matchingRow.loan_status !== currentStatus) {
        setCurrentStatus(matchingRow.loan_status);
        Swal.fire({
          title: 'สถานะถูกอนุมัติ',
          icon: 'success',
          confirmButtonText: 'ตกลง'
        });
      }
    }
  }, [rows, qrData, currentStatus, setCurrentStatus]);

  const fetchDataUpdateStatus = async () => {
    try {
      const response = await axios.get(
        "https://back-end-finals-project-vibo.onrender.com/api/home/management"
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

  if (!qrData) {
    return <p className="return-error">Error in processing QR data. Please check the QR code and try again.</p>;
  }

  const matchingRow = rows.find(row => row.loan_id == qrData.id);
  const borrowDateToDisplay = matchingRow ? matchingRow.borrow_date : formatDate(qrData.borrow_date);
  const returnDateToDisplay = matchingRow ? matchingRow.return_date : formatDate(qrData.return_date);

  return (
    <div className="return-container">
    <h1 className="return-title">ข้อมูลการยืม</h1>
    <p className="return-text"><strong>ID:</strong> {qrData.id}</p>
    <p className="return-text"><strong>ชื่อ:</strong> {qrData.borrower_name}</p>
    <p className="return-text"><strong>รหัสประจำตัว:</strong> {qrData.identifier_number}</p>
    <p className="return-text">
      <strong>สถานะ:</strong> 
      <span style={{color: currentStatus === 'ยืม' ? '#4CAF50' : '#ff6b6b', fontWeight: 'bold'}}>
        {currentStatus}
      </span>
    </p>
    <p className="return-text"><strong>วันที่ยืม:</strong> {borrowDateToDisplay}</p>
    <p className="return-text"><strong>วันที่คืน:</strong> {returnDateToDisplay}</p>
    <h2 className="return-subtitle">รายการอุปกรณ์ที่ยืม</h2>
    {qrData.items.map((item, index) => (
      <div key={index} className="item-details">
        <p className="return-text"><strong>อุปกรณ์:</strong> {item.equipment_name}</p>
        <p className="return-text"><strong>ประเภท:</strong> {item.equipment_type}</p>
        <p className="return-text"><strong>จำนวน:</strong> {item.quantity_borrowed}</p>
      </div>
    ))}
  </div>
);
};

export default Return;