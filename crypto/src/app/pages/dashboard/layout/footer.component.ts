import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <footer class="border-t bg-muted py-8 w-full">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <!-- Company Info -->
          <div class="space-y-4">
            <div class="flex items-center space-x-2">
              <div class="w-8 h-8 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 rounded-lg flex items-center justify-center">
                <i class="pi pi-bolt text-white text-sm"></i>
              </div>
              <span class="font-bold text-xl">CryptoTracker</span>
            </div>
            <p class="text-sm text-muted-foreground">
              Advanced cryptocurrency tracking and portfolio management platform with AI-powered insights.
            </p>
            <div class="flex space-x-3">
              <a href="#" class="hover:text-primary transition-colors">
                <i class="pi pi-twitter"></i>
              </a>
              <a href="#" class="hover:text-primary transition-colors">
                <i class="pi pi-facebook"></i>
              </a>
              <a href="#" class="hover:text-primary transition-colors">
                <i class="pi pi-github"></i>
              </a>
              <a href="#" class="hover:text-primary transition-colors">
                <i class="pi pi-discord"></i>
              </a>
            </div>
          </div>

          <!-- Products -->
          <div>
            <h3 class="font-semibold mb-4">Products</h3>
            <ul class="space-y-2">
              <li><a routerLink="/dashboard" class="text-sm text-muted-foreground hover:text-primary transition-colors">Dashboard</a></li>
              <li><a routerLink="/portfolio" class="text-sm text-muted-foreground hover:text-primary transition-colors">Portfolio</a></li>
              <li><a routerLink="/market" class="text-sm text-muted-foreground hover:text-primary transition-colors">Market Data</a></li>
              <li><a routerLink="/alerts" class="text-sm text-muted-foreground hover:text-primary transition-colors">Price Alerts</a></li>
              <li><a routerLink="/news" class="text-sm text-muted-foreground hover:text-primary transition-colors">Crypto News</a></li>
            </ul>
          </div>

          <!-- Company -->
          <div>
            <h3 class="font-semibold mb-4">Company</h3>
            <ul class="space-y-2">
              <li><a href="#" class="text-sm text-muted-foreground hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#" class="text-sm text-muted-foreground hover:text-primary transition-colors">Careers</a></li>
              <li><a href="#" class="text-sm text-muted-foreground hover:text-primary transition-colors">Blog</a></li>
              <li><a href="#" class="text-sm text-muted-foreground hover:text-primary transition-colors">Press</a></li>
              <li><a href="#" class="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>

          <!-- Legal -->
          <div>
            <h3 class="font-semibold mb-4">Legal</h3>
            <ul class="space-y-2">
              <li><a href="#" class="text-sm text-muted-foreground hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" class="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" class="text-sm text-muted-foreground hover:text-primary transition-colors">Cookie Policy</a></li>
              <li><a href="#" class="text-sm text-muted-foreground hover:text-primary transition-colors">Disclaimer</a></li>
              <li><a href="#" class="text-sm text-muted-foreground hover:text-primary transition-colors">Security</a></li>
            </ul>
          </div>
        </div>

        <div class="mt-8 pt-6 border-t flex flex-col md:flex-row justify-between items-center">
          <p class="text-sm text-muted-foreground">
            © {{ currentYear }} CryptoTracker. All rights reserved.
          </p>
          <div class="mt-4 md:mt-0 flex space-x-4">
            <a href="#" class="text-xs text-muted-foreground hover:text-primary transition-colors">Privacy</a>
            <a href="#" class="text-xs text-muted-foreground hover:text-primary transition-colors">Terms</a>
            <a href="#" class="text-xs text-muted-foreground hover:text-primary transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }
  `]
})
export class DashboardFooterComponent {
  currentYear = new Date().getFullYear();
} 