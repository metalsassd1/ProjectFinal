import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MethodSelection.css';

function SelectMethod() {
  const navigate = useNavigate();

  const handleMethodSelect = (method) => {
    if (method === 'method1') {
      navigate('/Mainpage');
    } else if (method === 'method2') {
      navigate('/sender');
    }
  };

  return (
    <div className="method-selection-container">
      <div className="method-selection">
        <h1 className='HeadSender'>กรุณาเลือกวิธีการดำเนินการ</h1>
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
            แจ้งปัญหาการใช้
          </button>
        </div>
      </div>
    </div>
  );
}

export default SelectMethod;