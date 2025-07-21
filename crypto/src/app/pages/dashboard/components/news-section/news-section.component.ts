import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { NewsService, NewsItem } from '../../../../service/news.service';
import { Subscription } from 'rxjs';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-news-section',
  standalone: true,
  imports: [
    CommonModule, 
    CardModule, 
    ButtonModule, 
    TabViewModule, 
    AvatarModule, 
    BadgeModule,
    TooltipModule
  ],
  templateUrl: './news-section.component.html',
  styleUrls: ['./news-section.component.scss']
})
export class NewsSectionComponent implements OnInit, OnDestroy {
  marketNews: NewsItem[] = [];
  analysisNews: NewsItem[] = [];
  private subscriptions: Subscription = new Subscription();

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.newsService.getMarketNews().subscribe(news => {
        this.marketNews = news;
      })
    );

    this.subscriptions.add(
      this.newsService.getAnalysisNews().subscribe(news => {
        this.analysisNews = news;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  refreshNews(): void {
    this.newsService.refreshNews();
  }

  viewAllNews(): void {
    console.log('View all news clicked');
    // Trong ứng dụng thực tế, điều hướng đến trang tin tức đầy đủ
  }
} 