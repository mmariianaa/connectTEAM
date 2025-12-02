from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from bson import ObjectId
from BackEnd.GlobalInfo import Keys as ColabsKey
import BackEnd.Functions as CallMethod
import BackEnd.GlobalInfo.ResponseMessages as respuestas


app = Flask(__name__)
CORS(app, origins=[
    "http://localhost:8100",
    "http://localhost:4200", 
    "http://192.168.120.13:8100",
    "http://192.168.100.150:8100",
    "http://localhost:3000"
])

@app.route('/')
@cross_origin()
def home():
    return jsonify({
        "message": "API ConnectTeam funcionando",
        "endpoints": {
            "GET /getAllUsers": "Obtener todos los usuarios",
            "POST /login": "Login de usuario",
            "POST /registro": "Registro de nuevo usuario",
            "GET /user/<id>": "Obtener usuario por ID"
        }
    })
@app.route('/tarea/<tarea_id>/actualizar', methods=["POST"])
@cross_origin()
def actualizar_tarea(tarea_id):
    from bson import ObjectId
    data = request.get_json()

    ColabsKey.dbconn["tarea"].update_one(
        {"_id": ObjectId(tarea_id)},
        {"$set": {"checklist": data.get("checklist", [])}}
    )

    return jsonify({"Respuesta": "Checklist actualizado"})



@app.route('/getAllUsers', methods=["GET"])
@cross_origin()
def getUsers():
    try:
        objResult = CallMethod.fnGetAllUsers()
        return objResult
    except Exception as e:
        print(f"Error en getUsers: {e}")
        return jsonify(respuestas.err500)

@app.route('/login', methods=["POST"])
@cross_origin()
def postLogin():
    try:
        if not request.is_json:
            objResponse = respuestas.err203.copy()
            objResponse['Error'] = "Se esperaba JSON en la solicitud"
            return jsonify(objResponse)
            
        data = request.get_json()
        print(f"Datos recibidos en login: {data}")
        
        email = data.get('email')
        password = data.get('password')
        
        if not email or not password:
            objResponse = respuestas.err203.copy()
            objResponse['Error'] = "Los campos 'email' y 'password' son requeridos"
            return jsonify(objResponse)
            
        objResult = CallMethod.fnPostLogin(email, password)
        return objResult
        
    except Exception as e:
        print(f"Error en login: {e}")
        return jsonify(respuestas.err500)

@app.route('/registro', methods=["POST"])
@cross_origin()
def postRegistro():
    try:
        if not request.is_json:
            objResponse = respuestas.err203.copy()
            objResponse['Error'] = "Se esperaba JSON en la solicitud"
            return jsonify(objResponse)
            
        data = request.get_json()
        print(f"Datos recibidos en registro: {data}")
        
        email = data.get('email')
        password = data.get('password')
        role = data.get('role')
        
        if not email or not password:
            objResponse = respuestas.err203.copy()
            objResponse['Error'] = "Los campos 'email' y 'password' son requeridos"
            return jsonify(objResponse)
            
        objResult = CallMethod.fnPostRegistro(email, password, role)
        return objResult
        
    except Exception as e:
        print(f"Error en registro: {e}")
        return jsonify(respuestas.err500)
    
# Directions.py
@app.route('/tablero', methods=["POST"])
@cross_origin()
def postTablero():
    try:
        if not request.is_json:
            r = respuestas.err203.copy()
            r["Error"] = "Se esperaba JSON en la solicitud"
            return jsonify(r)

        data = request.get_json()
        nombre = data.get("nombre")
        propietario = data.get("propietario")
        colaboradores = data.get("colaboradores", [])
        codigoRandom = data.get("codigoRandom", "")
        fechaCreacion = data.get("fechaCreacion")  # ISO string

        if not nombre or not propietario:
            r = respuestas.err203.copy()
            r["Error"] = "Los campos 'nombre' y 'propietario' son requeridos"
            return jsonify(r)

        return CallMethod.fnPostTablero(nombre, propietario, colaboradores, codigoRandom, fechaCreacion)

    except Exception as e:
        print(f"Error en creación de tablero: {e}")
        return jsonify(respuestas.err500)
    
