// frontend/src/routes/auth.routes.js
const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller.js");

// ----------------------
// RUTAS GET - renderizar vistas
// ----------------------
router.get("/login", authController.renderLogin);
router.get("/register", authController.renderRegister);
router.get("/logout", authController.logout); // nueva ruta para cerrar sesión

// ----------------------
// RUTAS POST - acciones
// ----------------------
router.post("/login", authController.login);   // login crea sesión y redirige
router.post("/register", authController.register); // registro opcionalmente inicia sesión

module.exports = router;
