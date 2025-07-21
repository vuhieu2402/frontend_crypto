import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notification-settings',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card">
      <div class="card-header">
        <h5 class="text-xl font-bold m-0 p-4">Notification Settings</h5>
      </div>
      <div class="card-body p-4">
        <p>Notification settings content will go here.</p>
      </div>
    </div>
  `
})
export class NotificationSettingsComponent {} 