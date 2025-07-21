import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

// Interfaces
export interface MarketStat {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: string;
}

export interface Coin {
  symbol: string;
  name: string;
  price: string;
  change: string;
  isPositive: boolean;
  marketCap: string;
}

@Injectable({
  providedIn: 'root'
})
export class MarketOverviewService {
  private marketStats: MarketStat[] = [
    {
      title: "Total Market Cap",
      value: "$2.45T",
      change: "+2.34%",
      isPositive: true,
      icon: "pi pi-dollar",
    },
    {
      title: "24h Volume",
      value: "$89.2B",
      change: "-1.23%",
      isPositive: false,
      icon: "pi pi-chart-bar",
    },
    {
      title: "BTC Dominance",
      value: "52.3%",
      change: "+0.45%",
      isPositive: true,
      icon: "pi pi-arrow-up",
    },
    {
      title: "Active Coins",
      value: "2,847",
      change: "+12",
      isPositive: true,
      icon: "pi pi-arrow-up",
    },
  ];

  private topCoins: Coin[] = [
    {
      symbol: "BTC",
      name: "Bitcoin",
      price: "$67,234.56",
      change: "+2.34%",
      isPositive: true,
      marketCap: "$1.32T",
    },
    {
      symbol: "ETH",
      name: "Ethereum",
      price: "$3,456.78",
      change: "-1.23%",
      isPositive: false,
      marketCap: "$415.6B",
    },
    {
      symbol: "BNB",
      name: "BNB",
      price: "$589.12",
      change: "+0.89%",
      isPositive: true,
      marketCap: "$87.4B",
    },
    {
      symbol: "SOL",
      name: "Solana",
      price: "$178.45",
      change: "+4.56%",
      isPositive: true,
      marketCap: "$82.1B",
    },
  ];

  private marketStatsSubject = new BehaviorSubject<MarketStat[]>(this.marketStats);
  private topCoinsSubject = new BehaviorSubject<Coin[]>(this.topCoins);

  constructor() {}

  getMarketStats(): Observable<MarketStat[]> {
    return this.marketStatsSubject.asObservable();
  }

  getTopCoins(): Observable<Coin[]> {
    return this.topCoinsSubject.asObservable();
  }

  refreshMarketData(): void {
    // Trong ứng dụng thực tế, đây là nơi bạn sẽ gọi API để lấy dữ liệu mới
    console.log('Refreshing market data...');
    // Sau khi có dữ liệu mới, cập nhật subjects
    // this.marketStatsSubject.next(newMarketStats);
    // this.topCoinsSubject.next(newTopCoins);
  }
} 