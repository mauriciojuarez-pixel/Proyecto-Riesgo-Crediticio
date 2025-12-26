const express = require("express");
const router = express.Router();
const riskController = require("../controllers/risk.controller");
const { ensureAuth } = require("../middlewares/auth.middleware");

// GET: página de evaluación
router.get("/", ensureAuth, riskController.renderRisk);

// POST: enviar datos al backend
router.post("/predict", ensureAuth, riskController.predictRisk);

module.exports = router;
