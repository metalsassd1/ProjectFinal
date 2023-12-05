// home.js
const express = require("express");
const db = require("../database/db"); // ตรวจสอบ path ตามโครงสร้างของโปรเจค

const router = express.Router();

router.get("/equipmentCount", (req, res) => {
  const queryRecreational =
    "SELECT SUM(amount) as totalRecreational FROM recreational";
  const querySport = "SELECT SUM(amount) as totalSport FROM sport";

  db.query(queryRecreational, (errorRecreational, resultsRecreational) => {
    if (errorRecreational) {
      console.error("Error querying recreational table:", errorRecreational);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    db.query(querySport, (errorSport, resultsSport) => {
      if (errorSport) {
        console.error("Error querying sport table:", errorSport);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }

      const totalRecreational = resultsRecreational[0].totalRecreational || 0;
      const totalSport = resultsSport[0].totalSport || 0;
      const total = totalRecreational + totalSport;

      res.json({ totalRecreational, totalSport, total });
    });
  });
});
router.get("/userCount", (req, res) => {
  const query = "SELECT COUNT(*) AS userCount FROM user";

  db.query(query, (error, results) => {
    if (error) {
      console.error("Error querying database:", error);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    const userCount = results[0].userCount;
    res.json({ userCount });
  });
}); //จำนวนผู้ใช้ทั้งหมด
router.get("/lentTotal", (req, res) => {
  const query =
    "SELECT COUNT(DISTINCT user_id) AS total_users FROM loan_management";

  db.query(query, (error, results) => {
    if (error) {
      console.error("Error querying database:", error);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    res.json({ totalUsers: results[0].total_users });
  });
});
router.get("/equipmentTotal", (req, res) => {
  const query =
    "SELECT COUNT(DISTINCT recreational_id,sport_id) AS total_equipments FROM loan_management";

  db.query(query, (error, results) => {
    if (error) {
      console.error("Error querying database:", error);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    res.json({ totalEquipments: results[0].total_equipments });
  });
});
module.exports = router;
