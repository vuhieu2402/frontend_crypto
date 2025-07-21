import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileSidebarComponent } from './components/profile-sidebar.component';
import { ProfileHeaderComponent } from './components/profile-header.component';

// Section components
import { ProfileInformationComponent } from './components/sections/profile-information.component';
import { AccountSettingsComponent } from './components/sections/account-settings.component';
import { SecurityPrivacyComponent } from './components/sections/security-privacy.component';
import { NotificationSettingsComponent } from './components/sections/notification-settings.component';
import { ApiKeysComponent } from './components/sections/api-keys.component';
import { BillingSubscriptionComponent } from './components/sections/billing-subscription.component';
import { AppearanceSettingsComponent } from './components/sections/appearance-settings.component';
import { PreferencesSettingsComponent } from './components/sections/preferences-settings.component';

@Component({
  selector: 'app-profile-layout',
  standalone: true,
  imports: [
    CommonModule,
    ProfileHeaderComponent,
    ProfileSidebarComponent,
    ProfileInformationComponent,
    AccountSettingsComponent,
    SecurityPrivacyComponent,
    NotificationSettingsComponent,
    ApiKeysComponent,
    BillingSubscriptionComponent,
    AppearanceSettingsComponent,
    PreferencesSettingsComponent
  ],
  template: `
    <div class="min-h-screen bg-background">
      <app-profile-header></app-profile-header>
      <div class="container mx-auto px-4 py-6">
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div class="lg:col-span-1">
            <app-profile-sidebar [activeSection]="activeSection" (sectionChange)="onSectionChange($event)"></app-profile-sidebar>
          </div>
          <div class="lg:col-span-3">
            <div class="space-y-6">
              <ng-container [ngSwitch]="activeSection">
                <app-profile-information *ngSwitchCase="'profile'"></app-profile-information>
                <app-account-settings *ngSwitchCase="'account'"></app-account-settings>
                <app-security-privacy *ngSwitchCase="'security'"></app-security-privacy>
                <app-notification-settings *ngSwitchCase="'notifications'"></app-notification-settings>
                <app-api-keys *ngSwitchCase="'api'"></app-api-keys>
                <app-billing-subscription *ngSwitchCase="'billing'"></app-billing-subscription>
                <app-appearance-settings *ngSwitchCase="'appearance'"></app-appearance-settings>
                <app-preferences-settings *ngSwitchCase="'preferences'"></app-preferences-settings>
                <app-profile-information *ngSwitchDefault></app-profile-information>
              </ng-container>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class ProfileLayoutComponent {
  activeSection = 'profile';

  onSectionChange(section: string): void {
    this.activeSection = section;
  }
} 