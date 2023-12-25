const express = require("express");
const { Router } = express;
const Home = require("../pages/Home/Home"); // Assuming Home is a module

const router = Router();

// Define routes using the router

router.get("/", (req, res) => {
  res.render("Home"); // Assuming you are using a templating engine like EJS or Pug
});

// Add more routes as needed

module.exports = router;
