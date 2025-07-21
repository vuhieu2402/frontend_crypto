import { Routes } from '@angular/router';
import { AuthGuard } from '../../bootstrap/auth.guard';

export const PROFILE_ROUTES = [
    {
        path: '',
        loadComponent: () => import('./profile.component').then((c) => c.ProfileComponent),
        canActivate: [AuthGuard]
    }
] as Routes; 