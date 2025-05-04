# hackUPC-2025

1. Introducción

Esta documentación describe la estructura y funcionalidad del backend de la aplicación, que se basa en Node.js y utiliza Express para manejar las solicitudes HTTP. El backend incluye un servicio de scraping que permite obtener imágenes de productos desde una URL proporcionada.

2. Estructura del Proyecto

- /scraper.js: Archivo principal que contiene la lógica del servidor y las rutas para el scraping de imágenes.

3. Dependencias

- Express: Framework para construir aplicaciones web en Node.js.
- Axios: Cliente HTTP para realizar solicitudes a otras APIs.
- Cheerio: Biblioteca para manipular y analizar HTML en el servidor.
- Cors: Middleware para habilitar CORS (Cross-Origin Resource Sharing).

4. Configuración del Servidor

- Puerto: El servidor se ejecuta en el puerto 3000.
- CORS: Se habilita CORS para permitir solicitudes desde diferentes orígenes.

Javascript:
  const PORT = 3000;
  app.use(cors());

5. Rutas

5.1. GET /api/scrape-image:

- Descripción: Esta ruta permite obtener la primera imagen de un producto desde una URL proporcionada.

- Parámetros de Consulta: URL de la página web de la que se desea extraer la imagen.  

- Respuestas: 
  200 OK: Devuelve un objeto JSON con la URL de la imagen.
    (¨{"imageUrl": "https://example.com/image.jpg"})
  400 Bad Request: Si no se proporciona la URL.
    (Missing URL)
  404 Not Found: Si no se encuentra ninguna imagen en la página.
     (No image found)
  500 Internal Server Error: Si ocurre un error durante el scraping.
    (Scraping failed)

6. Ejemplo de Uso

Para utilizar el servicio de scraping, se puede realizar una solicitud GET a la ruta `/api/scrape-image` con el parámetro `url`. Por ejemplo:
(bash:
  GET http://localhost:3000/api/scrape-image?url=https://example.com/product-page)

7. Ejecución del Servidor

Para ejecutar el servidor, asegúrate de tener Node.js instalado y ejecuta el siguiente comando en la terminal:
(bash:
  node scraper.js)
El servidor estará disponible en `http://localhost:3000`.

8. Conclusión

Este backend proporciona una funcionalidad básica para extraer imágenes de productos de páginas web. Se puede expandir para incluir más características según sea necesario, como la gestión de errores más robusta o la integración con bases de datos para almacenar información de productos.

