from fastapi import APIRouter, HTTPException, Query
from typing import Annotated
from urllib.parse import quote, urlencode
from pydantic import BaseModel
import httpx

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
    headers = {
        "User-Agent": "OpenPlatform/1.0",
        "Content-Type": "application/json",
        "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJraWQiOiJZMjZSVjltUFc3dkc0bWF4NU80bDBBd2NpSVE9IiwiYWxnIjoiUlMyNTYifQ.eyJhdF9oYXNoIjoiajkzVm9ZbkgyUnZiSnhzNG5xSF83QSIsInN1YiI6Im9hdXRoLW1rcGxhY2Utb2F1dGhpZmxmZ2d6aGZreWJlc3p0ZHFwcm9wcm8iLCJhdWRpdFRyYWNraW5nSWQiOiI0NmExZGRmMi03ZDBlLTQzMWYtYmM1My05YjNjOWEwNDU4Y2YtNTc3Mzk1OTkzIiwiY3VzdG9tIjp7ImNvbnN1bWVyT3JnSWQiOiJqaG9qYW5tYXJ0aW5lem1heXRhX2dtYWlsLmNvbSIsIm1hcmtldHBsYWNlQ29kZSI6Im9wZW4tZGV2ZWxvcGVyLXBvcnRhbCIsIm1hcmtldHBsYWNlQXBwTW9kZSI6Im9ubGluZSIsIm1hcmtldHBsYWNlQXBwSWQiOiI0MjQyNzU1MC0xNGY0LTRjMGQtODM0Ni02M2Y0NjlkNTcyOGEifSwiaXNzIjoiaHR0cHM6Ly9hdXRoLmluZGl0ZXguY29tOjQ0My9vcGVuYW0vb2F1dGgyL2l0eGlkL2l0eGlkbXAiLCJ0b2tlbk5hbWUiOiJpZF90b2tlbiIsInVzZXJJZCI6Im9hdXRoLW1rcGxhY2Utb2F1dGhpZmxmZ2d6aGZreWJlc3p0ZHFwcm9wcm8iLCJhdWQiOiJvYXV0aC1ta3BsYWNlLW9hdXRoaWZsZmdnemhma3liZXN6dGRxcHJvcHJvIiwiaWRlbnRpdHlUeXBlIjoic2VydmljZSIsImF6cCI6Im9hdXRoLW1rcGxhY2Utb2F1dGhpZmxmZ2d6aGZreWJlc3p0ZHFwcm9wcm8iLCJhdXRoX3RpbWUiOjE3NDYyODQ5NjcsInNjb3BlIjoibWFya2V0IHRlY2hub2xvZ3kuY2F0YWxvZy5yZWFkIG9wZW5pZCIsInJlYWxtIjoiL2l0eGlkL2l0eGlkbXAiLCJ1c2VyVHlwZSI6ImV4dGVybmFsIiwiZXhwIjoxNzQ2Mjg4NTY3LCJ0b2tlblR5cGUiOiJKV1RUb2tlbiIsImlhdCI6MTc0NjI4NDk2NywiYXV0aExldmVsIjoiMSJ9.eb5Askn1I_R8u487dZ1YLUNCyj0KBedKAkkeDsvu1HWocGVGLL59GUg0M8dxBWCFl7VIONlIQypuCv0F5aSGTSGCt6Ve-vyUfrWSrYv7KGdj8PZverOwtHxudBbiZSXzWZsADg4v3E2SWmREo9i2Voe7zfUTkFTSvnOtwAp9CcIK7T8XuOWpDsyjgDzobb77wT85i7oIKJWqSozqAFj0nnNvNK7cwOtU6ltf6PInc6BJQG1Xr90GRFIx6ptEkUfcfKS8tfzQGuaPx6gf0vnDvtniEoSeNNkPP4T5FPO3di41CaVoWP5D3jRlsD14ZdKVZbEkGzC7Vl99QJ3sA90uog"
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
@app.post("/")
async def obtener_token():
    headers = {
        "User-Agent": OPEN_PLATFORM_USER_AGENT
        #"Content-Type": "application/x-www-form-urlencoded",
    }
    auth = httpx.BasicAuth(OAUTH2_CLIENT, OAUTH2_SECRET)
    data = urlencode({"grant_type": "client_credentials", "scope": "technology.catalog.read"})  # Ajusta los scopes según sea necesario
    async with httpx.AsyncClient() as client:
        try:
            print(f"{OAUTH2_ACCESSTOKEN_URL}, {headers}, {auth}, {data}")
            response = await client.post(url=OAUTH2_ACCESSTOKEN_URL, headers=headers, auth=auth, data=data)
            response.raise_for_status()
            token_data = response.json()
            return token_data #OAuth2TokenResponse(**token_data)
        except httpx.RequestError as e:
            raise HTTPException(status_code=500, detail=f"Error al conectar con el servidor de autorización: {e}")
        except httpx.HTTPStatusError as e:
            raise HTTPException(status_code=e.response.status_code, detail=f"Error del servidor de autorización: {e.response.text}")
        except ValueError:
            raise HTTPException(status_code=500, detail="Error al decodificar la respuesta del servidor de autorización")

    pass
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