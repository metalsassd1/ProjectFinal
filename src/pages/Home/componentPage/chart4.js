import React, { useState, useEffect } from "react";
import axios from "axios";

const RectangleBox3 = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Fetch data from the API
    axios
      .get("http://localhost:4000/api/home/equipmentCount")
      .then((response) => {
        console.log("Data from API:", response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div
      style={{
        width: "200px",
        height: "100px",
        backgroundColor: "lightblue",
        border: "2px solid darkblue",
        borderRadius: "8px",
        padding: "16px",
        textAlign: "center",
      }}
    >
      {/* Check if data exists before displaying */}
      {data ? (
        <p>{`Combined Count: ${data.combinedCount}`}</p>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default RectangleBox3;
