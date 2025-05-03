from fastapi import APIRouter, HTTPException, Query
from typing import Annotated
from urllib.parse import quote, urlencode
from pydantic import BaseModel
from fastapi.responses import JSONResponse
import httpx
import base64

app = APIRouter(prefix="/producto")
api_URL = "https://api.inditex.com/pubvsearch/products"

OAUTH2_ACCESSTOKEN_URL = "https://auth.inditex.com:443/openam/oauth2/itxid/itxidmp/access_token"  # Reemplaza con la URL real
OPEN_PLATFORM_USER_AGENT = "OpenPlatform/1.0"
OAUTH2_CLIENT = "oauth-mkplace-oauthiflfggzhfkybesztdqpropro"  # Reemplaza con tu cliente ID
OAUTH2_SECRET = ".2fjB*w]/92ALNjT"  # Reemplaza con tu secreto
"""
curl -X POST \
  -A "OpenPlatform/1.0" \
  -u "oauth-mkplace-oauthiflfggzhfkybesztdqpropro:.2fjB*w]/92ALNjT" \
  -d "grant_type=client_credentials&scope=technology.catalog.read" https://auth.inditex.com:443/openam/oauth2/itxid/itxidmp/access_token
"""
#Clase para mapear los valores de lo dado
class OAuth2TokenResponse(BaseModel):
    access_token: str
    token_type: str
    id_token: str
    expires_in: int
    scope: str = None

@app.put("/")
#Como tiene que ser por query
#image: url de la imagen: must conform to the RFC 1738 and be URL encoded.
async def get_resultados(image: Annotated[str, Query(max_length=2000)], page: int = 1 , perPage: int = 5 ): #Esta webada la tengo que hacer por query 
    image = quote(image) #Se codifica la url especificada 
    request_url = f"{api_URL}?image={image}&page={page}&perPage={perPage}"
    async with httpx.AsyncClient() as cliente:
        try:
            respuesta = await cliente.post(url="http://127.0.0.1:8000/producto/get_token" )
            respuesta.raise_for_status()
            data = respuesta.json()
            token = data["id_token"]
        except httpx.RequestError as e:
            raise HTTPException(status_code=500, detail=f"Error de conexión con la API externa: {e}")
        except httpx.HTTPStatusError as e:
            raise HTTPException(status_code=e.response.status_code, detail=f"Error de la API externa: {e.response.text}")
    headers = {
        "User-Agent": "OpenPlatform/1.0",
        "Content-Type": "application/json",
        "Authorization": f"Bearer {token}"
    }
    async with httpx.AsyncClient() as cliente:
        try:
            respuesta = await cliente.get(url=request_url, headers= headers, )
            respuesta.raise_for_status()
            data = respuesta.json()
            return data
        except httpx.RequestError as e:
            raise HTTPException(status_code=500, detail=f"Error de conexión con la API externa: {e}")
        except httpx.HTTPStatusError as e:
            raise HTTPException(status_code=e.response.status_code, detail=f"Error de la API externa: {e.response.text}")

#Quiero hacer que esta funcion crea un nuevo token para el usuario
OAUTH2_CLIENT = "oauth-mkplace-oauthiflfggzhfkybesztdqpropro"
OAUTH2_SECRET = ".2fjB*w]/92ALNjT"
OAUTH2_ACCESSTOKEN_URL = "https://auth.inditex.com:443/openam/oauth2/itxid/itxidmp/access_token"
SCOPES = "technology.catalog.read"

@app.post("/get_token")
async def get_token():
    print("algo")
    auth = f"{OAUTH2_CLIENT}:{OAUTH2_SECRET}"
    headers = {
        "Authorization": f"Basic {base64.b64encode(auth.encode()).decode()}",
        "User-Agent": "OpenPlatform/1.0",
        "Content-Type": "application/x-www-form-urlencoded"
    }
    data = {
        "grant_type": "client_credentials",
        "scope": SCOPES
    }

    async with httpx.AsyncClient() as client:
        response = await client.post(OAUTH2_ACCESSTOKEN_URL, headers=headers, data=data)

    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail=response.text)

    return JSONResponse(content=response.json())
"""
EJEMPLO DE COMO SE HACE COMUNMENTE LAS PETICIONES POR QUERY
http://127.0.0.1:8000/items/?skip=0&limit=10
@app.get("/items/")
async def read_item(skip: int = 0, limit: int = 10):
    return fake_items_db[skip : skip + limit]
"""
"""
curl -X POST \
  -A "OpenPlatform/1.0" \
  -u "OAUTH2_CLIENT:OAUTH2_SECRET" \
  -d "grant_type=client_credentials&scope=SCOPE_1 SCOPE_N" OAUTH2_ACCESSTOKEN_URL
"""