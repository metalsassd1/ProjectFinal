import React, { useState, useEffect } from "react";
import axios from "axios";

const RectangleBox1 = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/home/UesrLentTotal")
      .then((response) => {
        console.log("Data from API:", response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        if (error.response) {
          // The request was made and the server responded with a status code
          console.error("Response data:", error.response.data);
          console.error("Response status:", error.response.status);
          console.error("Response headers:", error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.error("No response received. Request:", error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error("Error setting up the request:", error.message);
        }
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
        <p>{`totalUsers: ${data.totalUsers}`}</p>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default RectangleBox1;
