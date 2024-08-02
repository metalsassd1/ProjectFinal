import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import QRCode from 'qrcode.react';
import Return from './return';
import axios from 'axios';
import './QRcodeGen.css';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { qrDataState, rowsState, containerClassState } from '../../Recoils/UserRecoil/BorrowRecoil';

const GenerateQR = () => {
  const location = useLocation();
  const qrRef = useRef(null);
  const [rows, setRows] = useRecoilState(rowsState);
  const [qrData, setQrData] = useRecoilState(qrDataState);
  const containerClass = useRecoilValue(containerClassState);
  const setContainerClass = useSetRecoilState(containerClassState);

  useEffect(() => {
    const data = new URLSearchParams(location.search).get('data');
    const borrowData = JSON.parse(decodeURIComponent(data));
    setQrData(borrowData);
  }, [location.search, setQrData]);

  useEffect(() => {
    if (qrRef.current) {
      console.log('QR Code element is rendered:', qrRef.current);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (rows.length > 0 && qrData) {
      const matchingRow = rows.find(row => row.loan_id === qrData.id);
      if (matchingRow) {
        const isBorrowStatus = matchingRow.loan_status === "ยืม";
        setContainerClass(isBorrowStatus ? "qr-container" : "qr-container red-theme");
      }
    }
  }, [rows, qrData, setContainerClass]);

  const fetchData = async () => {
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

  return (
<div className={containerClass}>
      <h1 className="qr-title">QR Code การยืม</h1>
      <div id="qrCodeElement" ref={qrRef}>
        <QRCode
          value={qrData ? JSON.stringify(qrData) : 'No data provided'}
          size={250}
          level={"H"}
          includeMargin={true}
        />
      </div>
      <Return />
    </div>
  );
};


export default GenerateQR;