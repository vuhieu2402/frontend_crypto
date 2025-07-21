import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../service/auth.service';
import { ThemeService } from '../../../service/theme.service';

// PrimeNG Components
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { DropdownModule } from 'primeng/dropdown';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';

// User interface
interface UserInfo {
  username: string;
  email: string;
  is_premium: boolean;
  is_verified: boolean;
}

// API Response interface
interface ApiResponse {
  status: number;
  message: string;
  data: UserInfo;
}

@Component({
  selector: 'app-dashboard-header',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    FormsModule,
    ButtonModule,
    InputTextModule,
    AvatarModule,
    BadgeModule,
    DropdownModule,
    MenuModule
  ],
  template: `
    <header class="sticky top-0 z-50 w-full border-b bg-gradient-to-r from-background via-background to-background/95 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 shadow-lg">
      <!-- Top gradient line -->
      <div class="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

      <div class="container mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <!-- Logo and Navigation -->
          <div class="flex items-center space-x-8">
            <div class="flex items-center space-x-3">
              <!-- Logo -->
              <div class="relative">
                <div class="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 rounded-xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-200">
                  <i class="pi pi-bolt text-white"></i>
                </div>
                <div class="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <div>
                <span class="font-bold text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  CryptoTracker
                </span>
                <div class="text-xs text-muted-foreground font-medium">Pro Dashboard</div>
              </div>
            </div>

            <!-- Navigation -->
            <nav class="hidden md:flex items-center space-x-1">
              <ng-container *ngFor="let item of navItems; let i = index">
                <div class="relative">
                  <button
                    pButton
                    [class]="item.active ? 
                      'relative text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200 bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md' : 
                      'relative text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200 p-button-text hover:bg-muted/80 hover:scale-105'"
                  >
                    {{ item.name }}
                  </button>
                  <span *ngIf="item.badge" 
                    class="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] px-1 py-0.5 rounded-md font-bold">
                    {{ item.badge }}
                  </span>
                </div>
              </ng-container>
            </nav>
          </div>

          <!-- Search Bar -->
          <div class="hidden md:flex items-center space-x-4 flex-1 max-w-lg mx-8">
            <div class="relative flex-1">
              <span class="p-input-icon-left w-full">
                
                <input 
                  pInputText 
                  type="text"
                  [(ngModel)]="searchQuery"
                  placeholder="Search coins, news, or ask AI..." 
                  class="w-full bg-muted/50 border-2 border-transparent focus:border-blue-500/50 focus:bg-background rounded-xl transition-all duration-200 shadow-sm" 
                />
              </span>

            </div>
          </div>

          <!-- Right Side Actions -->
          <div class="flex items-center space-x-3">
            <!-- Market Status Indicator -->
            <div class="hidden lg:flex items-center space-x-2 px-3 py-2 bg-green-500/10 rounded-lg border border-green-500/20">
              <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span class="text-sm font-medium text-green-600 dark:text-green-400">Markets Open</span>
            </div>

            <!-- Theme Toggle -->
            <button
              pButton
              [icon]="themeService.isDark() ? 'pi pi-moon' : 'pi pi-sun'"
              class="p-button-rounded p-button-text"
              (click)="themeService.toggleTheme()"
            ></button>

            <!-- Notifications -->
            <div class="relative">
              <button
                pButton
                icon="pi pi-bell"
                class="p-button-rounded p-button-text"
              ></button>
              <span class="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">3</span>
            </div>

            <!-- User Menu -->
            <button
              #userMenuBtn
              pButton
              class="p-button-rounded p-button-text"
              (click)="userMenu.toggle($event)"
            >
              <p-avatar 
                [image]="userImage" 
                styleClass="h-8 w-8 ring-2 ring-blue-500/20" 
                shape="circle"
                [label]="getUserInitials()"
                [style]="{'background-color': '#8B5CF6'}"
              ></p-avatar>
              <div class="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
            </button>
            
            <p-menu #userMenu [popup]="true" [model]="userMenuItems"></p-menu>

            <!-- Mobile Menu -->
            <button
              pButton
              icon="pi pi-bars"
              class="p-button-rounded p-button-text md:hidden"
              (click)="toggleMobileMenu()"
            ></button>
          </div>
        </div>
      </div>
    </header>
  `,
  styles: [`
    :host ::ng-deep .p-badge {
      min-width: 0.5rem;
      height: 0.5rem;
      line-height: 0.5rem;
    }
  `]
})
export class DashboardHeaderComponent implements OnInit {
  searchQuery: string = '';
  userInfo: UserInfo | null = null;
  userImage: string = '';
  
  navItems = [
    { name: 'Dashboard', active: true },
    { name: 'Markets', active: false },
    { name: 'Portfolio', active: false },
    { name: 'News', active: false },
    { name: 'AI Chat', active: false, badge: 'NEW' }
  ];

  userMenuItems: MenuItem[] = [];

  constructor(
    private authService: AuthService,
    public themeService: ThemeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchUserInfo();
  }

  fetchUserInfo(): void {
    this.authService.getUserProfile().subscribe({
      next: (response: ApiResponse) => {
        if (response.status === 1) {
          this.userInfo = response.data;
          this.updateUserMenuItems();
        } else {
          console.error('Failed to fetch user info:', response.message);
        }
      },
      error: (error) => {
        console.error('Error fetching user info:', error);
      }
    });
  }

  updateUserMenuItems(): void {
    if (this.userInfo) {
      this.userMenuItems = [
        {
          label: this.userInfo.username,
          items: [
            {
              label: 'Profile & Settings',
              icon: 'pi pi-user',
              command: () => this.navigateToProfile()
            },
            {
              label: 'Preferences',
              icon: 'pi pi-cog'
            },
            {
              label: 'Notifications',
              icon: 'pi pi-bell'
            }
          ]
        },
        {
          separator: true
        },
        {
          label: 'Log out',
          icon: 'pi pi-sign-out',
          command: () => this.logout()
        }
      ];
    }
  }

  getUserInitials(): string {
    if (this.userInfo && this.userInfo.username) {
      return this.userInfo.username.substring(0, 2).toUpperCase();
    }
    return '';
  }

  navigateToProfile(): void {
    this.router.navigate(['/profile']);
  }

  toggleMobileMenu(): void {
    // Implement mobile menu toggle logic
  }

  logout(): void {
    this.authService.logout();
  }
}
