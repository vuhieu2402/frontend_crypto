import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { MarketOverviewService, MarketStat, Coin } from '../../../../service/market-overview.service';
import { Subscription } from 'rxjs';

// Lucide icons không có sẵn trong Angular, sử dụng PrimeIcons
@Component({
  selector: 'app-market-overview',
  standalone: true,
  imports: [CommonModule, CardModule, BadgeModule, ButtonModule],
  templateUrl: './market-overview.component.html',
  styleUrls: ['./market-overview.component.scss']
})
export class MarketOverviewComponent implements OnInit, OnDestroy {
  marketStats: MarketStat[] = [];
  topCoins: Coin[] = [];
  private subscriptions: Subscription = new Subscription();

  constructor(private marketService: MarketOverviewService) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.marketService.getMarketStats().subscribe(stats => {
        this.marketStats = stats;
      })
    );

    this.subscriptions.add(
      this.marketService.getTopCoins().subscribe(coins => {
        this.topCoins = coins;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  refreshData(): void {
    this.marketService.refreshMarketData();
  }
} 