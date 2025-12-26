const express = require("express");
const router = express.Router();
const riskController = require("../controllers/risk.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/dashboard", authMiddleware, riskController.renderDashboard);
router.post("/risk/predict", authMiddleware, riskController.predictRisk);

module.exports = router;
