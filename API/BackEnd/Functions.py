from bson import ObjectId,json_util as j
from flask import jsonify
from pymongo import MongoClient
import BackEnd.GlobalInfo.ResponseMessages as respuestas
import BackEnd.GlobalInfo.Keys as ColabsKey

if ColabsKey.dbconn==None:
    mongoConnect=MongoClient(ColabsKey.strConnection)
    ColabsKey.dbconn=mongoConnect[ColabsKey.strDBConnection]
    dbUsers=ColabsKey.dbconn["usuarios"]

def fnGetAllUsers():#es la funcion para obtener todos los usuarios
    try:
        arrFinalColab = []
        objQuery = dbUsers.find({})
        listUsers = list(objQuery)
        if len(listUsers) != 0:
            for objUser in listUsers:
                objFormateado={
                    "Correo": objUser["strCorreo"],
                    "Nombre": objUser["strNombre"],
                    "Password": objUser["strPassword"],
                    "Rol": objUser["strRol"]
                }
                arrFinalColab.append(objFormateado)
        objResponse = respuestas.succ200.copy()
        objResponse['Respuesta'] = arrFinalColab
        return jsonify(objResponse)
    except Exception as e:
        objResponse = respuestas.err500.copy()
        objResponse['Error'] = str(e)
        return jsonify(objResponse)

def fnPostLogin(email,password):
    try:
        objQuery = dbUsers.find_one({"StrCorreo":email,"StrContrasena":password})
        if objQuery is None:
            objResponse = respuestas.err401.copy()
            return jsonify(objResponse)
        objResponse = respuestas.succ200.copy()
        return jsonify(objResponse)
    except Exception as e:
        objResponse = respuestas.err500.copy()
        objResponse['Error'] = str(e)
        return jsonify(objResponse)
    
def fnPostRegistro(email,password):
    try:
        objQuery = dbUsers.insert_one({"StrCorreo":email,"StrContrasena":password})# aqui ya los lleno teniendo la base de datos para insertar 
        if objQuery is None:
            objResponse = respuestas.err401.copy()
            return jsonify(objResponse)
        objResponse = respuestas.succ200.copy()
        return jsonify(objResponse)
    except Exception as e:
        objResponse = respuestas.err500.copy()
        objResponse['Error'] = str(e)
        return jsonify(objResponse)
