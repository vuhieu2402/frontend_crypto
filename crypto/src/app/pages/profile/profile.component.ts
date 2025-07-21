import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileLayoutComponent } from './profile-layout.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    ProfileLayoutComponent
  ],
  template: `<app-profile-layout></app-profile-layout>`
})
export class ProfileComponent { } 