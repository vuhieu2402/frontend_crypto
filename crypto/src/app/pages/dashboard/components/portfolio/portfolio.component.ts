import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { Subject, takeUntil } from 'rxjs';
import { PortfolioService, PortfolioAsset } from '../../../../service/portfolio.service';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule, CardModule, ChartModule, ButtonModule, TooltipModule, CurrencyPipe],
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit, OnDestroy {
  portfolioAssets: PortfolioAsset[] = [];
  chartData: any;
  chartOptions: any;
  loading: boolean = false;
  totalValue: number = 0;
  changeValue: number = 1824.12; // Hardcoded for demo
  percentChange: number = 7.5; // Hardcoded for demo
  
  private destroy$ = new Subject<void>();

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit(): void {
    this.loadPortfolioData();
    this.initChartOptions();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadPortfolioData(): void {
    this.portfolioService.getPortfolioAssets()
      .pipe(takeUntil(this.destroy$))
      .subscribe(assets => {
        this.portfolioAssets = assets;
        this.totalValue = this.portfolioService.getTotalValue();
        this.initChartData();
      });
  }

  refreshData(): void {
    this.loading = true;
    setTimeout(() => {
      this.portfolioService.refreshPortfolioData();
      this.loading = false;
    }, 800); // Simulate network delay
  }

  initChartData(): void {
    this.chartData = {
      labels: this.portfolioAssets.map(asset => asset.symbol),
      datasets: [
        {
          data: this.portfolioAssets.map(asset => asset.allocation),
          backgroundColor: this.portfolioAssets.map(asset => asset.color),
          borderWidth: 0
        }
      ]
    };
  }
  
  initChartOptions(): void {
    const documentStyle = getComputedStyle(document.documentElement);
    
    this.chartOptions = {
      cutout: '70%',
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          enabled: true
        }
      }
    };
  }
} 