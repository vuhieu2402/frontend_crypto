import { Routes } from '@angular/router';
import { AuthGuard } from '../../bootstrap/auth.guard';

export default [
    {
        path: '',
        loadComponent: () => import('./dashboard.component').then((c) => c.DashboardComponent),
        canActivate: [AuthGuard]
    }
] as Routes; 