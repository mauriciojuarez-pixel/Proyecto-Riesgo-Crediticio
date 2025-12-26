// frontend/src/routes/admin.routes.js
const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin.controller.js");
const { ensureAuth } = require("../middlewares/auth.middleware.js");

// -------------------- Rutas Admin --------------------

// Dashboard principal
router.get("/", ensureAuth, adminController.renderDashboard);

// Lista de usuarios
router.get("/usuarios", ensureAuth, adminController.usuarios);

// Lista de solicitudes
router.get("/solicitudes", ensureAuth, adminController.solicitudes);

// Decisiones tomadas
router.get("/decisiones", ensureAuth, adminController.decisiones);

// Retroalimentación recibida
router.get("/retroalimentacion", ensureAuth, adminController.retroalimentacion);

// -------------------- Validación de funciones --------------------
for (const [key, fn] of Object.entries(adminController)) {
    if (typeof fn !== "function") {
        console.error(`Error: adminController.${key} no es una función válida`);
        process.exit(1);
    }
}

module.exports = router;
