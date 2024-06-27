import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MethodSelection.css'; // We'll create this CSS file for styling

function MethodSelection() {
  const navigate = useNavigate();

  const handleMethodSelect = (method) => {
    // Redirect based on the selected method
    if (method === 'method1') {
      navigate('/Mainpage');
    } else if (method === 'method2') {
      navigate('/sender');
    }
  };

  return (
    <div className="method-selection">
      <h1>กรุณาเลือกวิธีการดำเนินการ</h1>
      <div className="button-container">
        <button 
          className="method-button_1"
          onClick={() => handleMethodSelect('method1')}
        >
        แบบฟอร์มการยืม
        </button>
        <button 
          className="method-button_2"
          onClick={() => handleMethodSelect('method2')}
        >
          แจ้งปัญหาการใข้
        </button>
      </div>
    </div>
  );
}

export default MethodSelection;