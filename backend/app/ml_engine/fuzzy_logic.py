# backend/app/ml_engine/fuzzy_logic.py

import numpy as np
import skfuzzy as fuzz
from skfuzzy import control as ctrl

# ----------------------------
# Definición de Antecedentes y Consecuente
# ----------------------------
# Probabilidad de incumplimiento por ML (0-100)
p_inc = ctrl.Antecedent(np.arange(0, 101, 1), "p_inc")      

# Estabilidad laboral del solicitante (0-10)
e_lab = ctrl.Antecedent(np.arange(0, 11, 1), "e_lab")       

# Riesgo final de crédito (0-100)
r_final = ctrl.Consequent(np.arange(0, 101, 1), "r_final")  

# ----------------------------
# Funciones de pertenencia
# ----------------------------
# Probabilidad de incumplimiento
p_inc["baja"] = fuzz.trimf(p_inc.universe, [0, 0, 30])
p_inc["media"] = fuzz.trimf(p_inc.universe, [20, 50, 70])
p_inc["alta"] = fuzz.trimf(p_inc.universe, [60, 80, 100])
p_inc["critica"] = fuzz.trimf(p_inc.universe, [80, 100, 100])

# Estabilidad laboral
e_lab["debil"] = fuzz.trimf(e_lab.universe, [0, 0, 4])
e_lab["moderada"] = fuzz.trimf(e_lab.universe, [3, 5, 7])
e_lab["fuerte"] = fuzz.trimf(e_lab.universe, [6, 10, 10])

# Riesgo final
r_final["bajo"] = fuzz.trimf(r_final.universe, [0, 0, 40])
r_final["moderado"] = fuzz.trimf(r_final.universe, [30, 50, 70])
r_final["alto"] = fuzz.trimf(r_final.universe, [60, 80, 90])
r_final["critico"] = fuzz.trimf(r_final.universe, [80, 100, 100])

# ----------------------------
# Reglas difusas
# ----------------------------
rules = [
    # Baja probabilidad de incumplimiento
    ctrl.Rule(p_inc["baja"] & e_lab["debil"], r_final["bajo"]),
    ctrl.Rule(p_inc["baja"] & e_lab["moderada"], r_final["bajo"]),
    ctrl.Rule(p_inc["baja"] & e_lab["fuerte"], r_final["bajo"]),

    # Media probabilidad de incumplimiento
    ctrl.Rule(p_inc["media"] & e_lab["debil"], r_final["alto"]),
    ctrl.Rule(p_inc["media"] & e_lab["moderada"], r_final["moderado"]),
    ctrl.Rule(p_inc["media"] & e_lab["fuerte"], r_final["bajo"]),

    # Alta probabilidad de incumplimiento
    ctrl.Rule(p_inc["alta"] & e_lab["debil"], r_final["critico"]),
    ctrl.Rule(p_inc["alta"] & e_lab["moderada"], r_final["alto"]),
    ctrl.Rule(p_inc["alta"] & e_lab["fuerte"], r_final["moderado"]),

    # Probabilidad crítica de incumplimiento
    ctrl.Rule(p_inc["critica"], r_final["critico"]),
]

# Crear sistema de control
system = ctrl.ControlSystem(rules)

# ----------------------------
# Función para calcular riesgo difuso
# ----------------------------
def calcular_riesgo_difuso(p, e):
    """
    Calcula el riesgo final combinando probabilidad ML y estabilidad laboral.
    
    Parámetros:
    - p: float, probabilidad de incumplimiento (0-100)
    - e: int, estabilidad laboral (0-10)
    
    Retorna:
    - float: riesgo final (0-100)
    """
    # Validar rangos de entrada
    if not (0 <= p <= 100):
        raise ValueError(f"Probabilidad de incumplimiento inválida: {p}")
    if not (0 <= e <= 10):
        raise ValueError(f"Estabilidad laboral inválida: {e}")

    # Crear una simulación independiente para evitar conflictos
    sim = ctrl.ControlSystemSimulation(system)
    sim.input["p_inc"] = p
    sim.input["e_lab"] = e
    sim.compute()
    return sim.output["r_final"]
