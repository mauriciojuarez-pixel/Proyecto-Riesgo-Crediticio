// frontend/src/public/js/app.js
console.log("Frontend cargado correctamente");

// Botones para cambiar entre login y registro
document.getElementById('goRegister')?.addEventListener('click', () => {
    window.location.href = '/register';
});
document.getElementById('goLogin')?.addEventListener('click', () => {
    window.location.href = '/';
});

// Login
const loginForm = document.getElementById('loginForm');
loginForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const res = await fetch('http://localhost:8000/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await res.json();

        if (res.ok) {
            localStorage.setItem('token', data.access_token);
            window.location.href = "/dashboard";
        } else {
            document.getElementById('message').textContent = data.detail || "Error en login";
        }
    } catch (err) {
        document.getElementById('message').textContent = err.message;
    }
});

// Registro
const registerForm = document.getElementById('registerForm');
registerForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('regUsername').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;

    try {
        const res = await fetch('http://localhost:8000/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password })
        });
        const data = await res.json();

        if (res.ok) {
            document.getElementById('message').textContent = "Registro exitoso! Ahora inicia sesión.";
        } else {
            document.getElementById('message').textContent = data.detail || "Error en registro";
        }
    } catch (err) {
        document.getElementById('message').textContent = err.message;
    }
});


// -------------------- Predicción de riesgo --------------------
async function enviarSolicitud(event) {
    event.preventDefault();

    const token = localStorage.getItem("access_token");
    if (!token) {
        alert("Debes iniciar sesión primero");
        return;
    }

    const ingreso = parseFloat(document.getElementById("ingreso").value);
    const deuda_ratio = parseFloat(document.getElementById("deuda_ratio").value);
    const antiguedad = parseInt(document.getElementById("antiguedad").value);
    const estabilidad_laboral = parseInt(document.getElementById("estabilidad_laboral").value);

    const solicitud = { ingreso, deuda_ratio, antiguedad, estabilidad_laboral };

    try {
        const response = await fetch("http://localhost:8000/risk/predict_risk", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(solicitud)
        });

        const data = await response.json();

        if (response.ok) {
            // Mostrar resultado en un div
            document.getElementById("resultado").innerText = JSON.stringify(data, null, 2);
        } else {
            alert(data.detail || "Error en la predicción");
        }
    } catch (error) {
        console.error("Error en predicción:", error);
        alert("Error en la conexión al servidor");
    }
}

// -------------------- Eventos --------------------
document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    if (loginForm) loginForm.addEventListener("submit", login);

    const riesgoForm = document.getElementById("riesgoForm");
    if (riesgoForm) riesgoForm.addEventListener("submit", enviarSolicitud);
});
