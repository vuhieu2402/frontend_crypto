import { Routes } from '@angular/router';

export default [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    {
        path: 'login',
        loadComponent: () => import('../login/login.component').then((c) => c.LoginComponent)
    },
    {
        path: 'access',
        loadComponent: () => import('./access').then((c) => c.Access)
    },
    {
        path: 'error',
        loadComponent: () => import('./error').then((c) => c.Error)
    },
    { path: '**', redirectTo: '/notfound' }
] as Routes;
