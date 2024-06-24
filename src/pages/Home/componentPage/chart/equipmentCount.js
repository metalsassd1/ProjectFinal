import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdSportsSoccer } from 'react-icons/md'; // Importing a sports icon

const RectangleBox3 = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/home/equipmentCount")
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
          <MdSportsSoccer style={iconStyle} />
          <p></p>
          {`จำนวนอุปกรณ์ทั้งหมด: ${data.combinedCount}`}
        </p>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default RectangleBox3;
