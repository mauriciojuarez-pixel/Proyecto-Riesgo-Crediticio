// frontend/src/routes/admin.routes.js
const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin.controller");
const { ensureAuthenticated } = require("../middlewares/auth.middleware");

// Dashboard y vistas admin
router.get("/", ensureAuthenticated, adminController.renderDashboard);
router.get("/usuarios", ensureAuthenticated, adminController.usuarios);
router.get("/solicitudes", ensureAuthenticated, adminController.solicitudes);
router.get("/decisiones", ensureAuthenticated, adminController.decisiones);
router.get("/retroalimentacion", ensureAuthenticated, adminController.retroalimentacion);

module.exports = router;
