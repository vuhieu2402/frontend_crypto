import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AuthService } from '../service/auth.service';
import { ToastService } from '../service/toast.service';
import { session_variables } from '../shared/constant/variables';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        private authService: AuthService,
        private router: Router,
        private toast: ToastService
    ) {}

    canActivate(route: any): Observable<boolean> {
        return this.authService.validateToken().pipe(
            map((isValid: boolean) => {
                if (isValid) {
                    return true; // Allow access to route
                } else {
                    this.router.navigate(['/login']);
                    return false;
                }
            }),
            catchError((error) => {
                this.router.navigate(['/login']);
                return of(false);
            })
        );
    }
}
