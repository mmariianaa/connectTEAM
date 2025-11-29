from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
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
        nombre = data.get('nombre')
        role = data.get('role')
        
        if not email or not password:
            objResponse = respuestas.err203.copy()
            objResponse['Error'] = "Los campos 'email' y 'password' son requeridos"
            return jsonify(objResponse)
            
        objResult = CallMethod.fnPostRegistro(email, password, role, nombre)
        return objResult
        
    except Exception as e:
        print(f"Error en registro: {e}")
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