import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface PortfolioAsset {
  name: string;
  symbol: string;
  allocation: number;
  value: string;
  color: string;
}

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private portfolioAssetsSubject = new BehaviorSubject<PortfolioAsset[]>([
    {
      name: 'Bitcoin',
      symbol: 'BTC',
      allocation: 45,
      value: '$10,973.38',
      color: '#3B82F6' // blue-500
    },
    {
      name: 'Ethereum',
      symbol: 'ETH',
      allocation: 30,
      value: '$7,315.59',
      color: '#8B5CF6' // purple-500
    },
    {
      name: 'Solana',
      symbol: 'SOL',
      allocation: 15,
      value: '$3,657.79',
      color: '#EC4899' // pink-500
    },
    {
      name: 'Others',
      symbol: 'Various',
      allocation: 10,
      value: '$2,438.53',
      color: '#6B7280' // gray-500
    }
  ]);

  constructor() {}

  getPortfolioAssets(): Observable<PortfolioAsset[]> {
    return this.portfolioAssetsSubject.asObservable();
  }

  getTotalValue(): number {
    return this.portfolioAssetsSubject.value.reduce(
      (total, asset) => total + parseFloat(asset.value.replace('$', '').replace(',', '')), 
      0
    );
  }

  refreshPortfolioData(): void {
    // In a real application, this would call an API to get updated portfolio data
    // For now, we'll just notify subscribers with the current data
    this.portfolioAssetsSubject.next([...this.portfolioAssetsSubject.value]);
  }
} 