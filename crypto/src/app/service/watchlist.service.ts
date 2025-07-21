import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface WatchlistItem {
  name: string;
  symbol: string;
  price: string;
  change: string;
  isPositive: boolean;
  sparkline: number[];
}

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {
  private watchlistItems: WatchlistItem[] = [
    {
      name: 'Bitcoin',
      symbol: 'BTC',
      price: '$67,234.56',
      change: '+2.34%',
      isPositive: true,
      sparkline: [30, 40, 45, 50, 65, 55, 70, 60, 75, 80]
    },
    {
      name: 'Ethereum',
      symbol: 'ETH',
      price: '$3,456.78',
      change: '-1.23%',
      isPositive: false,
      sparkline: [60, 50, 45, 40, 35, 30, 25, 35, 30, 25]
    },
    {
      name: 'BNB',
      symbol: 'BNB',
      price: '$589.12',
      change: '+0.89%',
      isPositive: true,
      sparkline: [50, 55, 48, 52, 55, 60, 58, 62, 65, 63]
    },
    {
      name: 'Solana',
      symbol: 'SOL',
      price: '$178.45',
      change: '+4.56%',
      isPositive: true,
      sparkline: [30, 35, 40, 45, 50, 55, 60, 65, 70, 75]
    },
    {
      name: 'Cardano',
      symbol: 'ADA',
      price: '$1.23',
      change: '-0.45%',
      isPositive: false,
      sparkline: [55, 50, 48, 52, 50, 48, 45, 40, 42, 40]
    }
  ];

  constructor() {}

  getWatchlistItems(): Observable<WatchlistItem[]> {
    return of(this.watchlistItems);
  }

  addToWatchlist(item: WatchlistItem): void {
    this.watchlistItems.push(item);
  }

  removeFromWatchlist(symbol: string): void {
    this.watchlistItems = this.watchlistItems.filter(item => item.symbol !== symbol);
  }
} 