// frontend/src/routes/auth.routes.js
const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller.js");

// GET - renderizar vistas
router.get("/login", authController.renderLogin);
router.get("/register", authController.renderRegister);

// POST - acciones
router.post("/login", authController.login);
router.post("/register", authController.register);

module.exports = router;
