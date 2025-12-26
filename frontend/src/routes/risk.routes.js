const express = require("express");
const router = express.Router();
const riskController = require("../controllers/risk.controller.js");
const { ensureAuthenticated } = require("../middlewares/auth.middleware.js");

// Página de evaluación de riesgo
router.get("/", ensureAuthenticated, riskController.renderRisk);

// Evaluación de riesgo (AJAX/POST)
router.post("/predict", ensureAuthenticated, riskController.predictRisk);

module.exports = router;
