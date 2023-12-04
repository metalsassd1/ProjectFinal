const mysql = require("mysql");

const pool = mysql.createPool({
  host: "your-mysql-host",
  user: "your-username",
  password: "your-password",
  database: "your-database",
  connectionLimit: 10, // จำนวน connection สูงสุดใน pool
});
