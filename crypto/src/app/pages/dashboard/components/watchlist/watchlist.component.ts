import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { WatchlistService, WatchlistItem } from '../../../../service/watchlist.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-watchlist',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule, BadgeModule, TableModule, TooltipModule],
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.scss']
})
export class WatchlistComponent implements OnInit, OnDestroy {
  watchlistItems: WatchlistItem[] = [];
  private subscription: Subscription = new Subscription();

  constructor(private watchlistService: WatchlistService) {}

  ngOnInit(): void {
    this.loadWatchlistItems();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private loadWatchlistItems(): void {
    this.subscription.add(
      this.watchlistService.getWatchlistItems().subscribe(items => {
        this.watchlistItems = items;
      })
    );
  }
} 