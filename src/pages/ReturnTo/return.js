// Return.js
import React from 'react';
import { useLocation } from 'react-router-dom';

const Return = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const data = queryParams.get('data');

    try {
        const parsedData = JSON.parse(decodeURIComponent(data));
        return (
            <div>
                <h1>Return Process</h1>
                <p>Item: {parsedData.itemName}</p>
                <p>User ID: {parsedData.userId}</p>
            </div>
        );
    } catch (error) {
        console.error("Error parsing data:", error);
        return <p>Error in processing QR data. Please check the QR code and try again.</p>;
    }
};

export default Return;
