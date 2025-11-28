import os
from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv()

# Variables globales
dbconn = None
strConnection = os.getenv("MONGODB_URI")
strDBConnection = "ConnectTeam"
dbUsers = None

# Inicializar conexión
def initialize_db():
    global dbconn, dbUsers
    try:
        if dbconn is None:
            mongoConnect = MongoClient(strConnection)
            dbconn = mongoConnect[strDBConnection]
            dbUsers = dbconn["usuario"]
            print("Conexión a MongoDB establecida correctamente")
    except Exception as e:
        print(f"Error conectando a MongoDB: {e}")

# Llamar a la inicialización al importar el módulo
initialize_db()