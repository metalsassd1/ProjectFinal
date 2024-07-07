import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaCalendarCheck } from "react-icons/fa";

const RectangleBox1 = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    axios
      .get("https://back-end-finals-project-vibo.onrender.com/api/home/returnedCount")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  
  const boxStyle = {
    width: "450px",
    height: "100px",
    backgroundColor: "#556cca", // Alice blue
    borderRadius: "10px",
    padding: "60px",
    textAlign: "center",
    boxShadow: "5px 5px 10px #888888",
    fontFamily: "'Arial', sans-serif",
    color: "#fff",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '16px',
    transition: 'all 0.3s ease-in-out',
    border : "1px solid black"
  };

  const iconStyle = {
    marginRight: '10px',
    fontSize: '60px'
  };

  return (
    <div style={boxStyle}>
      {data ? (
        <p>
          <FaCalendarCheck style={iconStyle} />
          <p></p>
          {`จำนวนการคืนทั้งหมด: ${data.returnedCount}`}
        </p>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default RectangleBox1;
