import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu-inicial',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu-inicial.component.html',
  styleUrls: ['./menu-inicial.component.css']
})
export class MenuInicialComponent implements OnInit {

  imagenUrl: string | null = null;

  @ViewChild('inputArchivo') inputArchivo!: ElementRef<HTMLInputElement>;

  ngOnInit() {
    const droparea = document.querySelector('.droparea') as HTMLElement;
    if (!droparea) return;

    const active = () => droparea.classList.add('green-border');
    const inactive = () => droparea.classList.remove('green-border');
    const prevents = (e: Event) => e.preventDefault();

    const handleDrop = async (e: DragEvent) => {
      e.preventDefault();
      const dt = e.dataTransfer;
      if (!dt) return;

      const files = dt.files;
      const fileArray = Array.from(files);

      if (fileArray.length > 0 && fileArray[0].type.startsWith('image/')) {
        const url = await this.subirImagenACloudinary(fileArray[0]);
        if (url) {
          this.imagenUrl = url;
          console.log('Imagen cargada por drop:', this.imagenUrl);
        }
      }
    };

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(evt =>
      droparea.addEventListener(evt, prevents)
    );
    ['dragenter', 'dragover'].forEach(evt =>
      droparea.addEventListener(evt, active)
    );
    ['dragleave', 'drop'].forEach(evt =>
      droparea.addEventListener(evt, inactive)
    );
    droparea.addEventListener('drop', handleDrop);
  }

  abrirSelector(input: HTMLInputElement) {
    input.click();
  }

  async archivoSeleccionado(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const archivo = input.files[0];
      if (archivo.type.startsWith('image/')) {
        const url = await this.subirImagenACloudinary(archivo);
        if (url) {
          this.imagenUrl = url;
          console.log('Imagen cargada por botón:', this.imagenUrl);
        }
      }
    }
  }

  async subirImagenACloudinary(archivo: File): Promise<string | null> {
    const url = 'https://api.cloudinary.com/v1_1/dzvkyrjah/image/upload';
    const formData = new FormData();
  
    formData.append('file', archivo);
    formData.append('upload_preset', 'HackUpc2025'); // tu preset Unsigned
  
    try {
      const respuesta = await fetch(url, {
        method: 'POST',
        body: formData
      });
  
      const data = await respuesta.json();
  
      if (data.secure_url) {
        console.log('Imagen subida a:', data.secure_url);
        return data.secure_url;
      } else {
        console.error('Respuesta inesperada de Cloudinary:', data);
        return null;
      }
    } catch (error) {
      console.error('Error al subir imagen:', error);
      return null;
    }
  }
  
} 