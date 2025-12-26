// frontend/src/services/utils/token.js

const TOKEN_KEY = "access_token";

/**
 * Guarda el token JWT en el almacenamiento local
 * @param {string} token
 */
function setToken(token) {
    localStorage.setItem(TOKEN_KEY, token);
}

/**
 * Obtiene el token JWT del almacenamiento local
 * @returns {string|null}
 */
function getToken() {
    return localStorage.getItem(TOKEN_KEY);
}

/**
 * Elimina el token JWT del almacenamiento local
 */
function removeToken() {
    localStorage.removeItem(TOKEN_KEY);
}

/**
 * Decodifica el payload del token (opcional)
 * @param {string} token
 * @returns {object|null}
 */
function decodeToken(token) {
    if (!token) return null;
    try {
        const payload = token.split('.')[1];
        const decoded = JSON.parse(atob(payload));
        return decoded;
    } catch (err) {
        console.error("Error decodificando token:", err);
        return null;
    }
}

module.exports = {
    setToken,
    getToken,
    removeToken,
    decodeToken
};
