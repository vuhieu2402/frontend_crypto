import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-preferences-settings',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card">
      <div class="card-header">
        <h5 class="text-xl font-bold m-0 p-4">Preferences Settings</h5>
      </div>
      <div class="card-body p-4">
        <p>Preferences settings content will go here.</p>
      </div>
    </div>
  `
})
export class PreferencesSettingsComponent {} 