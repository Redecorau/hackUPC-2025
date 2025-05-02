import { Routes } from '@angular/router';
import { MenuInicialComponent } from './menu-inicial/menu-inicial.component';

export const routes: Routes = [
    { path: 'INDITEXTECH', component:MenuInicialComponent, pathMatch: 'full'},
    {path: '**', redirectTo: 'INDITEXTECH'}
];
