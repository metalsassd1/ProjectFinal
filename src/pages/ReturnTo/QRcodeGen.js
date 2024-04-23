import React from 'react';
import { useLocation } from 'react-router-dom';
import QRCode from 'qrcode.react';
import Return from './return';
import axios from 'axios'; 


const GenerateQR = () => {
    const location = useLocation();
    const data = new URLSearchParams(location.search).get('data');
    const borrowData = JSON.parse(decodeURIComponent(data))

    const handlePrint = () => {
        const qrCode = document.getElementById("qrCodeElement");
        const canvas = qrCode.querySelector('canvas');
        const image = canvas.toDataURL("image/png");
        const newWindow = window.open('', '_blank');
        newWindow.document.write(`<img src="${image}" onload="window.print();window.close()" />`);
        newWindow.document.close();
    };

     // Function to handle the return operation
     const handleReturn = async () => {
        const body ={
            id: borrowData.id,  
            equipment_name:borrowData.equipment_name,
            quantity_borrowed:borrowData.quantity_borrowed
        }
        try {
            const response = await axios.put('http://localhost:4000/api/Borrowed/return',body );
            alert('Return processed: ' + response.data.message);
        } catch (error) {
            console.error('Error processing return:', body);
            alert('Failed to process return',error);
        }
    };

    return (
        <div>
            <h1>QR Code Generator</h1>
            <QRCode 
                id="qrCodeElement"
                value={data ? decodeURIComponent(data) : 'No data provided'}
                size={290}
                level={"H"}
                includeMargin={true}
            />
            <Return 
            data = {borrowData}
            />
            <button onClick={handleReturn}>คืน</button>
        </div>
    );
};

export default GenerateQR;
