const express = require("express");
const {
	handleLogin,
	checkLogin,
	handleLogout,
} = require("../controllers/auth");

const router = express.Router();
// Auth Routes
router.post("/login", handleLogin);
router.get("/login", checkLogin);
router.post("/logout", handleLogout);

module.exports = router;
