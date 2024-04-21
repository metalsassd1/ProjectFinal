// GenerateQR.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import Return from './return';

function drawQRCode(canvas, text) {
    let ctx = canvas.getContext('2d');
    let size = 100;  // Set the size of QR Code
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#000';
    // Simple pattern for illustration (not actual QR encoding)
    for (let i = 0; i < size; i+=10) {
        for (let j = 0; j < size; j+=10) {
            if ((i+j)%20 === 0) {
                ctx.fillRect(i, j, 10, 10);
            }
        }
    }
}

const GenerateQR = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const data = queryParams.get('data');
    const canvasRef = React.useRef(null);

    React.useEffect(() => {
        if (canvasRef.current) {
            drawQRCode(canvasRef.current, data);
        }
    }, [data]);
    
    return (
        <div>
            <Return value={data}/>
            <canvas ref={canvasRef} width="100" height="100" style={{border: '1px solid black'}}></canvas>
            <button onClick={() => window.print()}>Print QR Code</button>
        </div>
    );
};

export default GenerateQR;
