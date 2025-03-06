import { Routes } from '@angular/router';

export const routes: Routes = [

    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'transaction-chart', loadComponent: () => import('./components/transaction-chart/transaction-chart.component').then(m => m.TransactionChartComponent) },
    { path: 'login', loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent) },
    { path: 'not-found', loadComponent: () => import('./components/pages/not-found/not-found.component').then(m => m.NotFoundComponent) },
    { path: '**', redirectTo: '/not-found' }, 
 ];
