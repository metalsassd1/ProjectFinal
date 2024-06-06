import React, { useEffect, useRef } from 'react';
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

  useEffect(() => {
    // This will ensure the QR code is rendered before trying to access it
    if (qrRef.current) {
      console.log('QR Code element is rendered:', qrRef.current);
    }
  }, []);

  const handlePrint = () => {
    const qrCode = qrRef.current;
    const canvas = qrCode.querySelector('canvas');
    const body = {
        id: borrowData.id,
        equipment_name: borrowData.equipment_name,
        quantity_borrowed: borrowData.quantity_borrowed
      };
    if (canvas) {
      const image = canvas.toDataURL("image/png");
      const newWindow = window.open('', '_blank');
      const html = `
      <div style="display: flex; flex-direction: column; align-items: center;">
        <img src="${image}" />
        <p style="margin-top: 10px;">PIM CAN TAKE</p>
      </div>
      <script>window.print();window.close();</script>
    `;
    newWindow.document.write(html);
    newWindow.document.close();
    } else {
      console.error('QR Code canvas not found');
    }
  };

  const handleReturn = async () => {
    const body = {
      id: borrowData.id,
      equipment_name: borrowData.equipment_name,
      quantity_borrowed: borrowData.quantity_borrowed
    };
    try {
      const response = await axios.put('http://localhost:4000/api/Borrowed/return', body);
      alert('Return processed: ' + response.data.message);
    } catch (error) {
      console.error('Error processing return:', body);
      alert('Failed to process return', error);
    }
  };

  return (
    <div className="qr-container">
      <h1 className="qr-title">QR Code Generator</h1>
      <div id="qrCodeElement" ref={qrRef}>
        <QRCode
          value={data ? decodeURIComponent(data) : 'No data provided'}
          size={290}
          level={"H"}
          includeMargin={true}
        />
      </div>
      <Return data={borrowData} />
      <div className="qr-buttons">
        <button className="qr-button" onClick={handlePrint}>Print</button>
        <button className="qr-button" onClick={handleReturn}>คืน</button>
      </div>
    </div>
  );
};

export default GenerateQR;
