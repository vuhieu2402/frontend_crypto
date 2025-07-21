import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private router: Router,
        private messageService: MessageService
    ) {}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = sessionStorage.getItem('access_token');
        const expiredTimestamp = sessionStorage.getItem('expired_timestamp');
        // Nếu có expired_timestamp và token
        if (!token) {
            this.router.navigate(['/login']);
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: `Token hết hạn, vui lòng đăng nhập lại`,
                life: 3000
            });
            return throwError(() => new Error('Token expired'));
        }

        // Nếu token còn hạn, thêm vào header Authorization
        let authReq = req;
        if (token) {
            authReq = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
        }

        // Bắt lỗi 401 từ backend
        return next.handle(authReq).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    sessionStorage.clear();
                    this.router.navigate(['/login']);
                }
                return throwError(() => error);
            })
        );
    }
}
