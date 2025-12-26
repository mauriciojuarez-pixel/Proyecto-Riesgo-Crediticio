# backend/app/ml_engine/prediction_service.py

import pandas as pd
import joblib
from pathlib import Path
from .fuzzy_logic import calcular_riesgo_difuso

# ----------------------------
# Cargar modelo ML entrenado
# ----------------------------
BASE_DIR = Path(__file__).parent  # backend/app/ml_engine
MODEL_PATH = BASE_DIR / "ml_model.joblib"

try:
    model = joblib.load(MODEL_PATH)
except FileNotFoundError:
    raise FileNotFoundError(f"Modelo ML no encontrado en {MODEL_PATH}")

# ----------------------------
# Función de cálculo de riesgo
# ----------------------------
def get_final_risk(data: dict) -> dict:
    """
    Calcula el riesgo final combinando ML y Lógica Difusa.
    
    data = {
        "ingreso": float,
        "deuda_ratio": float,
        "antiguedad": int,
        "estabilidad_laboral": int (0-10)
    }
    """
    try:
        # --- Validar y convertir tipos ---
        ingreso = float(data.get("ingreso", 0))
        deuda_ratio = float(data.get("deuda_ratio", 0))
        antiguedad = int(data.get("antiguedad", 0))
        estabilidad_laboral = int(data.get("estabilidad_laboral", 5))

        # --- Preparar input para ML ---
        columnas_modelo = getattr(model, "feature_names_in_", ["ingreso", "deuda_ratio", "antiguedad"])
        X_dict = {col: locals()[col] for col in columnas_modelo}  # tomar solo columnas necesarias
        X = pd.DataFrame([X_dict])

        # --- Probabilidad de incumplimiento por ML ---
        p_inc = model.predict_proba(X)[0][1] * 100

        # --- Riesgo final usando Lógica Difusa ---
        riesgo = calcular_riesgo_difuso(p_inc, estabilidad_laboral)

        # --- Recomendación ---
        if riesgo < 40:
            rec = "Aprobar"
        elif riesgo < 70:
            rec = "Requiere Garantía"
        else:
            rec = "Rechazar"

        # --- Retornar resultados ---
        return {
            "P_inc_ML": round(p_inc, 2),
            "Riesgo_Final_LF": round(riesgo, 2),
            "Recomendacion": rec
        }

    except Exception as e:
        # Captura cualquier error y devuelve un resultado válido para frontend
        return {
            "P_inc_ML": None,
            "Riesgo_Final_LF": None,
            "Recomendacion": f"Error en cálculo de riesgo: {e}"
        }
