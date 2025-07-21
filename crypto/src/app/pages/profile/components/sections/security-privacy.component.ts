import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../service/auth.service';
import { ToastService } from '../../../../service/toast.service';

@Component({
  selector: 'app-security-privacy',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="space-y-6">
      <!-- Password Security -->
      <div class="bg-white dark:bg-gray-800 shadow-md rounded-lg">
        <div class="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 class="text-lg font-medium flex items-center space-x-2">
            <span class="material-icons-outlined">key</span>
            <span>Password & Authentication</span>
          </h3>
        </div>
        <div class="p-6 space-y-6">
          <!-- Change Password -->
          <form [formGroup]="changePasswordForm" (ngSubmit)="onChangePassword()" class="space-y-4">
            <h4 class="font-medium">Change Password</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="space-y-2">
                <label for="currentPassword" class="text-sm font-medium text-gray-600 dark:text-gray-400">Current Password</label>
                <div class="relative">
                  <input [type]="showCurrentPassword() ? 'text' : 'password'" id="currentPassword" formControlName="current_password" placeholder="Enter current password" class="w-full bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-md p-3">
                  <button type="button" (click)="toggleCurrentPasswordVisibility()" class="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8">
                    <span class="material-icons-outlined">{{ showCurrentPassword() ? 'visibility_off' : 'visibility' }}</span>
                  </button>
                </div>
              </div>
              <div class="space-y-2">
                <label for="newPassword" class="text-sm font-medium text-gray-600 dark:text-gray-400">New Password</label>
                <div class="relative">
                  <input [type]="showNewPassword() ? 'text' : 'password'" id="newPassword" formControlName="new_password" placeholder="Enter new password" class="w-full bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-md p-3">
                  <button type="button" (click)="toggleNewPasswordVisibility()" class="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8">
                    <span class="material-icons-outlined">{{ showNewPassword() ? 'visibility_off' : 'visibility' }}</span>
                  </button>
                </div>
              </div>
            </div>
            <button type="submit" [disabled]="changePasswordForm.invalid" class="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-md disabled:opacity-50">Update Password</button>
          </form>

          <hr class="border-gray-200 dark:border-gray-700">

          <!-- Two-Factor Authentication -->
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div class="space-y-1">
                <h4 class="font-medium flex items-center space-x-2">
                  <span class="material-icons-outlined">smartphone</span>
                  <span>Two-Factor Authentication</span>
                </h4>
              </div>
              <p class="text-sm text-gray-500 dark:text-gray-400">Add an extra layer of security to your account</p>
              <div class="flex items-center space-x-2">
                <span *ngIf="twoFactorEnabled()" class="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-2 py-1 rounded-md text-xs">Enabled</span>
                <span *ngIf="!twoFactorEnabled()" class="bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200 px-2 py-1 rounded-md text-xs">Disabled</span>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" [checked]="twoFactorEnabled()" (change)="onToggleTwoFactor($event)" class="sr-only peer">
                  <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>

            <!-- 2FA Setup Block -->
            <div *ngIf="show2FASetup()" class="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-200 dark:border-gray-700 space-y-4">
              <h5 class="font-medium">Set Up Two-Factor Authentication</h5>
              <p class="text-sm text-gray-600 dark:text-gray-400">Choose your preferred method for an extra layer of security.</p>
              
              <!-- Method Selection -->
              <div *ngIf="!showVerificationInput()" class="flex items-center space-x-4">
                <button (click)="setupTwoFactor('totp')" class="flex-1 text-center bg-gray-200 dark:bg-gray-700 p-3 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">Authenticator App</button>
                <button (click)="setupTwoFactor('email')" class="flex-1 text-center bg-gray-200 dark:bg-gray-700 p-3 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">Email</button>
                <button (click)="setupTwoFactor('sms')" class="flex-1 text-center bg-gray-200 dark:bg-gray-700 p-3 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">SMS</button>
              </div>

              <!-- Verification Section -->
              <div *ngIf="showVerificationInput()" class="text-center p-4 bg-white dark:bg-gray-800 rounded-md space-y-4">
                <!-- TOTP Details -->
                <div *ngIf="setupMethod() === 'totp'">
                  <div *ngIf="qrCodeImageUrl()">
                    <h6 class="font-medium">Scan this QR Code</h6>
                    <p class="text-sm text-gray-500 dark:text-gray-400">Use your authenticator app to scan this code.</p>
                    <img [src]="qrCodeImageUrl()" alt="QR Code" class="mx-auto mt-2">
                  </div>
                  
                  <div *ngIf="secretKey()" class="pt-4">
                    <h6 class="font-medium">Or Enter Code Manually</h6>
                    <p class="text-sm text-gray-500 dark:text-gray-400">If you can't scan the QR code, enter this secret key.</p>
                    <div class="mt-2 p-3 bg-gray-100 dark:bg-gray-700 rounded-md text-lg font-mono tracking-wider text-gray-800 dark:text-gray-200">
                      {{ secretKey() }}
                    </div>
                  </div>
                </div>

                <!-- Email/SMS Details -->
                <div *ngIf="setupMethod() === 'email' || setupMethod() === 'sms'">
                  <h6 class="font-medium">Check Your {{ setupMethod() === 'email' ? 'Email' : 'Messages' }}</h6>
                  <p class="text-sm text-gray-500 dark:text-gray-400">A verification code has been sent to you. Please enter it below.</p>
                </div>

                <!-- Verification Form -->
                <form [formGroup]="verify2faForm" (ngSubmit)="onVerifyTwoFactor()" class="space-y-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div class="space-y-2">
                    <label for="2fa-code" class="text-sm font-medium text-gray-600 dark:text-gray-400">Verification Code</label>
                    <input id="2fa-code" type="text" formControlName="code" placeholder="Enter 6-digit code" class="w-full bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-md p-3 text-center tracking-widest">
                  </div>
                  <button type="submit" [disabled]="verify2faForm.invalid" class="w-full bg-gradient-to-r from-green-500 to-teal-600 text-white px-4 py-2 rounded-md disabled:opacity-50">
                    Verify & Enable
                  </button>
                </form>
              </div>

              <div class="flex justify-end">
                <button (click)="cancel2FASetup()" class="bg-transparent border border-gray-300 dark:border-gray-600 px-3 py-1 rounded-md text-sm">Cancel</button>
              </div>
            </div>

            <div *ngIf="twoFactorEnabled()" class="p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
              <p class="text-sm text-green-800 dark:text-green-200">
                Two-factor authentication is enabled.
              </p>
              <button class="mt-2 bg-transparent border border-gray-300 dark:border-gray-600 px-3 py-1 rounded-md text-sm">
                View Recovery Codes
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Login Security -->
      <div class="bg-white dark:bg-gray-800 shadow-md rounded-lg">
        <div class="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 class="text-lg font-medium flex items-center space-x-2">
            <span class="material-icons-outlined">shield</span>
            <span>Login Security</span>
          </h3>
        </div>
        <div class="p-6 space-y-6">
          <!-- Recent Login Activity -->
          <div class="space-y-4">
            <h4 class="font-medium">Recent Login Activity</h4>
            <div class="space-y-3">
              <div *ngFor="let login of recentLogins" class="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div class="space-y-1">
                  <div class="flex items-center space-x-2">
                    <span class="font-medium text-sm">{{ login.device }}</span>
                    <span *ngIf="login.current" class="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-md">Current</span>
                  </div>
                  <p class="text-xs text-gray-500 dark:text-gray-400">
                    {{ login.location }} • {{ login.time }}
                  </p>
                </div>
                <button *ngIf="!login.current" class="border border-gray-300 dark:border-gray-600 px-3 py-1 rounded-md text-sm">
                  Revoke
                </button>
              </div>
            </div>
          </div>

          <hr class="border-gray-200 dark:border-gray-700">

          <!-- Security Notifications -->
          <div class="space-y-4">
            <h4 class="font-medium">Security Notifications</h4>
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <div class="space-y-1">
                  <p class="font-medium text-sm">Login Notifications</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">Get notified when someone logs into your account</p>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" [checked]="loginNotifications()" (change)="toggleLoginNotifications()" class="sr-only peer">
                  <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Privacy Settings -->
      <div class="bg-white dark:bg-gray-800 shadow-md rounded-lg">
        <div class="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 class="text-lg font-medium flex items-center space-x-2">
            <span class="material-icons-outlined">visibility</span>
            <span>Privacy Settings</span>
          </h3>
        </div>
        <div class="p-6 space-y-6">
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div class="space-y-1">
                <p class="font-medium text-sm">Data Sharing</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">Allow anonymous usage data to help improve our services</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" [checked]="dataSharing()" (change)="toggleDataSharing()" class="sr-only peer">
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>

          <hr class="border-gray-200 dark:border-gray-700">

          <!-- Danger Zone -->
          <div class="space-y-4">
            <h4 class="font-medium text-red-600 flex items-center space-x-2">
              <span class="material-icons-outlined">warning</span>
              <span>Danger Zone</span>
            </h4>
            <div class="p-4 border border-red-200 dark:border-red-800 rounded-lg bg-red-50 dark:bg-red-950">
              <div class="space-y-3">
                <div>
                  <h5 class="font-medium text-red-800 dark:text-red-200">Delete Account</h5>
                  <p class="text-sm text-red-600 dark:text-red-300">
                    Permanently delete your account and all associated data. This action cannot be undone.
                  </p>
                </div>
                <button class="bg-red-600 text-white px-4 py-2 rounded-md text-sm">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class SecurityPrivacyComponent implements OnInit {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private toast = inject(ToastService);
  private fb = inject(FormBuilder);

  changePasswordForm: FormGroup;
  showCurrentPassword = signal(false);
  showNewPassword = signal(false);
  twoFactorEnabled = signal(false);
  show2FASetup = signal(false);
  qrCodeImageUrl = signal<string | null>(null);
  secretKey = signal<string | null>(null);
  setupMethod = signal<'totp' | 'email' | 'sms' | null>(null);
  showVerificationInput = signal(false);
  verify2faForm: FormGroup;
  loginNotifications = signal(true);
  dataSharing = signal(true);

  recentLogins = [
    { device: "Chrome on Windows", location: "San Francisco, CA", time: "2 hours ago", current: true },
    { device: "Safari on iPhone", location: "San Francisco, CA", time: "1 day ago", current: false },
    { device: "Firefox on macOS", location: "New York, NY", time: "3 days ago", current: false },
  ];

  constructor() {
    this.changePasswordForm = this.fb.group({
      current_password: ['', Validators.required],
      new_password: ['', Validators.required]
    });

    this.verify2faForm = this.fb.group({
      code: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]]
    });
  }

  ngOnInit(): void {
    this.checkTwoFactorStatus();
  }

  checkTwoFactorStatus(): void {
    const apiUrl = 'http://127.0.0.1:8000/api/crypto/two-factor/status';
    this.http.get<{ enabled: boolean }>(apiUrl, { headers: this.authService['createHeaders']() }).subscribe({
      next: (response) => {
        this.twoFactorEnabled.set(response.enabled);
      },
      error: (err) => {
        console.error('Failed to check 2FA status', err);
        this.toast.error('Error', 'Failed to check Two-Factor Authentication status');
      }
    });
  }

  onChangePassword(): void {
    if (this.changePasswordForm.invalid) {
      return;
    }

    const apiUrl = 'http://127.0.0.1:8000/api/crypto/user/change-password';
    const body = this.changePasswordForm.value;

    this.http.post(apiUrl, body, { headers: this.authService['createHeaders']() }).subscribe({
      next: () => {
        this.toast.success('Success', 'Password updated successfully');
        this.changePasswordForm.reset();
      },
      error: (err) => {
        this.toast.error('Error', err.error.message || 'Failed to update password');
      }
    });
  }

  toggleCurrentPasswordVisibility() {
    this.showCurrentPassword.update(value => !value);
  }

  toggleNewPasswordVisibility() {
    this.showNewPassword.update(value => !value);
  }

  onToggleTwoFactor(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.checked) {
      this.show2FASetup.set(true);
      // Prevent the toggle from appearing as "on" until setup is complete
      input.checked = false;
    } else {
      // Logic to disable 2FA
      this.disableTwoFactor();
    }
  }

  setupTwoFactor(method: 'totp' | 'email' | 'sms'): void {
    this.setupMethod.set(method);
    this.showVerificationInput.set(true);

    if (method === 'totp') {
      const setupApiUrl = 'http://127.0.0.1:8000/api/crypto/two-factor/setup';
      this.http.post<{ data?: { qr_code_url?: string, secret_key?: string } }>(setupApiUrl, { method }, { headers: this.authService['createHeaders']() }).subscribe({
        next: (response) => {
          if (response.data && response.data.qr_code_url && response.data.secret_key) {
            const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(response.data.qr_code_url)}`;
            this.qrCodeImageUrl.set(qrUrl);
            this.secretKey.set(response.data.secret_key);
            this.toast.success('Success', 'Scan the QR code or use the secret key.');
          }
        },
        error: (err) => {
          this.toast.error('Error', err.error.message || 'Failed to start TOTP setup.');
          this.cancel2FASetup();
        }
      });
    } else { // 'email' or 'sms'
      const generateCodeApiUrl = 'http://127.0.0.1:8000/api/crypto/two-factor/generate-code';
      this.http.post(generateCodeApiUrl, { method }, { headers: this.authService['createHeaders']() }).subscribe({
        next: () => {
          this.toast.success('Success', `A verification code has been sent to your ${method}.`);
        },
        error: (err) => {
          this.toast.error('Error', err.error.message || `Failed to send verification code.`);
          this.cancel2FASetup();
        }
      });
    }
  }

  onVerifyTwoFactor(): void {
    if (this.verify2faForm.invalid) {
      return;
    }
    const apiUrl = 'http://127.0.0.1:8000/api/crypto/two-factor/verify';
    const method = this.setupMethod();
    const body: {
      code: string;
      method: string | null;
      secret?: string | null
    } = {
      code: this.verify2faForm.value.code,
      method: method,
    };

    if (method === 'totp') {
      body.secret = this.secretKey();
    }

    this.http.post(apiUrl, body, { headers: this.authService['createHeaders']() }).subscribe({
      next: () => {
        this.toast.success('Success', 'Two-Factor Authentication has been enabled!');
        this.twoFactorEnabled.set(true);
        this.cancel2FASetup(); // Clean up the setup UI
      },
      error: (err) => {
        this.toast.error('Error', err.error.message || 'Verification failed. Please try again.');
      }
    });
  }

  disableTwoFactor(): void {
    // Placeholder for disable API call.
    // You should replace this with a call to your actual disable endpoint.
    console.log('Disabling 2FA...');
    this.toast.info('Info', 'Two-factor authentication disabled.');
    this.twoFactorEnabled.set(false);
    this.cancel2FASetup();
  }

  cancel2FASetup(): void {
    this.show2FASetup.set(false);
    this.showVerificationInput.set(false);
    this.qrCodeImageUrl.set(null);
    this.secretKey.set(null);
    this.setupMethod.set(null);
    this.verify2faForm.reset();
  }

  toggleLoginNotifications() {
    this.loginNotifications.update(value => !value);
  }

  toggleDataSharing() {
    this.dataSharing.update(value => !value);
  }
}
