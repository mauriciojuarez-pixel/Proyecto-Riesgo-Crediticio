const express = require("express");
const router = express.Router();

const adminController = require("../controllers/admin.controller");

router.get("/usuarios", adminController.getUsuarios);
router.get("/solicitudes", adminController.getSolicitudes);
router.post("/decisiones/:id", adminController.updateDecision);

module.exports = router;
