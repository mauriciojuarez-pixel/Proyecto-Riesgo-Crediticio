# backend/app/database/db_connector.py
from pymongo import MongoClient
from bson.objectid import ObjectId
import os

# -------------------- CONFIGURACIÓN --------------------
MONGO_URI = os.getenv("MONGO_URI", "mongodb+srv://heinsperr_db_user:8qafy5hjTJ1ZuzIN@aplazadossi.y1wl5at.mongodb.net/RiesgoCrediticio?retryWrites=true&w=majority")
DB_NAME = "RiesgoCrediticio"

# -------------------- CONEXIÓN --------------------
client = MongoClient(MONGO_URI)
db = client[DB_NAME]

# -------------------- COLECCIONES --------------------
usuarios_collection = db["Usuarios"]
solicitudes_collection = db["SolicitudesClientes"]
decisiones_collection = db["DecisionesRiesgo"]
retroalimentacion_collection = db["Retroalimentacion"]

# -------------------- FUNCIONES AUXILIARES --------------------
def objectid_to_str(document):
    """Convierte _id de ObjectId a str"""
    if "_id" in document:
        document["_id"] = str(document["_id"])
    return document
