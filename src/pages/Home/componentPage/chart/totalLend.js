import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdOutlineEditCalendar } from "react-icons/md";

const RectangleBox1 = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    axios
      .get("https://back-end-finals-project-pgow.onrender.com/api/home/totalLend")
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
    backgroundColor: "rgb(198, 230, 247)", // Alice blue
    border: "2px solid #4682b4", // Steel blue
    borderRadius: "10px",
    padding: "60px",
    textAlign: "center",
    boxShadow: "5px 5px 10px #888888",
    fontFamily: "'Arial', sans-serif",
    color: "#333333",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '16px',
    transition: 'all 0.3s ease-in-out'
  };

  const iconStyle = {
    marginRight: '10px',
    fontSize: '60px'
  };

  return (
    <div style={boxStyle}>
      {data ? (
        <p>
          <MdOutlineEditCalendar style={iconStyle} />
          <p></p>
          {`จำนวนยืมทั้งหมด: ${data.totalLend }`}
        </p>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default RectangleBox1;
