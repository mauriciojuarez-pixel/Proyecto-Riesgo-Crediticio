import numpy as np
import skfuzzy as fuzz
from skfuzzy import control as ctrl

# Antecedentes y consecuente
p_inc = ctrl.Antecedent(np.arange(0, 101, 1), "p_inc")
e_lab = ctrl.Antecedent(np.arange(0, 11, 1), "e_lab")
r_final = ctrl.Consequent(np.arange(0, 101, 1), "r_final")

# Funciones de pertenencia
p_inc["baja"] = fuzz.trimf(p_inc.universe, [0, 0, 30])
p_inc["media"] = fuzz.trimf(p_inc.universe, [20, 50, 70])
p_inc["alta"] = fuzz.trimf(p_inc.universe, [60, 80, 100])
p_inc["critica"] = fuzz.trimf(p_inc.universe, [80, 100, 100])

e_lab["debil"] = fuzz.trimf(e_lab.universe, [0, 0, 4])
e_lab["moderada"] = fuzz.trimf(e_lab.universe, [3, 5, 7])
e_lab["fuerte"] = fuzz.trimf(e_lab.universe, [6, 10, 10])

r_final["bajo"] = fuzz.trimf(r_final.universe, [0, 0, 40])
r_final["moderado"] = fuzz.trimf(r_final.universe, [30, 50, 70])
r_final["alto"] = fuzz.trimf(r_final.universe, [60, 80, 90])
r_final["critico"] = fuzz.trimf(r_final.universe, [80, 100, 100])

# Reglas difusas
rules = [
    ctrl.Rule(p_inc["alta"] & e_lab["fuerte"], r_final["moderado"]),
    ctrl.Rule(p_inc["critica"], r_final["critico"]),
    ctrl.Rule(p_inc["media"] & e_lab["debil"], r_final["alto"]),
    ctrl.Rule(p_inc["baja"] & e_lab["fuerte"], r_final["bajo"]),
]

system = ctrl.ControlSystem(rules)
sim = ctrl.ControlSystemSimulation(system)

def calcular_riesgo_difuso(p, e):
    sim.input["p_inc"] = p
    sim.input["e_lab"] = e
    sim.compute()
    return sim.output["r_final"]
