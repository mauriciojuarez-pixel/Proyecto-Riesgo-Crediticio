// frontend/src/routes/auth.routes.js
const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller.js");
const { redirectIfAuthenticated } = require("../middlewares/auth.middleware.js");

// -------------------- LOGIN --------------------
// Mostrar formulario de login
router.get("/login", redirectIfAuthenticated, (req, res) => {
    res.render("auth/login", { error: null });
});

// Procesar login
router.post("/login", authController.login);

// -------------------- LOGOUT --------------------
router.get("/logout", authController.logout);

// -------------------- REGISTER --------------------
// Mostrar formulario de registro
router.get("/register", redirectIfAuthenticated, (req, res) => {
    res.render("auth/register", { error: null, success: null });
});

// Procesar registro
router.post("/register", authController.register);

module.exports = router;
