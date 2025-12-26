# backend/app/ml_engine/prediction_service.py

import pandas as pd
import joblib
import os
from .fuzzy_logic import calcular_riesgo_difuso

# Cargar modelo ML entrenado
MODEL_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), "ml_model.joblib"))
model = joblib.load(MODEL_PATH)

def get_final_risk(data):
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
        columnas_modelo = model.feature_names_in_.tolist()  # columnas exactas que usó el modelo
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

        # Retornar resultados redondeados
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
