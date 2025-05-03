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
  getImagenUrl(){
    return this.imagenUrl
  }

  @ViewChild('inputArchivo') inputArchivo!: ElementRef<HTMLInputElement>;

  ngOnInit() {
    const droparea = document.querySelector('.droparea') as HTMLElement;
    if (!droparea) return;

    const active = () => droparea.classList.add('green-border');
    const inactive = () => droparea.classList.remove('green-border');
    const prevents = (e: Event) => e.preventDefault();

    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      const dt = e.dataTransfer;
      if (!dt) return;

      const files = dt.files;
      const fileArray = Array.from(files);

      if (fileArray.length > 0 && fileArray[0].type.startsWith('image/')) {
        this.imagenUrl = URL.createObjectURL(fileArray[0]);
        console.log('Imagen cargada por drop:', this.imagenUrl);
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

  archivoSeleccionado(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const archivo = input.files[0];
      if (archivo.type.startsWith('image/')) {
        this.imagenUrl = URL.createObjectURL(archivo);
        
        console.log('Imagen cargada por botón:', this.imagenUrl);
      }
    }
  }
}
