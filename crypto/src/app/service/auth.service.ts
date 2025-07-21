import { HttpClient, HttpHeaders, HttpParams, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppService } from './app.service';
import { BehaviorSubject, catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ToastService } from './toast.service';
import { FormDataTransactionRequest } from '../shared/model/transaction';
import { v4 as uuidv4 } from 'uuid';

export interface ApiResponse<T> {
    code: number;
    message: string;
    result?: T;
}

export interface PageResponse<T> {
    totalElements: number;
    size: number;
    totalPages: number;
    currentPage: number;
    data: T[];
}
export interface Token {
    accessToken: string;
}

export interface Introspect {
    valid: boolean;
    roles: string;
    user: any;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private twoFactorRequired = new BehaviorSubject<boolean>(false);
    twoFactorRequired$ = this.twoFactorRequired.asObservable();

    constructor(
        private http: HttpClient,
        private appService: AppService,
        private router: Router,
        private toast: ToastService
    ) {}

    getCommonConfig(): { [key: string]: number | string } {
        return this.appService.commonConfig;
    }



    provideSsl() {
        return this.appService.provideSsl;
    }


    inspectorDowloadImage(value: string): Observable<any> {
        const body = {
            ssid: this.getToken(),
            image_key: value
        };
        const url = this.appService.inspectorDowloadImage;
        return this.http.post<any>(url, body);
    }


    sessionCancel(value: string): Observable<any> {
        const body = {
            gate_direction: value
        };
        const url = this.appService.sessionCancel;
        return this.http.post<any>(url, body);
    }

 
    sessionReset(): Observable<any> {
        const body = {};
        const url = this.appService.sessionReset;
        return this.http.post<any>(url, body);
    }

    //#endregion

    // Login method
    login(username: string, password: string): Observable<any> {
        const body = { username, password };
        const url = this.appService.loginUrl;
        return this.http.post<any>(url, body).pipe(
            tap(response => {
                if (response && response.data && response.data.requires_2fa) {
                    this.twoFactorRequired.next(true);
                    // Store temp_token temporarily for 2FA verification
                    sessionStorage.setItem('temp_token_2fa', response.data.temp_token);
                } else if (response && response.status === 1) {
                    this.twoFactorRequired.next(false);
                    if (response.data && response.data.access_token) {
                        this.storeToken(response.data.access_token);
                    }
                }
            })
        );
    }

    // Verify 2FA code
    verify2fa(code: string): Observable<any> {
        const tempToken = sessionStorage.getItem('temp_token_2fa');
        if (!tempToken) {
            return throwError(() => new Error('2FA temporary token not found.'));
        }
        const url = 'http://127.0.0.1:8000/api/crypto/verify-2fa';
        const body = { code: code, temp_token: tempToken };
        return this.http.post<any>(url, body).pipe(
            tap(response => {
                if (response && response.status === 1 && response.data && response.data.access_token) {
                    this.storeToken(response.data.access_token);
                    this.twoFactorRequired.next(false);
                    sessionStorage.removeItem('temp_token_2fa');
                }
            })
        );
    }

    // Generate 2FA code
    generate2faCode(method: 'email' | 'sms'): Observable<any> {
        const tempToken = sessionStorage.getItem('temp_token_2fa');
        if (!tempToken) {
            return throwError(() => new Error('2FA temporary token not found.'));
        }
        const url = this.appService.generate2faCodeUrl;
        const body = { method };
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${tempToken}`,
            'Content-Type': 'application/json'
        });
        return this.http.post<any>(url, body, { headers });
    }

    // Login with form data
    loginWithForm(formData: any): Observable<any> {
        const url = this.appService.loginFormUrl;
        return this.http.post<any>(url, formData);
    }

    // Register method
    register(userData: any): Observable<any> {
        const url = this.appService.registerUrl;
        return this.http.post<any>(url, userData);
    }

    // Get user profile
    getUserProfile(): Observable<any> {
        const url = 'http://127.0.0.1:8000/api/crypto/auth/me'; // Direct URL as specified
        const token = this.getToken();
        return this.http.post<any>(url, { token }, { headers: this.createHeaders() });
    }

    // Update user profile
    updateUserProfile(userId: number, userData: any): Observable<any> {
        const url = `http://127.0.0.1:8000/api/v1/users/${userId}`;
        return this.http.put<any>(url, userData, { headers: this.createHeaders() });
    }

