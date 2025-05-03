import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImagenService {
  private urlImagen: string | null = null;

  setUrl(url: string) {
    this.urlImagen = url;
  }

  getUrl(): string | null {
    return this.urlImagen;
  }
}
