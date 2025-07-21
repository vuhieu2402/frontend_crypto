import { Injectable } from '@angular/core';
import { QuickAction } from '../shared/models/quick-action.model';

@Injectable({
  providedIn: 'root'
})
export class QuickActionsService {
  
  constructor() {}
  
  getQuickActions(): QuickAction[] {
    return [
      {
        label: 'Buy',
        icon: 'pi pi-plus-circle',
        color: '#10B981', // green-500
        action: () => this.handleAction('buy')
      },
      {
        label: 'Sell',
        icon: 'pi pi-minus-circle',
        color: '#EF4444', // red-500
        action: () => this.handleAction('sell')
      },
      {
        label: 'Swap',
        icon: 'pi pi-arrows-h',
        color: '#8B5CF6', // violet-500
        action: () => this.handleAction('swap')
      },
      {
        label: 'Transfer',
        icon: 'pi pi-send',
        color: '#3B82F6', // blue-500
        action: () => this.handleAction('transfer')
      }
    ];
  }
  
  handleAction(action: string): void {
    console.log(`Action triggered: ${action}`);
    // In real app, would trigger appropriate action, dialog, etc.
  }
} 