@app.route('/tablero/unirse', methods=["POST"])
@cross_origin()
def unirseATableroPorCodigo():
    data = request.get_json()
    colaborador_id = data.get("colaboradorId")
    codigo = data.get("codigoRandom")

    oid_colab = ObjectId(colaborador_id)
    usuario = ColabsKey.dbUsers.find_one({"_id": oid_colab})
    if not usuario:
        return jsonify({"Error": "El colaborador no existe"})

    tablero = ColabsKey.dbTableros.find_one({"codigoRandom": codigo})
    if not tablero:
        return jsonify({"Error": "No existe un tablero con ese código"})

    ColabsKey.dbTableros.update_one(
        {"_id": tablero["_id"]},
        {"$addToSet": {"colaboradores": oid_colab}}
    )

    return jsonify({
        "Respuesta": {
            "mensaje": "Te has unido al tablero",
            "tableroId": str(tablero["_id"]),
            "nombre": tablero.get("nombre", "")
        }
    })

@app.route('/tablero/<tablero_id>/asignar_tareas', methods=["POST"])
@cross_origin()
def asignarTareas(tablero_id):
    from bson import ObjectId
    from datetime import datetime
    data = request.get_json()

    colaborador_id = data.get("colaboradorId")
    tareas = data.get("tareas", [])

    if not colaborador_id or not tareas:
        return jsonify({"Error": "Faltan datos"})

    if ColabsKey.dbconn is None:
        ColabsKey.initialize_db()

    tarea_doc = {
        "tableroId": ObjectId(tablero_id),
        "colaboradorId": ObjectId(colaborador_id),
        "tareas": tareas,
        "fechaAsignacion": datetime.utcnow()
    }

    result = ColabsKey.dbconn["tareasasignadas"].insert_one(tarea_doc)

    return jsonify({
        "Respuesta": {
            "id": str(result.inserted_id),
            "mensaje": "Tareas asignadas correctamente"
        }
    })

@app.route('/tareasasignadas/<tarea_id>/actualizar', methods=["POST"])
@cross_origin()
def actualizarTarea(tarea_id):
    from bson import ObjectId
    data = request.get_json()
    cambios = {}

    if "completadas" in data:
        cambios["completadas"] = data["completadas"]
    if "archivos" in data:
        cambios["archivos"] = data["archivos"]

    result = ColabsKey.dbconn["tareasasignadas"].update_one(
        {"_id": ObjectId(tarea_id)},
        {"$set": cambios}
    )

    return jsonify({"Respuesta": "Actualizado correctamente"})


@app.route('/tablero/<tablero_id>/colaborador/<colaborador_id>/tareas', methods=["GET"])
@cross_origin()
def obtenerTareasPorTableroYColaborador(tablero_id, colaborador_id):
    from bson import ObjectId
    if ColabsKey.dbconn is None:
        ColabsKey.initialize_db()

    tareas = list(ColabsKey.dbconn["tareasasignadas"].find({
        "tableroId": ObjectId(tablero_id),
        "colaboradorId": ObjectId(colaborador_id)
    }))

    for t in tareas:
        t["_id"] = str(t["_id"])
        t["tableroId"] = str(t["tableroId"])
        t["colaboradorId"] = str(t["colaboradorId"])
    return jsonify({"Respuesta": tareas})


@app.route('/tablero/<tablero_id>/integrantes', methods=["GET"])
@cross_origin()
def getIntegrantesPorTablero(tablero_id):
    tablero = ColabsKey.dbTableros.find_one({"_id": ObjectId(tablero_id)})
    if not tablero:
        return jsonify({"Error": "Tablero no encontrado"})

    integrantes = []
    for colab_id in tablero.get("colaboradores", []):
        usuario = ColabsKey.dbUsers.find_one({"_id": colab_id})
        if usuario:
            integrantes.append({
                "id": str(usuario["_id"]),
                "nombre": usuario.get("nombre", ""),
                "email": usuario.get("email", usuario.get("correo", "")),
                "rol": usuario.get("rol", "")
            })

    return jsonify({"Respuesta": integrantes})

@app.route('/tablero/colaborador/<colaborador_id>', methods=["GET"])
@cross_origin()
def getTablerosPorColaborador(colaborador_id):
    try:
        oid = ObjectId(colaborador_id)
        docs = list(ColabsKey.dbTableros.find({"colaboradores": oid}))
        tableros = []

        for d in docs:
            propietario_id = d.get("propietario")
            propietario_nombre = ""

            if propietario_id:
                try:
                    u = ColabsKey.dbUsers.find_one({"_id": propietario_id})
                    if u:
                        propietario_nombre = u.get("nombre", "")
                except:
                    propietario_nombre = ""

            tableros.append({
                "id": str(d["_id"]),
                "nombre": d.get("nombre", ""),
                "codigoRandom": d.get("codigoRandom", ""),
                "estado": d.get("estado", "activo"),
                "propietarioNombre": propietario_nombre
            })

        return jsonify({"Respuesta": tableros})
    except Exception as e:
        print(f"Error en getTablerosPorColaborador: {e}")
        return jsonify({"Error": "No se pudo obtener los tableros"})


