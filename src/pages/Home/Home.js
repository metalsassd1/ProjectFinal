// src/pages/Home.js
import React from "react";
import Header from "../components/header";

const Home = () => {
  const handleLogout = () => {
    // ตัวอย่าง: ใส่โค้ดที่คุณต้องการให้ทำงานเมื่อคลิกปุ่ม Logout
    console.log("Logout clicked");
  };

  return (
    <div>
      <Header username="ชื่อผู้ล็อกอิน" onLogout={handleLogout} />
      <h2>Content of the Home Page</h2>
    </div>
  );
};

export default Home;
