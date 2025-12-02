from flask import jsonify
import BackEnd.GlobalInfo.ResponseMessages as respuestas
import BackEnd.GlobalInfo.Keys as ColabsKey

def limpiar_campo(valor):
    """Función para limpiar campos de comillas dobles"""
    if valor is None:
        return ""
    valor_str = str(valor).strip()
    if valor_str.endswith('"'):
        valor_str = valor_str[:-1]
    if valor_str.startswith('"'):
        valor_str = valor_str[1:]
    return valor_str

def fnGetAllUsers():
    """Obtener todos los usuarios"""
    try:
        if ColabsKey.dbUsers is None:
            ColabsKey.initialize_db()
            
        arrFinalColab = []
        objQuery = ColabsKey.dbUsers.find({})
        listUsers = list(objQuery)
        
        print(f"Usuarios encontrados: {len(listUsers)}")
        
        if len(listUsers) != 0:
            for objUser in listUsers:
                print(f"Usuario: {objUser}")
                
                email = objUser.get("email") or objUser.get("correo") or ""
                nombre = objUser.get("nombre") or ""
                password = objUser.get("password") or ""
                rol = objUser.get("rol") or ""
                
                objFormateado = {
                    "id": str(objUser.get("_id", "")),
                    "Correo": limpiar_campo(email),
                    "Nombre": limpiar_campo(nombre),
                    "Password": limpiar_campo(password),
                    "Rol": limpiar_campo(rol)
                }
                arrFinalColab.append(objFormateado)
                
        objResponse = respuestas.succ200.copy()
        objResponse['Respuesta'] = arrFinalColab
        return jsonify(objResponse)
        
    except Exception as e:
        objResponse = respuestas.err500.copy()
        objResponse['Error'] = str(e)
        return jsonify(objResponse)

def fnPostLogin(email, password):
    """Login de usuario"""
    try:
        if ColabsKey.dbUsers is None:
            ColabsKey.initialize_db()
            
        print(f"Buscando usuario: email={email}, password={password}")
        
        email_limpio = limpiar_campo(email)
        print(f"Email limpio: '{email_limpio}'")
            
        objQuery = ColabsKey.dbUsers.find_one({
            "$or": [
                {"email": email_limpio},
                {"email": email_limpio + '"'},
                {"correo": email_limpio},
                {"correo": email_limpio + '"'}
            ],
            "password": password
        })
        
        print(f"Resultado query: {objQuery}")
        
        if objQuery is None:
            objResponse = respuestas.err401.copy()
            return jsonify(objResponse)
            
        email_resp = objQuery.get("email") or objQuery.get("correo") or ""
        nombre_resp = objQuery.get("nombre") or ""
        rol_resp = objQuery.get("rol") or ""
            
        objResponse = respuestas.succ200.copy()
        objResponse['Respuesta'] = {
            "id": str(objQuery.get("_id", "")),
            "email": limpiar_campo(email_resp),
            "nombre": limpiar_campo(nombre_resp),
            "rol": limpiar_campo(rol_resp)
        }
        return jsonify(objResponse)
        
    except Exception as e:
        objResponse = respuestas.err500.copy()
        objResponse['Error'] = str(e)
        return jsonify(objResponse)
    
def fnPostTablero(nombre, propietario, colaboradores=None, codigoRandom="", fechaCreacion=None):
    try:
        if ColabsKey.dbTableros is None:
            ColabsKey.initialize_db()

        from bson import ObjectId
        from datetime import datetime

        colaboradores = colaboradores or []
        fecha_creacion_dt = datetime.fromisoformat(fechaCreacion) if fechaCreacion else datetime.utcnow()

        nuevo_tablero = {
            "nombre": nombre,
            "propietario": ObjectId(propietario),
            "colaboradores": [ObjectId(c) for c in colaboradores],
            "codigoRandom": str(codigoRandom),
            "fechaCreacion": fecha_creacion_dt,
            "ultimaModificacion": fecha_creacion_dt,
            "estado": "activo"
        }

        result = ColabsKey.dbTableros.insert_one(nuevo_tablero)

        if result.inserted_id:
            return jsonify({
                "Respuesta": {
                    "id": str(result.inserted_id),
                    "nombre": nuevo_tablero["nombre"],
                    "propietario": str(nuevo_tablero["propietario"]),
                    "codigoRandom": nuevo_tablero["codigoRandom"],
                    "fechaCreacion": nuevo_tablero["fechaCreacion"].isoformat(),
                    "estado": nuevo_tablero["estado"]
                }
            })
        else:
            return jsonify({"Error": "No se pudo crear el tablero"})
    except Exception as e:
        return jsonify({"Error": str(e)})
    
    
def fnPostRegistro(email, password, role=None, nombre=""):
    """Registro de nuevo usuario"""
    try:
        if ColabsKey.dbUsers is None:
            ColabsKey.initialize_db()
            
        email_limpio = limpiar_campo(email)
        print(f"Registrando usuario: email={email_limpio}, role={role}, nombre={nombre}")
            
        # Verificar si el email ya existe
        usuario_existente = ColabsKey.dbUsers.find_one({
            "$or": [
                {"email": email_limpio},
                {"correo": email_limpio}
            ]
        })
        
        print(f"Usuario existente encontrado: {usuario_existente}")
        
        if usuario_existente:
            objResponse = respuestas.err203.copy()
            objResponse['Error'] = "El correo electrónico ya está registrado"
            return jsonify(objResponse)
            
        rol_final = role if role else "usuario"
            
        nuevo_usuario = {
            "email": email_limpio,
            "password": password,
            "nombre": nombre,
            "rol": rol_final
        }
        
        print(f"Insertando nuevo usuario: {nuevo_usuario}")
        result = ColabsKey.dbUsers.insert_one(nuevo_usuario)
        
        if result.inserted_id:
            objResponse = respuestas.succ200.copy()
            objResponse['Respuesta'] = {
                "id": str(result.inserted_id),
                "email": email_limpio,
                "nombre": nombre,
                "rol": rol_final
            }
            return jsonify(objResponse)
        else:
            objResponse = respuestas.err500.copy()
            objResponse['Error'] = "No se pudo crear el usuario"
            return jsonify(objResponse)
            
    except Exception as e:
        print(f"Error en registro: {e}")
        objResponse = respuestas.err500.copy()
        objResponse['Error'] = str(e)
        return jsonify(objResponse)

def fnGetUserById(user_id):
    """Obtener usuario por ID"""
    try:
        if ColabsKey.dbUsers is None:
            ColabsKey.initialize_db()
            
        from bson import ObjectId
        objQuery = ColabsKey.dbUsers.find_one({"_id": ObjectId(user_id)})
        
        if objQuery is None:
            objResponse = respuestas.err203.copy()
            objResponse['Error'] = "Usuario no encontrado"
            return jsonify(objResponse)
            
        email_resp = objQuery.get("email") or objQuery.get("correo") or ""
        nombre_resp = objQuery.get("nombre") or ""
        rol_resp = objQuery.get("rol") or ""
            
        objResponse = respuestas.succ200.copy()
        objResponse['Respuesta'] = {
            "id": str(objQuery.get("_id", "")),
            "email": limpiar_campo(email_resp),
            "nombre": limpiar_campo(nombre_resp),
            "rol": limpiar_campo(rol_resp)
        }
        return jsonify(objResponse)
        
    except Exception as e:
        objResponse = respuestas.err500.copy()
        objResponse['Error'] = str(e)
        return jsonify(objResponse)
