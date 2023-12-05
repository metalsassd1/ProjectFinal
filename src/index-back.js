// database-back.js
const express = require("express");
const routes = require("./database/routes"); // ตรวจสอบ path ตามโครงสร้างของโปรเจค

const app = express();
const port = 3000;

app.use("/api", routes); // ตรวจสอบว่าคุณใช้เส้นทาง "/api" ไว้ตรงนี้หรือไม่

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
