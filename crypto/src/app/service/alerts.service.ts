import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

// Định nghĩa interface trong file service
interface PriceAlert {
  coin: string;
  condition: string;
  price: string;
  active: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AlertsService {
  private defaultAlerts: PriceAlert[] = [
    {
      coin: 'Bitcoin (BTC)',
      condition: 'rises above',
      price: '$70,000.00',
      active: true
    },
    {
      coin: 'Ethereum (ETH)',
      condition: 'drops below',
      price: '$3,000.00',
      active: true
    },
    {
      coin: 'Solana (SOL)',
      condition: 'rises above',
      price: '$200.00',
      active: false
    }
  ];

  private alertsSubject = new BehaviorSubject<PriceAlert[]>(this.defaultAlerts);
  
  constructor() {}
  
  getAlerts(): Observable<PriceAlert[]> {
    return this.alertsSubject.asObservable();
  }
  
  addAlert(alert: PriceAlert): void {
    const currentAlerts = this.alertsSubject.getValue();
    this.alertsSubject.next([...currentAlerts, alert]);
  }
  
  updateAlert(index: number, alert: PriceAlert): void {
    const currentAlerts = this.alertsSubject.getValue();
    const updatedAlerts = [...currentAlerts];
    updatedAlerts[index] = alert;
    this.alertsSubject.next(updatedAlerts);
  }
  
  toggleAlertActive(index: number): void {
    const currentAlerts = this.alertsSubject.getValue();
    const updatedAlerts = [...currentAlerts];
    updatedAlerts[index] = {
      ...updatedAlerts[index],
      active: !updatedAlerts[index].active
    };
    this.alertsSubject.next(updatedAlerts);
  }
  
  deleteAlert(index: number): void {
    const currentAlerts = this.alertsSubject.getValue();
    const updatedAlerts = currentAlerts.filter((_, i) => i !== index);
    this.alertsSubject.next(updatedAlerts);
  }
} 