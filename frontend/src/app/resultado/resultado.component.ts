import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CharacterServiceService, Producto } from '../producto.service';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { MenuInicialComponent } from '../menu-inicial/menu-inicial.component';
import { ComunicacionService } from '../comunicacion.service';
@Component({
  selector: 'app-resultado',
  standalone: true,  
  imports: [CommonModule, RouterLink, AsyncPipe], 
  templateUrl: './resultado.component.html',
  styleUrls: ['./resultado.component.css']
})
export class ResultadoComponent {
  url = ""
  productoService = inject(CharacterServiceService)
  comunicacionService = inject(ComunicacionService)
  productos$: Observable<Producto[]> = this.productoService.getResultados();


ngOnInit() {
  this.comunicacionService.variable$.subscribe(msg => {
    this.url = msg;
  });
}
  /**
   * 
  productos = [
    {
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
    },
    {
      id: '434248505',
      name: 'COLLAR POLO CARDIGAN',
      price: {
        currency: 'EUR',
        value: {
          current: 27.95,
          original: null
        }
      },
      link: 'https://zara.com/es/en/-P03920260.html',
      brand: 'zara'
    }
  ];
   */
}
