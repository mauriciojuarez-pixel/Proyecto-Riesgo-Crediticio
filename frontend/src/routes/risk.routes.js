// frontend/src/routes/risk.routes.js
// frontend/src/routes/risk.routes.js
const express = require("express");
const router = express.Router();
const riskController = require("../controllers/risk.controller.js");

router.get("/risk", riskController.renderRisk);
router.post("/risk/predict", riskController.predictRisk);

module.exports = router;
