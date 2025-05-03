def producto_esquema(producto)-> dict : #Devuelve un diccionario a modo de json borja
    return {
        "id": producto["id"],
        "nombre" : producto["name"],
        "precio" : producto["price"],
        "link" : producto["link"],
        "marca" : producto["brand"]
    }

def productos_esquema(productos)-> list: #Devuelve una lista de json de los productos pasados
    return [producto_esquema(producto) for producto in productos]

"""
{
    "id": "423786713",
    "name": "PLAIN KNIT SWEATER",
    "price": {
      "currency": "EUR",
      "value": {
        "current": 25.95,
        "original": null
      }
    },
    "link": "https://zara.com/es/en/-P06216001.html",
    "brand": "zara"
  },
"""