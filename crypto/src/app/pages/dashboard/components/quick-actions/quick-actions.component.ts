import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { QuickActionsService } from '../../../../service/quick-actions.service';

interface QuickAction {
  label: string;
  icon: string;
  color: string;
  action: () => void;
}

@Component({
  selector: 'app-quick-actions',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule],
  templateUrl: './quick-actions.component.html',
  styleUrls: ['./quick-actions.component.scss']
})
export class QuickActionsComponent implements OnInit, OnDestroy {
  quickActions: QuickAction[] = [];

  constructor(private quickActionsService: QuickActionsService) {}

  ngOnInit(): void {
    this.quickActions = this.quickActionsService.getQuickActions();
  }

  ngOnDestroy(): void {
    // Clean up resources if needed
  }
} 