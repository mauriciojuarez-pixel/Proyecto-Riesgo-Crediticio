# Estructura de Colecciones - MongoDB

## 1. Usuarios
Almacena información de los usuarios (clientes o administradores).

**Documento de ejemplo:**
```json
{
  "_id": ObjectId,
  "nombre": "Juan Pérez",
  "email": "juan@example.com",
  "password_hash": "hashed_password_aqui",
  "rol": "cliente",           // o "admin"
  "created_at": ISODate,
  "ultimo_login": ISODate
}

Campos clave:

nombre: Nombre completo del usuario.

email: Correo electrónico único para login.

password_hash: Contraseña encriptada.

rol: Cliente o admin.

created_at: Fecha de creación.

ultimo_login: Fecha del último acceso (opcional).

## 2. SolicitudesClientes

Almacena las solicitudes de crédito de los clientes.

Documento de ejemplo:

{
  "_id": ObjectId,
  "usuario_id": ObjectId,       // referencia a Usuarios
  "ingreso": 3500.50,
  "deuda_ratio": 0.18,
  "antiguedad": 5,
  "estabilidad_laboral": 8,
  "fecha": ISODate
}


Campos clave:

usuario_id: Relación con la colección Usuarios.

ingreso, deuda_ratio, antiguedad, estabilidad_laboral: Datos financieros y laborales.

fecha: Fecha de la solicitud.

3. DecisionesRiesgo

Almacena las decisiones generadas por el sistema inteligente (ML + lógica difusa).

Documento de ejemplo:

{
  "_id": ObjectId,
  "solicitud_id": ObjectId,        // referencia a SolicitudesClientes
  "P_inc_ML": 0.02,
  "Riesgo_Final_LF": 17.62,
  "Recomendacion": "Aprobar",     // Aprobar / Rechazar
  "fecha": ISODate
}


Campos clave:

solicitud_id: Relaciona la decisión con la solicitud original.

P_inc_ML: Probabilidad de incumplimiento calculada por ML.

Riesgo_Final_LF: Valor calculado por lógica difusa.

Recomendacion: Resultado final.

fecha: Fecha de la decisión.

4. Retroalimentacion

Almacena comentarios o feedback sobre decisiones o el sistema.

Documento de ejemplo:

{
  "_id": ObjectId,
  "usuario_id": ObjectId,       // referencia a Usuarios
  "decision_id": ObjectId,      // opcional, referencia a DecisionesRiesgo
  "comentario": "El monto aprobado es muy bajo",
  "fecha": ISODate
}


Campos clave:

usuario_id: Usuario que envía el feedback.

decision_id: A qué decisión se refiere (opcional).

comentario: Texto del comentario.

fecha: Fecha del comentario.

Relaciones entre colecciones

Usuarios → SolicitudesClientes (1:N)

SolicitudesClientes → DecisionesRiesgo (1:1)

Usuarios → Retroalimentacion (1:N)

DecisionesRiesgo → Retroalimentacion (1:N opcional)