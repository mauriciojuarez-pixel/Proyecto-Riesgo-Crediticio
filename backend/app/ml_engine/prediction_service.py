import joblib
import os
from .fuzzy_logic import calcular_riesgo_difuso

# Cargar modelo ML
MODEL_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), "ml_model.joblib"))
model = joblib.load(MODEL_PATH)

def get_final_risk(data):
    """
    data = {
        "ingreso": float,
        "deuda_ratio": float,
        "antiguedad": int,
        "estabilidad_laboral": int (0-10)
    }
    """
    X = [[data["ingreso"], data["deuda_ratio"], data["antiguedad"]]]
    
    # Probabilidad de incumplimiento por ML
    p_inc = model.predict_proba(X)[0][1] * 100
    
    # Riesgo final por Lógica Difusa
    riesgo = calcular_riesgo_difuso(p_inc, data["estabilidad_laboral"])

    # Recomendación
    if riesgo < 40:
        rec = "Aprobar"
    elif riesgo < 70:
        rec = "Requiere Garantía"
    else:
        rec = "Rechazar"

    return {
        "P_inc_ML": round(p_inc,2),
        "Riesgo_Final_LF": round(riesgo,2),
        "Recomendacion": rec
    }
