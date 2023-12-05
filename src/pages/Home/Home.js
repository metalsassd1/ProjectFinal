// App.js
import React, { useState, useEffect } from "react";
import Sidebar from "../../components/navigatorbar";
import Navbar from "../../components/navbar";
import Chart from "./componentPage/chart";
import UserActivityLogs from "./componentPage/userActivity";
import { fetchDataFromAPI } from "../../api/home";
import "./Monitoring.css";

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [data, setData] = useState(null);
  const [userActivityLogs, setUserActivityLogs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchDataFromAPI(); 
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
    const intervalId = setInterval(fetchData);
    return () => clearInterval(intervalId);
  }, []); 

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
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
      {/* Your main content goes here */}
      <div
        className="content-container"
        style={{
          marginLeft: isSidebarOpen ? 240 : 0,
          transition: "margin 0.3s",
        }}
      >
        <h1>หน้าหลัก</h1>
        <h2>Advanced Monitoring Page</h2>
        {data && <Chart data={data} className="Chart-container" />}

        <UserActivityLogs
          userActivityLogs={userActivityLogs}
          className="UserActivityLogs-container"
        />
      </div>
    </div>
  );
};

export default App;
