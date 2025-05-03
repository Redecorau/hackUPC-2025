import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-resultado',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './resultado.component.html',
  styleUrls: ['./resultado.component.css']
})
export class ResultadoComponent implements OnInit {
  imagenUrl: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const zaraUrl = 'https://www.zara.com/es/en/plain-knit-sweater-p06216001.html';
    
    this.http.get(zaraUrl, { responseType: 'text' }).subscribe({
      next: html => {
        const imgRegex = /<img[^>]*class="[^"]*media-image__image media__wrapper--media[^"]*"[^>]*src="([^"]+)"[^>]*>/i;
        const match = html.match(imgRegex);
        if (match && match[1]) {
          this.imagenUrl = match[1];
        }
      },
      error: err => {
        console.error('Error fetching Zara page:', err);
      }
    });
  }
}
