require("dotenv").config();
const express = require("express");
const session = require("express-session");
const path = require("path");
const bodyParser = require("body-parser");

// Importar middlewares
const { redirectIfAuthenticated } = require("./src/middlewares/auth.middleware.js");
const { handleErrors } = require("./src/middlewares/error.middleware.js");

// Importar rutas
const authRoutes = require("./src/routes/auth.routes.js");
const riskRoutes = require("./src/routes/risk.routes.js");
const adminRoutes = require("./src/routes/admin.routes.js");

// Crear la app
const app = express();

// Configuración de vistas
app.set("views", path.join(__dirname, "src/views"));
app.set("view engine", "ejs");

// Archivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// Middleware para parsing de requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configuración de sesión
app.use(session({
    secret: process.env.SESSION_SECRET || "secretkey123",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 día
}));

// Rutas
app.use("/auth", authRoutes);
app.use("/risk", riskRoutes);
app.use("/admin", adminRoutes);

// Ruta principal
app.get("/", (req, res) => {
    if (req.session.user) {
        return res.redirect("/dashboard");
    }
    res.redirect("/auth/login");
});

// Dashboard
app.get("/dashboard", (req, res) => {
    if (!req.session.user) return res.redirect("/auth/login");
    res.render("dashboard", { user: req.session.user });
});

// Manejo de errores
app.use(handleErrors);

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Frontend activo en puerto ${PORT}`);
});