    // Check if user has premium features
    checkPremiumFeatures(): Observable<any> {
        const url = this.appService.accountPremiumUrl;
        return this.http.get<any>(url, { headers: this.createHeaders() });
    }

    // Logout method
    logout(): void {
        const token = this.getToken();
        if (!token) {
            this.clearSession();
            this.router.navigate(['/login']);
            return;
        }

        const body = { token };
        this.http.post(this.appService.logoutUrl, body).subscribe({
            next: () => {
                this.clearSession();
                this.router.navigate(['/login']);
            },
            error: (error) => {
                console.error('Logout failed:', error);
                // Still clear session even if the API fails to avoid token reuse
                this.clearSession();
                this.router.navigate(['/login']);
            }
        });
    }
    // Token validation (Introspect API)
    validateToken(): Observable<any> {
        const token = this.getToken();
        if (!token) {
            return of(false);
        }
        return of(true);
    }

    // Token refresh
    refreshToken(): Observable<string> {
        const token = this.getToken();
        if (!token) return throwError(() => new Error('No token found'));

        // const body = { token };
        // return this.http.post<ApiResponse<Token>>(this.appService.refreshTokenUrl, body).pipe(
        //     map((response: ApiResponse<Token>) => {
        //         if (response.code === HttpStatusCode.Ok && response.result) {
        //             const newToken = response.result.accessToken;
        //             this.storeToken(newToken); // Store the new token
        //             return newToken; // Return the new token
        //         } else {
        //             // Handle unsuccessful response
        //             throw new Error('Token refresh failed due to invalid response');
        //         }
        //     }),
        //     catchError((error) => {
        //         console.error('Token refresh failed:', error);
        //         this.toast.error(error.error.message ? error.error.message : error, 'ERROR');
        //         this.clearSession(); // Clear session if refresh fails
        //         return throwError(() => new Error('Token refresh failed'));
        //     })
        // );
        return throwError(() => new Error('No token found'));
    }

    // Redirect to dashboard after successful login
    redirectToDashboard(): void {
        this.router.navigate(['/dashboard']);
    }

    getTransactionList(params: { [key: string]: string | number }): Observable<any> {
        const url = this.appService.transactionListUrl;
        const httpParams = new HttpParams({ fromObject: params });

        return this.http.get(url, {
            params: httpParams,
            headers: this.createHeaders()
        });
    }

    getTransactionDetail(id: string): Observable<any> {
        const url = `${this.appService.transactionDetailUrl}/${id}`;
        return this.http.get(url, { headers: this.createHeaders() });
    }

    createTransaction(request: FormDataTransactionRequest): Observable<any> {
        const url = this.appService.transactionCreateUrl;
        const formData = new FormData();

        formData.append('data', request.data);

        if (request.attachFile) {
            formData.append('attachFile', request.attachFile);
        }
        if (request.frontIdCard) {
            formData.append('frontIdCard', request.frontIdCard);
        }
        if (request.backIdCard) {
            formData.append('backIdCard', request.backIdCard);
        }
        if (request.portrait) {
            formData.append('portrait', request.portrait);
        }
        return this.http.post(url, formData, { headers: this.createHeadersWithoutContentType() });
    }

    getFoundationList(params: { [key: string]: string | number }): Observable<any> {
        const url = this.appService.foundationListUrl;
        const httpParams = new HttpParams({ fromObject: params });

        return this.http.get(url, {
            params: httpParams,
            headers: this.createHeaders()
        });
    }

    getFoundationGetAll(): Observable<any> {
        const url = this.appService.foundationGetAllUrl;
        return this.http.get(url, { headers: this.createHeaders() });
    }

    findAllUsersByFoundationId(id: string): Observable<any> {
        const url = `${this.appService.findAllUsersByFoundationIdUrl}${id}`;
        return this.http.get(url, { headers: this.createHeaders() });
    }
    // Store token in local storage and update BehaviorSubject
    private storeToken(token: string): void {
        sessionStorage.setItem('access_token', token);
    }

    // Get token from local storage
    private getToken(): string | null {
        return sessionStorage.getItem('access_token');
    }

    // Clear token and session
    private clearSession(): void {
        sessionStorage.removeItem('access_token');
    }

    private createHeaders(): HttpHeaders {
        const token = this.getToken();
        return new HttpHeaders({
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        });
    }

    private createHeadersWithoutContentType(): HttpHeaders {
        const token = this.getToken();
        let headers = new HttpHeaders();
        if (token) {
            headers = headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    }
}
