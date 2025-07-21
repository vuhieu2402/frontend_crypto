import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div class="container mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <button class="rounded-lg p-2" (click)="navigateHome()">
              <i class="pi pi-arrow-left" style="font-size: 1rem"></i>
            </button>
            <div>
              <h1 class="text-2xl font-bold">Profile & Settings</h1>
              <p class="text-sm text-muted-foreground">Manage your account and preferences</p>
            </div>
          </div>

          <div class="flex items-center space-x-2">
            <span class="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-2 py-1 rounded-full text-xs font-medium flex items-center">
              <i class="pi pi-shield mr-1"></i>
              Verified Account
            </span>
            <span class="bg-gradient-to-r from-purple-500 to-pink-500 px-2 py-1 rounded-full text-xs font-medium text-white">Pro Member</span>
          </div>
        </div>
      </div>
    </header>
  `,
  styles: []
})
export class ProfileHeaderComponent {
  constructor(private router: Router) {}

  navigateHome(): void {
    this.router.navigate(['/dashboard']);
  }
} 