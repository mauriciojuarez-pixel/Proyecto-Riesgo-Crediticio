const express = require("express");
const router = express.Router();
const { renderDashboard } = require("../controllers/dashboard.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");

// Dashboard principal
router.get("/dashboard", authMiddleware, renderDashboard);

// Redirige a la evaluación de riesgo
router.get("/dashboard/risk", authMiddleware, (req, res) => {
    res.redirect("/risk"); // tu ruta de risk.ejs
});

module.exports = router;
