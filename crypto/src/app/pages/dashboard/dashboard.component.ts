import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MarketOverviewComponent } from './components/market-overview/market-overview.component';
import { PriceChartComponent } from './components/price-chart/price-chart.component';
import { WatchlistComponent } from './components/watchlist/watchlist.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { NewsSectionComponent } from './components/news-section/news-section.component';
import { QuickActionsComponent } from './components/quick-actions/quick-actions.component';
import { AlertsPanelComponent } from './components/alerts-panel/alerts-panel.component';
import { DashboardLayoutComponent } from './layout/dashboard-layout.component';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        MarketOverviewComponent,
        PriceChartComponent,
        WatchlistComponent,
        PortfolioComponent,
        NewsSectionComponent,
        QuickActionsComponent,
        AlertsPanelComponent,
        DashboardLayoutComponent
    ],
    template: `
        <app-dashboard-layout>
            <!-- Market Overview -->
            <app-market-overview class="block mb-6"></app-market-overview>

            <!-- Main Content Grid -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
                <!-- Left Column - Charts and News -->
                <div class="lg:col-span-2 flex flex-col gap-6">
                    <div>
                        <app-price-chart></app-price-chart>
                    </div>
                    <div>
                        <app-news-section></app-news-section>
                    </div>
                </div>

                <!-- Right Column - Watchlist, Portfolio, Actions -->
                <div class="flex flex-col gap-6">
                    <app-quick-actions></app-quick-actions>
                    <app-watchlist></app-watchlist>
                    <app-portfolio class="h-auto"></app-portfolio>
                    <app-alerts-panel></app-alerts-panel>
                </div>
            </div>
        </app-dashboard-layout>
    `,
    styles: [`
        :host {
            display: block;
        }
    `]
})
export class DashboardComponent implements OnInit {
    
    constructor() {}

    ngOnInit(): void {}
} 