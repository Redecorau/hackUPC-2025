from pydantic import BaseModel

#SOlamente si es necesario
class Valor(BaseModel):
    actual: float
    original: float
class Precio(BaseModel):
    moneda: str
    valor: Valor

class Producto(BaseModel):
    id: int = None
    nombre: str
    precio: Precio
    link:str
    marca: str
    