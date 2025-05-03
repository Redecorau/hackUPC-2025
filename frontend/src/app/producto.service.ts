import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Entidad } from '../models';
import { entidadAdapter } from '../adapters';
//Diferencia entre promise y observador
//promise = promete que algo va a suceder
//observador = canal de comunicacion, observan el contenido que pasa por este
@Injectable({
  providedIn: 'root' //Se inyectaba a nivel global
})
export class CharacterServiceService {
  private apiURL = 'http://127.0.0.1:8000/entidad';
  private http = inject(HttpClient);
  getEntidades(): Observable<Entidad[]>{ //Funcion para hacer un get de los insanos
    return this.http.get<Entidad[]>(this.apiURL).pipe(
      map((entidades) => entidadAdapter(entidades))
    )
  }
  updateEntidad(entidad: Entidad): Observable<Entidad>{
    return this.http.put<Entidad>(this.apiURL, entidad)
  }
  deleteEntidad(id: string): Observable<void>{
    return this.http.delete<void>(this.apiURL+'/'+id)
  }
}