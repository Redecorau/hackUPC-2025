from fastapi import FastAPI
from bson import ObjectId
from routers.imagen import app as router_imagen

app = FastAPI()

app.include_router(router_imagen)
