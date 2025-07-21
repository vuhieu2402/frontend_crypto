import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface TimeOption {
  label: string;
  value: string;
}

export interface CryptoPrice {
  symbol: string;
  name: string;
  currentPrice: number;
  priceChange: number;
  priceChangePercentage: number;
}

@Injectable({
  providedIn: 'root'
})
export class PriceChartService {
  private timeOptions: TimeOption[] = [
    { label: '24h', value: '24h' },
    { label: '7d', value: '7d' },
    { label: '30d', value: '30d' },
    { label: '90d', value: '90d' },
    { label: '1y', value: '1y' },
  ];

  private chartButtonsSubject = new BehaviorSubject<string[]>(['BTC', 'ETH', 'BNB', 'SOL', 'ADA']);
  private selectedCryptoSubject = new BehaviorSubject<string>('BTC');
  private selectedTimeframeSubject = new BehaviorSubject<TimeOption>(this.timeOptions[0]);
  private cryptoPriceSubject = new BehaviorSubject<CryptoPrice>({
    symbol: 'BTC',
    name: 'Bitcoin',
    currentPrice: 67234.56,
    priceChange: 1534.23,
    priceChangePercentage: 2.34
  });

  constructor() {}

  getTimeOptions(): TimeOption[] {
    return this.timeOptions;
  }

  getChartButtons(): Observable<string[]> {
    return this.chartButtonsSubject.asObservable();
  }

  getSelectedCrypto(): Observable<string> {
    return this.selectedCryptoSubject.asObservable();
  }

  setSelectedCrypto(crypto: string): void {
    this.selectedCryptoSubject.next(crypto);
    // Update price data based on selected crypto
    this.updateCryptoPrice(crypto);
  }

  getSelectedTimeframe(): Observable<TimeOption> {
    return this.selectedTimeframeSubject.asObservable();
  }

  setSelectedTimeframe(timeframe: TimeOption): void {
    this.selectedTimeframeSubject.next(timeframe);
  }

  getCryptoPrice(): Observable<CryptoPrice> {
    return this.cryptoPriceSubject.asObservable();
  }

  private updateCryptoPrice(symbol: string): void {
    // In a real app, this would fetch data from an API
    // For now, generate some mock data based on the symbol
    const mockData: Record<string, CryptoPrice> = {
      'BTC': {
        symbol: 'BTC',
        name: 'Bitcoin',
        currentPrice: 67234.56,
        priceChange: 1534.23,
        priceChangePercentage: 2.34
      },
      'ETH': {
        symbol: 'ETH',
        name: 'Ethereum',
        currentPrice: 3245.78,
        priceChange: 87.45,
        priceChangePercentage: 2.77
      },
      'BNB': {
        symbol: 'BNB',
        name: 'Binance Coin',
        currentPrice: 567.89,
        priceChange: -12.34,
        priceChangePercentage: -2.13
      },
      'SOL': {
        symbol: 'SOL',
        name: 'Solana',
        currentPrice: 145.67,
        priceChange: 5.67,
        priceChangePercentage: 4.05
      },
      'ADA': {
        symbol: 'ADA',
        name: 'Cardano',
        currentPrice: 0.45,
        priceChange: -0.02,
        priceChangePercentage: -3.45
      }
    };

    this.cryptoPriceSubject.next(mockData[symbol] || mockData['BTC']);
  }

  getChartData(symbol: string, timeframe: string): Observable<any> {
    // In a real app, this would fetch data from an API based on symbol and timeframe
    // For now, return mock data with a simulated delay
    return of(this.generateMockChartData(symbol, timeframe)).pipe(
      delay(500)
    );
  }

  private generateMockChartData(symbol: string, timeframe: string): any {
    // Generate different data based on symbol and timeframe
    const baseData = [40000, 43000, 45000, 53000, 49000, 62000, 65000, 61000, 68000, 65000, 69000, 67000];
    
    // Adjust data based on symbol (just for demo purposes)
    let multiplier = 1;
    switch(symbol) {
      case 'ETH': multiplier = 0.05; break;
      case 'BNB': multiplier = 0.01; break;
      case 'SOL': multiplier = 0.002; break;
      case 'ADA': multiplier = 0.00001; break;
      default: multiplier = 1;
    }
    
    // Adjust labels based on timeframe
    let labels: string[] = [];
    switch(timeframe) {
      case '24h':
        labels = Array.from({length: 24}, (_, i) => `${i}:00`);
        break;
      case '7d':
        labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        break;
      case '30d':
        labels = Array.from({length: 30}, (_, i) => `${i+1}`);
        break;
      case '90d':
        labels = ['Jan', 'Feb', 'Mar'];
        break;
      case '1y':
      default:
        labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    }
    
    return {
      labels,
      datasets: [
        {
          label: symbol,
          data: baseData.map(value => value * multiplier),
          fill: true,
          backgroundColor: 'rgba(59, 130, 246, 0.2)',
          borderColor: '#3B82F6',
          tension: 0.4
        }
      ]
    };
  }

  refreshData(): Observable<boolean> {
    // In a real app, this would refresh all data from the API
    // For now, just simulate a delay and return success
    return of(true).pipe(delay(800));
  }
} 