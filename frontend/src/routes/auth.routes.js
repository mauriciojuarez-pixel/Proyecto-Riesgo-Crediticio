const express = require("express");
const router = express.Router();
const { login } = require("../controllers/auth.controller.js");
const { redirectIfAuthenticated } = require("../middlewares/auth.middleware.js");

// Mostrar login
router.get("/login", redirectIfAuthenticated, (req, res) => {
    res.render("auth/login", { error: null });
});

// Procesar login
router.post("/login", login);

// Logout
router.get("/logout", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/auth/login");
    });
});

module.exports = router;
