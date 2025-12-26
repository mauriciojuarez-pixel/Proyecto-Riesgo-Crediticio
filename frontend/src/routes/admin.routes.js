// frontend/src/routes/admin.routes.js
const express = require("express");
const router = express.Router();

// Importamos controladores
const adminController = require("../controllers/admin.controller.js");

// Middleware de autenticación
const { ensureAuthenticated } = require("../middlewares/auth.middleware.js");

// Verificación de controladores para evitar errores de tipo
for (const [key, fn] of Object.entries(adminController)) {
    if (typeof fn !== "function") {
        console.error(`Error: adminController.${key} no es una función válida`);
        process.exit(1); // Detener si algún controlador está mal definido
    }
}

// Rutas del panel de administración
router.get("/", ensureAuthenticated, adminController.renderDashboard);
router.get("/usuarios", ensureAuthenticated, adminController.usuarios);
router.get("/solicitudes", ensureAuthenticated, adminController.solicitudes);
router.get("/decisiones", ensureAuthenticated, adminController.decisiones);
router.get("/retroalimentacion", ensureAuthenticated, adminController.retroalimentacion);

// Exportamos el router
module.exports = router;
