import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import QRCode from 'qrcode.react';
import Return from './return';
import axios from 'axios';
import './QRcodeGen.css';

const GenerateQR = () => {
  const location = useLocation();
  const data = new URLSearchParams(location.search).get('data');
  const borrowData = JSON.parse(decodeURIComponent(data));
  const qrRef = useRef(null);
  const [rows, setRows] = useState([]);
  const [containerClass, setContainerClass] = useState('qr-container');

  useEffect(() => {
    // This will ensure the QR code is rendered before trying to access it
    if (qrRef.current) {
      console.log('QR Code element is rendered:', qrRef.current);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (rows.length > 0) {
      const matchingRow = rows.find(row => row.id === borrowData.id);
      if (matchingRow) {
        const isBorrowStatus = matchingRow.loan_status === "ยืม";
        setContainerClass(isBorrowStatus ? "qr-container" : "qr-container red-theme");
      }
      console.log(rows.find(row => row.id),borrowData)
    }
  }, [rows, borrowData.id]);

  const fetchData = async () => {
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

  return (
    <div className={containerClass}>
      <h1 className="qr-title">QR Code การยืม</h1>
      <div id="qrCodeElement" ref={qrRef}>
        <QRCode
          value={data ? decodeURIComponent(data) : 'No data provided'}
          size={290}
          level={"H"}
          includeMargin={true}
        />
      </div>
      <Return data={borrowData} response={rows} />
      <div className="qr-buttons">
        {/* Any buttons or additional components can go here */}
      </div>
    </div>
  );
};

export default GenerateQR;
