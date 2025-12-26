# generate_credit_data.py
import pandas as pd
import numpy as np
import os

# Crear carpeta si no existe
os.makedirs("backend/data", exist_ok=True)

# Número de filas
N = 10000

np.random.seed(42)

# --- Generar datos ---
ingreso = np.round(np.random.normal(loc=2500, scale=1500, size=N), 2)
ingreso = np.clip(ingreso, 300, 7000)

deuda_ratio = np.round(np.random.beta(a=2, b=5, size=N), 3)

antiguedad = np.random.randint(0, 11, size=N)

# Estabilidad laboral: 0 a 10
estabilidad_laboral = np.random.randint(0, 11, size=N)

# Probabilidad de incumplimiento simple
prob_inc = 0.1 + 0.6*deuda_ratio + 0.1*(10 - antiguedad)/10
prob_inc = np.clip(prob_inc, 0, 1)
incumplimiento = np.random.binomial(1, prob_inc, size=N)

# --- Reglas simples para resultado ---
def calcular_resultado(row):
    if row["ingreso"] < 1000 or row["deuda_ratio"] > 0.6 or row["antiguedad"] < 2 or row["estabilidad_laboral"] <= 3:
        return "Reprobado"
    elif row["ingreso"] >= 3000 and row["deuda_ratio"] < 0.25 and row["estabilidad_laboral"] >= 7:
        return "Aprobado"
    else:
        return "Requiere Garantía"

# --- Crear DataFrame ---
df = pd.DataFrame({
    "ingreso": ingreso,
    "deuda_ratio": deuda_ratio,
    "antiguedad": antiguedad,
    "estabilidad_laboral": estabilidad_laboral,
    "incumplimiento": incumplimiento
})

df["resultado"] = df.apply(calcular_resultado, axis=1)

# Guardar CSV
df.to_csv("backend/data/historical_data_generated.csv", index=False)

print("Dataset generado con éxito: backend/data/historical_data_generated.csv")
print(df.head())
