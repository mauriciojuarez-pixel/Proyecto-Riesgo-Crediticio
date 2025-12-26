document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("riskForm");
    if (!form) return;

    const resultadoDiv = document.getElementById("resultado");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        resultadoDiv.textContent = "Evaluando riesgo...";

        const formData = new FormData(form);
        const datos = Object.fromEntries(formData.entries());

        // Convertir a números (importante para el backend ML)
        datos.ingreso = parseFloat(datos.ingreso);
        datos.deuda_ratio = parseFloat(datos.deuda_ratio);
        datos.antiguedad = parseInt(datos.antiguedad);
        datos.estabilidad_laboral = parseInt(datos.estabilidad_laboral);

        try {
            const res = await fetch("/risk/predict", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(datos)
            });

            const data = await res.json();

            if (!res.ok) {
                resultadoDiv.textContent = "Error: " + (data.error || "No se pudo evaluar");
                return;
            }

            resultadoDiv.textContent = `Nivel de riesgo: ${data.riesgo}`;

        } catch (err) {
            console.error("Error frontend:", err);
            resultadoDiv.textContent = "Error de conexión con el servidor";
        }
    });
});
