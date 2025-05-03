import { Routes } from '@angular/router';
import { MenuInicialComponent } from './menu-inicial/menu-inicial.component';
import { ResultadoComponent } from './resultado/resultado.component';

export const routes: Routes = [
    { path: 'InditextTech', component:MenuInicialComponent, pathMatch: 'full'},
    { path: 'Resultado', component:ResultadoComponent, pathMatch: 'full'},
    {path: '**', redirectTo: 'InditextTech'}
];
