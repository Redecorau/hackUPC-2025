import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-resultado',
  standalone: true,  
  imports: [CommonModule, RouterLink], 
  templateUrl: './resultado.component.html',
  styleUrls: ['./resultado.component.css']
})
export class ResultadoComponent {
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

  getImageUrl(productId: string): string {
    return `https://static.zara.net/photos/${productId}/image.jpg`; // Ejemplo base, ajusta al patrón real
  }

}
