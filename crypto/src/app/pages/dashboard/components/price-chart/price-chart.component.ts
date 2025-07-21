import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { TooltipModule } from 'primeng/tooltip';
import { Subject, finalize, takeUntil } from 'rxjs';
import { PriceChartService, TimeOption, CryptoPrice } from '../../../../service/price-chart.service';

@Component({
  selector: 'app-price-chart',
  standalone: true,
  imports: [
    CommonModule, 
    CardModule, 
    ChartModule, 
    DropdownModule, 
    ButtonModule, 
    FormsModule,
    TooltipModule,
    DecimalPipe
  ],
  templateUrl: './price-chart.component.html',
  styleUrls: ['./price-chart.component.scss']
})
export class PriceChartComponent implements OnInit, OnDestroy {
  timeOptions: TimeOption[] = [];
  selectedTimeOption!: TimeOption;
  chartButtons: string[] = [];
  activeButton: string = 'BTC';
  chartData: any;
  chartOptions: any;
  loading: boolean = false;
  cryptoPrice?: CryptoPrice;

  private destroy$ = new Subject<void>();

  constructor(private priceChartService: PriceChartService) {}

  ngOnInit(): void {
    // Initialize with default values to prevent template errors
    this.cryptoPrice = {
      symbol: 'BTC',
      name: 'Bitcoin',
      currentPrice: 0,
      priceChange: 0,
      priceChangePercentage: 0
    };
    
    this.timeOptions = this.priceChartService.getTimeOptions();
    this.selectedTimeOption = this.timeOptions[0];
    
    this.priceChartService.getChartButtons()
      .pipe(takeUntil(this.destroy$))
      .subscribe(buttons => {
        this.chartButtons = buttons;
      });
    
    this.priceChartService.getSelectedCrypto()
      .pipe(takeUntil(this.destroy$))
      .subscribe(crypto => {
        this.activeButton = crypto;
        this.loadChartData();
      });
    
    this.priceChartService.getCryptoPrice()
      .pipe(takeUntil(this.destroy$))
      .subscribe(price => {
        this.cryptoPrice = price;
      });
    
    this.initChartOptions();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadChartData(): void {
    this.loading = true;
    this.priceChartService.getChartData(this.activeButton, this.selectedTimeOption.value)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.loading = false)
      )
      .subscribe(data => {
        this.chartData = data;
      });
  }

  onTimeframeChange(): void {
    this.priceChartService.setSelectedTimeframe(this.selectedTimeOption);
    this.loadChartData();
  }

  setActiveButton(option: string): void {
    if (this.activeButton !== option) {
      this.priceChartService.setSelectedCrypto(option);
    }
  }

  refreshData(): void {
    this.loading = true;
    this.priceChartService.refreshData()
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.loading = false)
      )
      .subscribe(() => {
        this.loadChartData();
      });
  }

  initChartOptions(): void {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    
    this.chartOptions = {
      maintainAspectRatio: false,
      aspectRatio: 2.5,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: documentStyle.getPropertyValue('--surface-card'),
          titleColor: textColor,
          bodyColor: textColor,
          borderWidth: 1,
          borderColor: surfaceBorder
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder
          }
        },
        y: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder
          }
        }
      }
    };
  }
} 