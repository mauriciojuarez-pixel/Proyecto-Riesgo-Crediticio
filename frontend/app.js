// app.js
const express = require("express");
const session = require("express-session");
const path = require("path");
const dotenv = require("dotenv");

// Cargar variables de entorno
dotenv.config();

const app = express();

// Middlewares globales
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sesión (MemoryStore es suficiente para Render de prueba; en prod usar Redis o DB)
app.use(session({
    secret: process.env.SESSION_SECRET || "mi_secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 } // 1 hora
}));

// Static files
app.use(express.static(path.join(__dirname, "src/public"))); // CSS, JS, imágenes

// Configuración de EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src/views"));

// Importar rutas
const authRoutes = require("./src/routes/auth.routes.js");
const adminRoutes = require("./src/routes/admin.routes.js");
const riskRoutes = require("./src/routes/risk.routes.js");

// Middlewares
const { errorHandler } = require("./src/middlewares/error.middleware.js");

// Rutas principales
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/risk", riskRoutes);

// Dashboard
app.get("/dashboard", (req, res) => {
    if (!req.session.user) return res.redirect("/auth/login");
    res.render("dashboard", { user: req.session.user });
});

// Página raíz
app.get("/", (req, res) => {
    if (req.session.user) return res.redirect("/dashboard");
    res.redirect("/auth/login");
});

// Middleware de manejo de errores
app.use(errorHandler);

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Frontend activo en puerto ${PORT}`);
});
