from fastapi import APIRouter, HTTPException, Query
from typing import Annotated
from urllib.parse import quote
import httpx

app = APIRouter(prefix="/producto")
api_URL = "https://api.inditex.com/pubvsearch/products"

@app.put("/")
#Como tiene que ser por query
#image: url de la imagen: must conform to the RFC 1738 and be URL encoded.
async def get_resultados(image: Annotated[str, Query(max_length=2000)], page: int = 1 , perPage: int = 5 ): #Esta webada la tengo que hacer por query 
    image = quote(image) #Se codifica la url especificada 
    request_url = f"{api_URL}?image={image}&page={page}&perPage={perPage}"
    async with httpx.AsyncClient() as cliente:
        try:
            respuesta = await cliente.get(request_url)
            respuesta.raise_for_status()
            data = respuesta.json()
            return {"resultados": data}
        except httpx.RequestError as e:
            raise HTTPException(status_code=500, detail=f"Error de conexión con la API externa: {e}")
        except httpx.HTTPStatusError as e:
            raise HTTPException(status_code=e.response.status_code, detail=f"Error de la API externa: {e.response.text}")

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