const authService = require("../services/auth.service");

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
      res.render("register", { error: err.message, resultado: null });
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
      res.render("login", { error: err.message });
    }
  },

  // Logout
  logout: (req, res) => {
    req.session.destroy(() => {
      res.redirect("/auth/login");
    });
  },
};

module.exports = authController;