@app.route('/tablero', methods=["GET"])
@cross_origin()
def getTableros():
    try:
        if ColabsKey.dbTableros is None:
            ColabsKey.initialize_db()

        docs = list(ColabsKey.dbTableros.find({}))
        tableros = []
        for d in docs:
            propietario_id = d.get("propietario")
            propietario_nombre = ""
            if propietario_id:
                try:
                    usuario = ColabsKey.dbUsers.find_one({"_id": ObjectId(propietario_id)})
                    if usuario:
                        propietario_nombre = usuario.get("nombre", "")
                except Exception:
                    propietario_nombre = ""
            tableros.append({
                "id": str(d.get("_id")),
                "nombre": d.get("nombre", ""),
                "propietario": str(d.get("propietario")) if d.get("propietario") else "",
                "propietarioNombre": propietario_nombre,
                "colaboradores": [str(c) for c in d.get("colaboradores", [])],
                "codigoRandom": d.get("codigoRandom", ""),
                "fechaCreacion": d.get("fechaCreacion").isoformat() if d.get("fechaCreacion") else "",
                "estado": d.get("estado", "")
            })

        r = respuestas.succ200.copy()
        r["Respuesta"] = tableros
        return jsonify(r)

    except Exception as e:
        print(f"Error en getTableros: {e}")
        return jsonify(respuestas.err500)
    

@app.route('/tablero/propietario/<propietario_id>', methods=["GET"])
@cross_origin()
def getTablerosByPropietario(propietario_id):
    try:
        if ColabsKey.dbTableros is None:
            ColabsKey.initialize_db()

        from bson import ObjectId

        try:
            oid = ObjectId(propietario_id)
        except Exception:
            r = respuestas.err203.copy()
            r["Error"] = "El propietario_id no es un ObjectId válido"
            return jsonify(r)

        docs = list(ColabsKey.dbTableros.find({"propietario": oid}))
        tableros = []
        for d in docs:
            propietario_id = d.get("propietario")
            propietario_nombre = ""
            if propietario_id:
                try:
                    usuario = ColabsKey.dbUsers.find_one({"_id": ObjectId(propietario_id)})
                    if usuario:
                        propietario_nombre = usuario.get("nombre", "")
                except Exception:
                    propietario_nombre = ""
            tableros.append({
                "id": str(d.get("_id")),
                "nombre": d.get("nombre", ""),
                "propietario": str(d.get("propietario")) if d.get("propietario") else "",
                "propietarioNombre": propietario_nombre,
                "colaboradores": [str(c) for c in d.get("colaboradores", [])],
                "codigoRandom": d.get("codigoRandom", ""),
                "fechaCreacion": d.get("fechaCreacion").isoformat() if d.get("fechaCreacion") else "",
                "estado": d.get("estado", "activo")
            })

        r = respuestas.succ200.copy()
        r["Respuesta"] = tableros
        return jsonify(r)

    except Exception as e:
        print(f"Error en getTablerosByPropietario: {e}")
        return jsonify(respuestas.err500)


@app.route('/user/<user_id>', methods=["GET"])
@cross_origin()
def getUserById(user_id):
    try:
        objResult = CallMethod.fnGetUserById(user_id)
        return objResult
    except Exception as e:
        print(f"Error en getUserById: {e}")
        return jsonify(respuestas.err500)

@app.errorhandler(404)
def not_found(error):
    return jsonify({
        "intResponse": "404",
        "strAnswer": "Endpoint no encontrado",
        "Error": "La ruta solicitada no existe"
    }), 404

@app.errorhandler(405)
def method_not_allowed(error):
    return jsonify({
        "intResponse": "405",
        "strAnswer": "Método no permitido",
        "Error": "El método HTTP no está permitido para esta ruta"
    }), 405

if __name__ == '__main__':
    print("Iniciando servidor ConnectTeam API...")
    print("URL: http://0.0.0.0:3000")
    print("Endpoints disponibles:")
    print("  GET  /")
    print("  GET  /getAllUsers")
    print("  POST /login")
    print("  POST /registro")
    print("  GET  /user/<id>")
    
    app.run(host="0.0.0.0", port=3000, debug=True)