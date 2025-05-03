import { Component, inject, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CharacterServiceService, Producto } from '../producto.service';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-resultado',
  standalone: true,  
  imports: [CommonModule, RouterLink, AsyncPipe], 
  templateUrl: './resultado.component.html',
  styleUrls: ['./resultado.component.css']
})
export class ResultadoComponent implements AfterViewInit {
  productoService = inject(CharacterServiceService);
  productos$: Observable<Producto[]> = this.productoService.getResultados();

  ngAfterViewInit(): void {
    setTimeout(() => {
      const cargando = document.querySelector('.visible') as HTMLElement;
      const resultados = document.querySelector('.invisible') as HTMLElement;

      if (cargando && resultados) {
        cargando.classList.remove('visible');
        cargando.classList.add('invisible');

        resultados.classList.remove('invisible');
        resultados.classList.add('visible');
      } else {
        console.warn('No se encontraron los elementos .visible o .invisible');
      }
    }, 4000);
  }
}
