import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

//Diferencia entre promise y observador
//promise = promete que algo va a suceder
//observador = canal de comunicacion, observan el contenido que pasa por este
/**
 * class Valor(BaseModel):
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
  id: '423786713',
      name: 'PLAIN KNIT SWEATER',
      price: {
        currency: 'EUR',
        value: {
          current: 25.95,
          original: null
        }
      },
      link: 'https://zara.com/es/en/-P06216001.html',
      brand: 'zara'
 */
const productoAdapter = (entidades: Producto[])=>
  entidades.map(entidad => ({...entidad}));
interface Valor{
  current: number;
  original: number;
}
  interface Precio{
    currency: string;
    value: Valor
  }  
export interface Producto{
  id: number
  name: string
  price: Precio
  link: string
  brand: string
}
@Injectable({
  providedIn: 'root' //Se inyectaba a nivel global
})
export class CharacterServiceService {
  private apiURL = 'http://127.0.0.1:8000/producto';
  private http = inject(HttpClient);
  /**
   * 
   * @param image 
   * @param page 
   * @param perPage 
   * @returns 
   * https://static.zara.net/assets/public/8abc/57f2/adcd4344b8ee/30d0c8f7033a/03920260400-p/03920260400-p.jpg
   */
  getResultados(image:string= "",page: number = 1, perPage:number=5):Observable<Producto[]> { //Funcion para hacer un get de los insanos
    let params = new HttpParams()
      .set('image', image)
      .set('page', page)
      .set('perPage', perPage);

    // Add optional query parameter if provided
    let resultado = this.http.put<Producto[]>(this.apiURL,null, {params}).pipe(
      map((entidades) => (entidades))
    )
    console.log(resultado)
    return resultado 
  }
  
}