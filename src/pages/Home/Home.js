// App.js
import React, { useState, useEffect } from "react";
import Sidebar from "../../components/navigatorbar";
import Navbar from "../../components/navbar";
import MyTable from "./componentPage/tableHome";
import RectangleBox from "./componentPage/chart/UserCount";
import RectangleBox1 from "./componentPage/chart/returnedCount";
import RectangleBox2 from "./componentPage/chart/totalLend";
import RectangleBox3 from "./componentPage/chart/equipmentCount";

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
      <br />
      <div
        className="content-container"
        style={{
          marginLeft: isSidebarOpen ? 300 : 100,
          marginRight: isSidebarOpen ? 70 : 100,
          transition: "margin 0.3s",
        }}
      >
        <h1>หน้าหลัก</h1>
        <div>
          <div className="grid-container">
            <div className="box1">
              <RectangleBox3 />
            </div>
            <div className="box1">
              <RectangleBox />
            </div>
            <div className="box1">
              <RectangleBox2 />
            </div>
            <div className="box1">
              <RectangleBox1 />
            </div>
          </div>
        </div>
        <br />
        <div className="tableHome">
          <MyTable />
        </div>
      </div>
    </div>
  );
};

export default App;
