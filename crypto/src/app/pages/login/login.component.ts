import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../service/auth.service';
import { ToastService } from '../../service/toast.service';
import { MessageService } from 'primeng/api';

// PrimeNG Components
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { TabViewModule } from 'primeng/tabview';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { BadgeModule } from 'primeng/badge';
import { DialogModule } from 'primeng/dialog';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        RouterModule, 
        ReactiveFormsModule,
        ButtonModule,
        CheckboxModule,
        InputTextModule,
        PasswordModule,
        TabViewModule,
        CardModule,
        DividerModule,
        BadgeModule,
        DialogModule
    ],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
    loginForm: FormGroup;
    registerForm: FormGroup;
    twoFactorForm: FormGroup;
    showTwoFactorForm: boolean = false;
    show2FAMethodForm: boolean = false;
    selected2FAMethod: string = '';
    private twoFactorSub: Subscription = new Subscription();
    errors: Record<string, string> = {};
    isLoading: boolean = false;
    loginStatus: 'idle' | 'success' | 'error' = 'idle';
    showPassword: boolean = false;
    activeTab: string = 'login';
    
    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private toast: ToastService,
        private messageService: MessageService,
        private cdr: ChangeDetectorRef
    ) {
        // Initialize login form
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(8)]],
            rememberMe: [false]
        });

        this.twoFactorForm = this.formBuilder.group({
            code: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]]
        });

        // Initialize register form
        this.registerForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(8)]],
            confirmPassword: ['', Validators.required],
            referralCode: [''],
            acceptTerms: [false, Validators.requiredTrue]
        }, {
            validators: this.passwordMatchValidator
        });
    }
    
    ngOnInit(): void {
        this.twoFactorSub = this.authService.twoFactorRequired$.subscribe(isRequired => {
            this.showTwoFactorForm = isRequired;
            if (isRequired) {
                this.twoFactorForm.reset();
            }
            this.cdr.detectChanges();
        });
    }

    ngOnDestroy(): void {
        if (this.twoFactorSub) {
            this.twoFactorSub.unsubscribe();
        }
    }
    
    // Custom validator for password matching
    passwordMatchValidator(group: FormGroup): {[key: string]: any} | null {
        const password = group.get('password')?.value;
        const confirmPassword = group.get('confirmPassword')?.value;
        
        if (password !== confirmPassword) {
            group.get('confirmPassword')?.setErrors({ mismatch: true });
            return { passwordMismatch: true };
        }
        
        return null;
    }
    
    // Validate login form
    validateLogin(): boolean {
        this.errors = {};
        
        const username = this.loginForm.get('username');
        const password = this.loginForm.get('password');
        
        if (!username?.value?.trim()) {
            this.errors['username'] = 'Username is required';
        }
        
        if (!password?.value) {
            this.errors['password'] = 'Password is required';
        } else if (password?.value.length < 8) {
            this.errors['password'] = 'Password must be at least 8 characters';
        }
        
        return Object.keys(this.errors).length === 0;
    }
    
    // Validate register form
    validateRegister(): boolean {
        this.errors = {};
        
        const email = this.registerForm.get('email');
        const password = this.registerForm.get('password');
        const confirmPassword = this.registerForm.get('confirmPassword');
        const acceptTerms = this.registerForm.get('acceptTerms');
        
        if (!email?.value?.trim()) {
            this.errors['email'] = 'Email is required';
        } else if (email.errors?.['email']) {
            this.errors['email'] = 'Please enter a valid email';
        }
        
        if (!password?.value) {
            this.errors['password'] = 'Password is required';
        } else if (password?.value.length < 8) {
            this.errors['password'] = 'Password must be at least 8 characters';
        }
        
        if (password?.value !== confirmPassword?.value) {
            this.errors['confirmPassword'] = 'Passwords do not match';
        }
        
        if (!acceptTerms?.value) {
            this.errors['acceptTerms'] = 'You must accept the terms and conditions';
        }
        
        return Object.keys(this.errors).length === 0;
    }
    
    // Handle login submission
    login() {
        if (!this.validateLogin()) {
            this.loginForm.markAllAsTouched();
            return;
        }
        
        this.isLoading = true;
        this.loginStatus = 'idle';
        
        const formValue = this.loginForm.value;
        
        // Call the login API
        this.authService.login(formValue.username, formValue.password).subscribe({
            next: (response: any) => {
                this.isLoading = false;
                
                if (response && response.data && response.data.requires_2fa) {
                    if (response.data.two_factor_method === 'totp') {
                        this.showTwoFactorForm = true;
                    } else {
                        this.show2FAMethodForm = true;
                    }
                } else if (response && response.status === 1) {
                    // Successful login without 2FA
                    this.loginStatus = 'success';
                    this.toast.success('Login Successful', 'Welcome back!');
                    setTimeout(() => {
                        this.router.navigate(['/dashboard']);
                    }, 1000);
                } else {
                    // Handle unsuccessful login
                    this.loginStatus = 'error';
                    this.toast.error('Login Failed', response.message || 'Invalid credentials. Please try again.');
                }
            },
            error: (error) => {
                this.isLoading = false;
                this.loginStatus = 'error';
                this.toast.error('Login Failed', error?.error?.message || 'Unable to connect to the server.');
            }
        });
    }

    // Handle 2FA code submission
    verify2fa() {
        if (this.twoFactorForm.invalid) {
            this.toast.error('Invalid Code', 'Please enter a valid 6-digit code.');
            return;
        }

        this.isLoading = true;
        const code = this.twoFactorForm.value.code;

        this.authService.verify2fa(code).subscribe({
            next: () => {
                this.isLoading = false;
                this.loginStatus = 'success';
                this.showTwoFactorForm = false;
                this.show2FAMethodForm = false;
                this.toast.success('Login Successful', 'Welcome back!');
                setTimeout(() => {
                    this.router.navigate(['/dashboard']);
                }, 1000);
            },
            error: (error) => {
                this.isLoading = false;
                this.loginStatus = 'error';
                this.toast.error('Verification Failed', error?.error?.message || 'Invalid or expired code.');
            }
        });
    }

    // Request 2FA code via email or SMS
    requestCode(method: 'email' | 'sms') {
        this.isLoading = true;
        this.toast.info('Sending Code...', `Requesting a verification code via ${method}.`);
        this.authService.generate2faCode(method).subscribe({
            next: () => {
                this.isLoading = false;
                this.toast.success('Code Sent', `A verification code has been sent via ${method}.`);
            },
            error: (error) => {
                this.isLoading = false;
                this.toast.error('Failed to Send Code', error?.error?.message || 'Could not send verification code.');
            }
        });
    }

    select2FAMethod(method: 'email' | 'sms') {
        this.isLoading = true;
        this.authService.generate2faCode(method).subscribe({
            next: () => {
                this.isLoading = false;
                this.show2FAMethodForm = false;
                this.showTwoFactorForm = true;
                this.selected2FAMethod = method;
                this.toast.success('Code Sent', `A verification code has been sent to your ${method}.`);
            },
            error: (error) => {
                this.isLoading = false;
                this.toast.error('Error', error?.error?.message || 'Failed to send verification code.');
            }
        });
    }
    
    // Handle register submission
    register() {
        if (!this.validateRegister()) {
            this.registerForm.markAllAsTouched();
            return;
        }
        
        this.isLoading = true;
        this.loginStatus = 'idle';
        
        const formValue = this.registerForm.value;
        
        // Prepare registration data
        const registrationData = {
            email: formValue.email,
            password: formValue.password,
            referralCode: formValue.referralCode || null
        };
        
        // Call the register API
        this.authService.register(registrationData).subscribe({
            next: (response: any) => {
                this.isLoading = false;
                
                if (response && response.result) {
                    // Successful registration
                    this.loginStatus = 'success';
                    
                    // Show success message
                    this.toast.success('Registration Successful', 'Please check your email to verify your account.');
                    
                    // Switch to login tab after a short delay
                    setTimeout(() => {
                        this.activeTab = 'login';
                        // Reset the form
                        this.registerForm.reset();
                    }, 2000);
                } else {
                    // Handle unsuccessful registration
                    this.loginStatus = 'error';
                    this.toast.error('Registration Failed', response.message || 'Unable to create account. Please try again.');
                }
            },
            error: (error) => {
                this.isLoading = false;
                this.loginStatus = 'error';
                this.toast.error('Registration Failed', error?.error?.message || 'Unable to connect to the server. Please try again later.');
            }
        });
    }
    
    // Toggle password visibility
    togglePasswordVisibility() {
        this.showPassword = !this.showPassword;
    }
    
    // Clear any error when input changes
    clearError(field: string) {
        if (this.errors[field]) {
            delete this.errors[field];
        }
    }
    
    // Handle tab change
    onTabChange(event: any) {
        this.activeTab = event.index === 0 ? 'login' : 'register';
        this.loginStatus = 'idle';
        this.errors = {};
    }
}
