from fastapi import FastAPI
from bson import ObjectId
from routers.imagen import app as router_imagen
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()
origins = [
    "http://localhost:3000",  # Ejemplo para un frontend en React
    "http://localhost:8080",  # Ejemplo para un frontend en Vue.js
    "http://127.0.0.1:5500",  # Tu frontend de desarrollo con Live Server
    "*",                      # Permitir todos los orígenes (solo para desarrollo, ¡cuidado en producción!)
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos los métodos HTTP (GET, POST, PUT, DELETE, OPTIONS)
    allow_headers=["*"],  # Permite todos los encabezados HTTP
)
app.include_router(router_imagen)
