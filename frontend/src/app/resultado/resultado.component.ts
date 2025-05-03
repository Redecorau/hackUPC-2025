import { Component, inject } from '@angular/core';
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
export class ResultadoComponent {
  productoService = inject(CharacterServiceService)
  productos$: Observable<Producto[]> = this.productoService.getResultados();
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

  getImageUrl(productId: string): string {
    return `https://static.zara.net/photos/${productId}/image.jpg`; // Ejemplo base, ajusta al patrón real
  }

}
