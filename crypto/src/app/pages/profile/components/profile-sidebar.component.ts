import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface MenuItem {
  id: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-profile-sidebar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card sticky top-6">
      <div class="p-4">
        <nav class="space-y-2">
          <button
            *ngFor="let item of menuItems"
            class="w-full justify-start text-left p-2 rounded-lg"
            [ngClass]="{'bg-gradient-to-r from-blue-500 to-purple-600 text-white': activeSection === item.id, 'bg-white dark:bg-gray-800 hover:bg-muted/80': activeSection !== item.id}"
            (click)="handleSectionChange(item.id)"
          >
            <i class="pi {{item.icon}} mr-3"></i>
            {{item.label}}
          </button>
        </nav>
      </div>
    </div>
  `,
  styles: []
})
export class ProfileSidebarComponent {
  @Input() activeSection = 'profile';
  @Output() sectionChange = new EventEmitter<string>();

  menuItems: MenuItem[] = [
    { id: 'profile', label: 'Profile Information', icon: 'pi-user' },
    { id: 'account', label: 'Account Settings', icon: 'pi-cog' },
    { id: 'security', label: 'Security & Privacy', icon: 'pi-shield' },
    { id: 'notifications', label: 'Notifications', icon: 'pi-bell' },
    { id: 'api', label: 'API Keys', icon: 'pi-key' },
    { id: 'billing', label: 'Billing & Subscription', icon: 'pi-credit-card' },
    { id: 'appearance', label: 'Appearance', icon: 'pi-palette' },
    { id: 'preferences', label: 'Preferences', icon: 'pi-globe' },
  ];

  constructor(private router: Router) {}

  handleSectionChange(sectionId: string): void {
    this.activeSection = sectionId;
    this.sectionChange.emit(sectionId);
  }

  navigateToDashboard(): void {
    this.router.navigate(['/']);
  }
} 