import React from 'react';
import './Return.css';

const Return = (data) => {
  const borrowData = data.data;

  let displayContent;

  try {
    displayContent = (
      <div className="return-container">
        <h1 className="return-title">Return Process</h1>
        <p className="return-text">Item: {borrowData.equipment_name}</p>
        <p className="return-text">User ID: {borrowData.identification_id}</p>
      </div>
    );
  } catch (error) {
    console.error("Error parsing data:", error);
    displayContent = <p className="return-error">Error in processing QR data. Please check the QR code and try again.</p>;
  }

  return displayContent;
};

export default Return;
