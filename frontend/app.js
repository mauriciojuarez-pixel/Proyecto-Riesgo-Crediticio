// frontend/app.js

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();

// ================== MIDDLEWARES ==================
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser()); // necesario para leer cookies

// ================== VIEWS ==================
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src/views"));
app.use(express.static(path.join(__dirname, "public")));

// ================== RUTAS ==================

// Redirigir raíz al login
app.get("/", (req, res) => {
    res.redirect("/auth/login");
});

// Rutas de autenticación
app.use("/auth", require("./src/routes/auth.routes"));

// Rutas de dashboard
app.use("/", require("./src/routes/dashboard.routes"));

// Rutas de evaluación de riesgo
app.use("/", require("./src/routes/risk.routes"));

// ================== PUERTO ==================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Frontend corriendo en puerto", PORT));
