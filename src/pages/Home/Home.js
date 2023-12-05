// Monitoring.js
import React, { useState, useEffect } from "react";
import Header from "../../components/header";
import Sidebar from "../../components/navigatorbar";
import Navbar from "../../components/navbar";
import { fetchDataFromAPI } from "../../api/home";
import Chart from "./componentPage/chart";
import UserActivityLogs from "./componentPage/userActivity";
import "./Monitoring.css"; // Import your custom CSS

const Monitoring = () => {
  const [data, setData] = useState(null);
  const [userActivityLogs, setUserActivityLogs] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    // Fetch data from your API or perform any initial setup
    const fetchData = async () => {
      try {
        const result = await fetchDataFromAPI(); // Replace with actual API call
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    // Set up real-time updates or periodic polling if needed
    const intervalId = setInterval(fetchData, 60000); // Fetch data every 1 minute

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Run effect only once on component mount

  const handleLogout = () => {
    console.log("Logout clicked");
    // Implement logout functionality
  };

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <div className="header">
        {/* Navbar */}
        <Navbar onLogout={handleLogout} />
        {/* Sidebar */}
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
      </div>

      {/* Main Content */}
      <div className="container">
        {/* Page Content */}
        <div
          className={`content ${
            isSidebarOpen ? "sidebar-open" : "sidebar-closed"
          }`}
        >
          <h2>Advanced Monitoring Page</h2>

          {/* Display charts or other monitoring components */}
          {data && <Chart data={data} className="Chart-container" />}

          {/* Display user activity logs */}
          <UserActivityLogs
            userActivityLogs={userActivityLogs}
            className="UserActivityLogs-container"
          />
        </div>
      </div>
    </div>
  );
};

export default Monitoring;
