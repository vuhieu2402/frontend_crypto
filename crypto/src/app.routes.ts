import { Routes } from '@angular/router';
import { AuthGuard } from './app/bootstrap/auth.guard';

export const appRoutes: Routes = [
    { 
        path: 'dashboard', 
        loadChildren: () => import('./app/pages/dashboard/dashboard.routes'),
        canActivate: [AuthGuard]
    },
    { 
        path: '', 
        redirectTo: 'login', 
        pathMatch: 'full'
    },
    { path: 'notfound', loadComponent: () => import('./app/pages/notfound/notfound').then((c) => c.Notfound) },
    { path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes') },
    { path: 'login', loadChildren: () => import('./app/pages/login/login.routes').then(m => m.LOGIN_ROUTES) },
    { path: 'profile', loadChildren: () => import('./app/pages/profile/profile.routes').then(m => m.PROFILE_ROUTES), canActivate: [AuthGuard] },
    { path: '**', redirectTo: '/notfound' }
];
