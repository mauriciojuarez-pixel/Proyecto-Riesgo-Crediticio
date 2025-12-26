// frontend/src/routes/risk.routes.js

const express = require("express");
const router = express.Router();
const riskController = require("../controllers/risk.controller.js");
const { ensureAuth } = require("../middlewares/auth.middleware.js");

// GET: página de evaluación
router.get("/", ensureAuth, riskController.renderRisk);

// POST: enviar datos al backend
router.post("/predict", ensureAuth, riskController.predictRisk);

module.exports = router;
