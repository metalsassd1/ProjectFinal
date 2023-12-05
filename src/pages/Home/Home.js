// App.js
import React, { useState, useEffect } from "react";
import Sidebar from "../../components/navigatorbar";
import Navbar from "../../components/navbar";
import MyTable from "./componentPage/tableHome";
import RectangleBox from "./componentPage/chart";
import RectangleBox1 from "./componentPage/chart2";
import RectangleBox2 from "./componentPage/chart3";
import RectangleBox3 from "./componentPage/chart4";

import "./Monitoring.css";

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch data or perform other actions if needed
      try {
        // const result = await fetchDataFromAPI();
        // setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Fetch data on mount
    fetchData();

    // Set up an interval for fetching data
    const intervalId = setInterval(fetchData, 60000); // Assuming a 1-minute interval
    return () => clearInterval(intervalId); // Cleanup the interval on component unmount
  }, []);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div
      style={{
        background: "#f0f0f0",
      }}
    >
      <div
        className="header"
        style={{
          marginLeft: isSidebarOpen ? 200 : 0,
          transition: "margin 0.3s",
        }}
      >
        <Navbar onToggleSidebar={handleToggleSidebar} />
      </div>
      <div className={isSidebarOpen ? "sidebar-open" : "sidebar-closed"}>
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
      </div>
      <RectangleBox />
      <RectangleBox1 />
      <RectangleBox2 />
      <RectangleBox3 />

      <div
        className="content-container"
        style={{
          marginLeft: isSidebarOpen ? 300 : 100,
          marginRight: isSidebarOpen ? 50 : 100,
          transition: "margin 0.3s",
        }}
      >
        <h1>หน้าหลัก</h1>
        <h2>Advanced Monitoring Page</h2>
        <MyTable />
      </div>
    </div>
  );
};

export default App;
