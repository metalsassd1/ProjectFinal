import React from 'react';
import { useLocation } from 'react-router-dom';

const Return = (data) => {
    const location = useLocation();
    const borrowData = (data.data)

    console.log(borrowData.borrower_name)
    let displayContent;

    try {
        displayContent = (
            <div>
                <h1>Return Process</h1>
                <p>Item: {borrowData.equipment_name}</p>
                <p>User ID: {borrowData.identification_id}</p>
            </div>
        );
    } catch (error) {
        console.error("Error parsing data:", error);
        displayContent = <p>Error in processing QR data. Please check the QR code and try again.</p>;
    }

    return displayContent;
};

export default Return;
