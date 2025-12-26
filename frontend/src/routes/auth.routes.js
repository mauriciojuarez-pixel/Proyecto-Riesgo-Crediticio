// frontend/src/routes/auth.routes.js
const express = require("express");
const router = express.Router();

// Importamos controladores
const authController = require("../controllers/auth.controller.js");

// Middleware para redirigir si ya está logueado
const { redirectIfAuthenticated } = require("../middlewares/auth.middleware.js");

// Verificación de controladores para evitar errores de tipo
for (const [key, fn] of Object.entries(authController)) {
    if (typeof fn !== "function") {
        console.error(`Error: authController.${key} no es una función válida`);
        process.exit(1); // Detener la app si algún controlador está mal definido
    }
}

// Mostrar login
router.get("/login", redirectIfAuthenticated, (req, res) => {
    res.render("auth/login", { error: null });
});

// Procesar login
router.post("/login", authController.login);

// Logout
router.get("/logout", authController.logout);

// Exportamos el router
module.exports = router;
