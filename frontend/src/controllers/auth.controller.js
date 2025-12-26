// frontend/src/controllers/auth.controller.js

const authService = require("../services/auth.service.js");

const authController = {
  // Renderiza la página de registro
  renderRegister: (req, res) => {
    res.render("register", { error: null, resultado: null });
  },

  // Procesa el registro
  register: async (req, res) => {
    try {
      const resultado = await authService.register(req.body);
      // Enviar resultado completo a la vista
      res.render("register", { error: null, resultado });
    } catch (err) {
      console.error("Error en register:", err);
      res.render("register", { error: err.response?.data?.detail || err.message || "Error en el registro", resultado: null });
    }
  },

  // Renderiza la página de login
  renderLogin: (req, res) => {
    res.render("login", { error: null });
  },

  // Procesa el login
  login: async (req, res) => {
    try {
      const userData = await authService.login(req.body);

      // Validar que el backend haya devuelto user y token
      if (!userData || !userData.user || !userData.access_token) {
        throw new Error("Respuesta inválida del servidor. Intente nuevamente.");
      }

      // Guardar user completo en la sesión
      req.session.user = {
        id: userData.user.user_id,     // <--- usar user_id del backend
        nombre: userData.user.username,
        rol: userData.user.rol,
        email: userData.user.email
      };
      req.session.token = userData.access_token;

      // Redirigir al dashboard
      res.redirect("/dashboard");
    } catch (err) {
      console.error("Error en login:", err);
      res.render("login", { error: err.response?.data?.detail || err.message || "Usuario o contraseña incorrecta" });
    }
  },

  // Logout
  logout: (req, res) => {
    req.session.destroy(err => {
      if (err) console.error("Error destruyendo sesión:", err);
      res.redirect("/auth/login");
    });
  },
};

module.exports = authController;
