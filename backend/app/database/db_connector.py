# backend/app/database/db_connector.py
from pymongo import MongoClient

# URL de conexión a tu MongoDB Atlas
MONGO_URI = "mongodb+srv://heinsperr_db_user:8qafy5hjTJ1ZuzIN@aplazadossi.y1wl5at.mongodb.net/RiesgoCrediticio?retryWrites=true&w=majority"

# Inicializar cliente
client = MongoClient(MONGO_URI)

# Seleccionar la base de datos
db = client["RiesgoCrediticio"]

# Colecciones
usuarios_collection = db["usuarios"]
solicitudes_collection = db["solicitudes_clientes"]
decisiones_collection = db["decisiones_riesgo"]
