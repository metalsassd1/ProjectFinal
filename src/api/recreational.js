const express = require("express");
const db = require("../database/db");

const router = express.Router();

router.get("/", (req, res) => {
  const query = "SELECT * FROM recreational";

  db.query(query, (error, results) => {
    if (error) {
      console.error("Error querying database:", error);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    res.json(results);
  });
});

module.exports = router;
