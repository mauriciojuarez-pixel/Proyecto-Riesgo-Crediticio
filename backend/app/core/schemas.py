from pydantic import BaseModel

# Para predicción
class ClienteData(BaseModel):
    ingreso: float
    deuda_ratio: float
    antiguedad: int
    estabilidad_laboral: int  # 0 a 10

# Para usuarios
class UsuarioCreate(BaseModel):
    username: str
    email: str
    password: str

class UsuarioLogin(BaseModel):
    email: str
    password: str
