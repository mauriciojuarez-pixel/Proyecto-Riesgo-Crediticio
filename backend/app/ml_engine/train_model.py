import pandas as pd
from sklearn.ensemble import RandomForestClassifier
import joblib
import os

# Ruta absoluta a backend/data/historical_data.csv
BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../data"))
data_path = os.path.join(BASE_DIR, "historical_data.csv")

# Verifica si el archivo existe
if not os.path.exists(data_path):
    raise FileNotFoundError(f"Archivo no encontrado en: {data_path}")

# Carga del CSV
df = pd.read_csv(data_path)

# Separar variables predictoras y objetivo
X = df[["ingreso", "deuda_ratio", "antiguedad"]]
y = df["incumplimiento"]

# Entrenar modelo RandomForest
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X, y)

# Guardar modelo entrenado
MODEL_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), "ml_model.joblib"))
joblib.dump(model, MODEL_PATH)

print(f"Modelo ML entrenado y guardado en {MODEL_PATH}")
