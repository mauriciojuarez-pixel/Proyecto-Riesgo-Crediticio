// frontend/app.js

const express = require("express");
const path = require("path");
const session = require("express-session");
require("dotenv").config();

// -------------------- Middlewares --------------------
const { ensureAuth } = require("./src/middlewares/auth.middleware");

// -------------------- Routers --------------------
const authRoutes = require("./src/routes/auth.routes");
const riskRoutes = require("./src/routes/risk.routes");
const adminRoutes = require("./src/routes/admin.routes");

const app = express();
const PORT = process.env.PORT || 3000;

// -------------------- Middlewares globales --------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// EJS
app.set("views", path.join(__dirname, "src/views"));
app.set("view engine", "ejs");

// Sessions (manejo de login)
app.use(session({
    secret: process.env.SESSION_SECRET || "secret123",
    resave: false,
    saveUninitialized: true,
}));

// -------------------- Routers --------------------
app.use("/auth", authRoutes);
app.use("/risk", riskRoutes);
app.use("/admin", adminRoutes);

// -------------------- Rutas principales --------------------
app.get("/", (req, res) => {
    res.redirect("/auth/login");
});

// Dashboard protegido
app.get("/dashboard", ensureAuth, (req, res) => {
    // Pasar la información del usuario a la vista
    res.render("dashboard", { user: req.session.user });
});

// -------------------- Middleware de errores --------------------
const { errorHandler } = require("./src/middlewares/error.middleware");
app.use(errorHandler);

// -------------------- Iniciar servidor --------------------
app.listen(PORT, () => {
    console.log(`Frontend corriendo en http://localhost:${PORT}`);
});
