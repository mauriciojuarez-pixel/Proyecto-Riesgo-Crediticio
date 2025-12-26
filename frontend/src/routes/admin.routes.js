const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin.controller.js");
const { ensureAuthenticated } = require("../middlewares/auth.middleware.js");

// Usuarios
router.get("/usuarios", ensureAuthenticated, adminController.renderUsuarios);

// Solicitudes
router.get("/solicitudes", ensureAuthenticated, adminController.renderSolicitudes);

// Decisiones
router.put("/decisiones/:id", ensureAuthenticated, adminController.actualizarDecision);

// Retroalimentación
router.get("/retroalimentacion", ensureAuthenticated, adminController.renderRetroalimentacion);

module.exports = router;
