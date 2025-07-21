import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardHeaderComponent } from './header.component';
import { DashboardFooterComponent } from './footer.component';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    DashboardHeaderComponent,
    DashboardFooterComponent
  ],
  template: `
    <div class="flex flex-col min-h-screen">
      <!-- Header -->
      <app-dashboard-header class="sticky top-0 z-50"></app-dashboard-header>
      
      <!-- Main Content -->
      <main class="flex-grow">
        <div class="container mx-auto px-4 py-6 pb-32">
          <ng-content></ng-content>
        </div>
      </main>
      
      <!-- Footer -->
      <app-dashboard-footer class="mt-auto"></app-dashboard-footer>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }
    
    main {
      position: relative;
      z-index: 1;
    }
  `]
})
export class DashboardLayoutComponent {} 