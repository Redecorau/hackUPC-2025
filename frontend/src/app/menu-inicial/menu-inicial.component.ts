import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-inicial',
  templateUrl: './menu-inicial.component.html',
  styleUrls: ['./menu-inicial.component.css']  // Fixed typo: styleUrl → styleUrls
})
export class MenuInicialComponent implements OnInit {

  ngOnInit() {
    const droparea = document.querySelector('.droparea') as HTMLElement;
    if (!droparea) {
      console.warn('Drop area not found.');
      return;
    }

    const active = () => droparea.classList.add('green-border');
    const inactive = () => droparea.classList.remove('green-border');
    const prevents = (e: Event) => e.preventDefault();
    const handleDrop = (e: DragEvent) => {
      e.preventDefault();  // Prevent default behavior
      const dt = e.dataTransfer;
      if (!dt) return;
      const files = dt.files;
      const fileArray = Array.from(files);
      console.log(files); // FileList
      console.log(fileArray);
    };

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(evtName =>
      droparea.addEventListener(evtName, prevents)
    );

    ['dragenter', 'dragover'].forEach(evtName =>
      droparea.addEventListener(evtName, active)
    );

    ['dragleave', 'drop'].forEach(evtName =>
      droparea.addEventListener(evtName, inactive)
    );

    droparea.addEventListener('drop', handleDrop);

    window.addEventListener('dragover', function(e) {
      e.preventDefault();
    });
    
    window.addEventListener('drop', function(e) {
      e.preventDefault();
    });
  }

  
}
