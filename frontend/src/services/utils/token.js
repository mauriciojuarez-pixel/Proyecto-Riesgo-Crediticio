// frontend/src/service/utils/token.js


// Funciones para manejar token en sessionStorage (frontend)
const tokenUtil = {
    setToken: (token) => {
        if (token) sessionStorage.setItem("token", token);
    },
    getToken: () => {
        return sessionStorage.getItem("token");
    },
    removeToken: () => {
        sessionStorage.removeItem("token");
    }
};

module.exports = tokenUtil;
