// frontend/src/routes/risk.routes.js

const express = require("express");
const router = express.Router();
const riskController = require("../controllers/risk.controller.js");
const { ensureAuth } = require("../middlewares/auth.middleware.js");

// GET: renderiza la página de evaluación de riesgo
// Solo accesible si el usuario está autenticado
router.get("/", ensureAuth, riskController.renderRisk);

// POST: procesa la evaluación de riesgo
// Los datos se envían al backend y se usa la sesión del usuario
router.post("/predict", ensureAuth, riskController.predictRisk);

module.exports = router;
