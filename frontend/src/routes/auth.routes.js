const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller.js");
const { redirectIfAuthenticated } = require("../middlewares/auth.middleware.js");

// Rutas de autenticación

// Login
router.get("/login", redirectIfAuthenticated, authController.renderLogin);
router.post("/login", authController.login);

// Register
router.get("/register", redirectIfAuthenticated, authController.renderRegister);
router.post("/register", authController.register);

// Logout
router.get("/logout", authController.logout);

module.exports = router;
