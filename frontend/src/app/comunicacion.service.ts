import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ComunicacionService {
  private variableSource = new BehaviorSubject<string>('valor inicial');
  variable$ = this.variableSource.asObservable();

  actualizarVariable(nuevoValor: string) {
    this.variableSource.next(nuevoValor);
  }
  getVariable(){
    return this.variable$.pipe()
  }
}
