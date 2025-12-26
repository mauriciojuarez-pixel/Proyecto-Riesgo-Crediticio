// frontend/src/routes/risk.soutes.js


const express = require("express");
const router = express.Router();
const riskController = require("../controllers/risk.controller");

// Forma directa (recomendada)
module.exports = authMiddleware;

// O importa así si mantienes el objeto)
const { authMiddleware } = require("../middlewares/auth.middleware");


// Página de evaluación de riesgo
router.get("/dashboard", authMiddleware, riskController.renderRisk);

// Procesar predicción de riesgo
router.post("/risk/predict", authMiddleware, riskController.predictRisk);

module.exports = router;
