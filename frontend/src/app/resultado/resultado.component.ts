import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CharacterServiceService, Producto } from '../producto.service';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { switchMap, filter } from 'rxjs/operators';
import { ComunicacionService } from '../comunicacion.service';

@Component({
  selector: 'app-resultado',
  standalone: true,  
  imports: [CommonModule, RouterLink, AsyncPipe], 
  templateUrl: './resultado.component.html',
  styleUrls: ['./resultado.component.css']
})
export class ResultadoComponent implements OnInit {
  private productoService = inject(CharacterServiceService);
  private comunicacionService = inject(ComunicacionService);

  productos$!: Observable<Producto[]>;

  ngOnInit() {
    this.productos$ = this.comunicacionService.variable$.pipe(
      filter((url) => !!url), // Ignora valores vacíos
      switchMap((url) => this.productoService.getResultados(url))
    );
  }
}
