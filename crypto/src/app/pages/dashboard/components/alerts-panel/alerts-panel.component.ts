import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FormsModule } from '@angular/forms';
import { TooltipModule } from 'primeng/tooltip';
import { AlertsService } from '../../../../service/alerts.service';
import { Subscription } from 'rxjs';

// Định nghĩa interface trong file component
interface PriceAlert {
  coin: string;
  condition: string;
  price: string;
  active: boolean;
}

@Component({
  selector: 'app-alerts-panel',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule, InputSwitchModule, FormsModule, TooltipModule],
  templateUrl: './alerts-panel.component.html',
  styleUrls: ['./alerts-panel.component.scss']
})
export class AlertsPanelComponent implements OnInit, OnDestroy {
  priceAlerts: PriceAlert[] = [];
  private subscription: Subscription = new Subscription();

  constructor(private alertsService: AlertsService) {}

  ngOnInit(): void {
    this.subscription.add(
      this.alertsService.getAlerts().subscribe(alerts => {
        this.priceAlerts = alerts;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  toggleAlert(index: number): void {
    this.alertsService.toggleAlertActive(index);
  }

  addNewAlert(): void {
    // This would typically open a dialog to create a new alert
    console.log('Add new alert clicked');
  }

  manageAllAlerts(): void {
    console.log('Manage all alerts clicked');
  }

  openSettings(): void {
    console.log('Settings clicked');
  }
} 