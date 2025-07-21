import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { API_LIST } from '../shared/api/api-list';

@Injectable({
    providedIn: 'root'
})
export class AppService {
    private appConfig: any;
    private baseUrl!: string;
    private apiUrl!: { [key: string]: string };

    constructor(private http: HttpClient) {
        this.apiUrl = API_LIST;
    }

    async loadConfig(): Promise<void> {
        try {
            const data = await lastValueFrom(this.http.get('config/web_config.json'));
            this.appConfig = data;
            this.baseUrl = this.appConfig.baseUrl;
        } catch (error) {
            console.error('Error loading config:', error);
            throw error;
        }
    }

    //#region Khu vực lấy url của Inspector

    /**
     * Hàm lấy url của API lấy trạng thái
     * Author: Mai Sơn Trà(25/06/25)
     */
    get inspectorDowloadStatus(): string {
        return this.getFullUrl(this.baseUrl, this.apiUrl['inspectorDowloadStatus']);
    }

    /**
     * Hàm lấy url dowload ảnh
     * Author: Mai Sơn Trà(25/06/25)
     */
    get inspectorDowloadImage(): string {
        return this.getFullUrl(this.baseUrl, this.apiUrl['inspectorDowloadImage']);
    }

    /**
     * Hàm lấy url cancel
     * Author: Mai Sơn Tr
     */
    get sessionCancel(): string {
        return this.getFullUrl(this.baseUrl, this.apiUrl['sessionCancel']);
    }

    /**
     * Hàm lấy API reset
     * Author: Mai Sơn Trà(25/06/25)
     */
    get sessionReset(): string {
        return this.getFullUrl(this.baseUrl, this.apiUrl['sessionReset']);
    }

    get provideSsl(): string {
        return this.apiUrl['provideSsl'];
    }

    //#endregion

    private getFullUrl(baseUrl: string, endpoint: string): string {
        return `${baseUrl}${endpoint}`;
    }

    get loginUrl(): string {
        return this.getFullUrl(this.baseUrl, this.apiUrl['login']);
    }

    get loginFormUrl(): string {
        return this.getFullUrl(this.baseUrl, this.apiUrl['login_form']);
    }

    get registerUrl(): string {
        return this.getFullUrl(this.baseUrl, this.apiUrl['register']);
    }

    get meUrl(): string {
        return this.getFullUrl(this.baseUrl, this.apiUrl['me']);
    }

    get accountPremiumUrl(): string {
        return this.getFullUrl(this.baseUrl, this.apiUrl['account_premium']);
    }

    get logoutUrl(): string {
        return this.getFullUrl(this.baseUrl, this.apiUrl['logout']);
    }

    get refreshTokenUrl(): string {
        return this.getFullUrl(this.baseUrl, this.apiUrl['refreshToken']);
    }
    get introspectUrl(): string {
        return this.getFullUrl(this.baseUrl, this.apiUrl['introspect']);
    }

    get generate2faCodeUrl(): string {
        return this.getFullUrl(this.baseUrl, this.apiUrl['generate2faCode']);
    }
    
    get transactionListUrl(): string {
        return this.getFullUrl(this.baseUrl, this.apiUrl['transactionList']);
    }

    get transactionDetailUrl(): string {
        return this.getFullUrl(this.baseUrl, this.apiUrl['transactionDetail']);
    }

    get transactionCreateUrl(): string {
        return this.getFullUrl(this.baseUrl, this.apiUrl['transactionCreate']);
    }

    get foundationListUrl(): string {
        return this.getFullUrl(this.baseUrl, this.apiUrl['foundationList']);
    }

    get foundationGetAllUrl(): string {
        return this.getFullUrl(this.baseUrl, this.apiUrl['foundationGetAll']);
    }

    get foundationCreateUrl(): string {
        return this.getFullUrl(this.baseUrl, this.apiUrl['foundationCreate']);
    }
    get foundationUpdateUrl(): string {
        return this.getFullUrl(this.baseUrl, this.apiUrl['foundationUpdate']);
    }
    get foundationDeleteUrl(): string {
        return this.getFullUrl(this.baseUrl, this.apiUrl['foundationDelete']);
    }

    get findAllUsersByFoundationIdUrl(): string {
        return this.getFullUrl(this.baseUrl, this.apiUrl['findAllUsersByFoundationId']);
    }

    get commonConfig(): any {
        return this.appConfig.commonConfig;
    }
}
