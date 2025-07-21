import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-appearance-settings',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card">
      <div class="card-header">
        <h5 class="text-xl font-bold m-0 p-4">Appearance Settings</h5>
      </div>
      <div class="card-body p-4">
        <p>Appearance settings content will go here.</p>
      </div>
    </div>
  `
})
export class AppearanceSettingsComponent {} 