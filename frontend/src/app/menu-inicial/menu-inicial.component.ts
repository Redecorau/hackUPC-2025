import { Component } from '@angular/core';

@Component({
  selector: 'app-menu-inicial',
  imports: [],
  templateUrl: './menu-inicial.component.html',
  styleUrl: './menu-inicial.component.css'
})
export class MenuInicialComponent {

  ngOnInit() {
    document.body.style.backgroundColor = '#F4FCFF'; 
  }

}
