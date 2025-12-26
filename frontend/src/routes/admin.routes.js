// frontend/src/routes/admin.routes.js
const express = require("express");
const router = express.Router();

// Importamos controladores
const {
    renderDashboard,
    usuarios,
    solicitudes,
    decisiones,
    retroalimentacion
} = require("../controllers/admin.controller.js");

// Middleware de autenticación
const { ensureAuthenticated } = require("../middlewares/auth.middleware.js");

// Rutas del panel de administración
router.get("/", ensureAuthenticated, renderDashboard);
router.get("/usuarios", ensureAuthenticated, usuarios);
router.get("/solicitudes", ensureAuthenticated, solicitudes);
router.get("/decisiones", ensureAuthenticated, decisiones);
router.get("/retroalimentacion", ensureAuthenticated, retroalimentacion);

// Exportamos el router
module.exports = router;
