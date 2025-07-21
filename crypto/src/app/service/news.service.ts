import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface NewsItem {
  title: string;
  source: string;
  sourceIcon: string;
  time: string;
  tag: string;
  tagSeverity: 'info' | 'success' | 'warn' | 'danger' | 'secondary' | 'contrast';
}

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private marketNews: NewsItem[] = [
    {
      title: "Bitcoin Surges Above $67,000 as Institutional Adoption Accelerates",
      source: "CryptoNews",
      sourceIcon: "CN",
      time: "2 hours ago",
      tag: "BTC",
      tagSeverity: "success"
    },
    {
      title: "SEC Approves New Spot Ethereum ETF Applications",
      source: "Finance Today",
      sourceIcon: "FT",
      time: "4 hours ago",
      tag: "ETH",
      tagSeverity: "info"
    },
    {
      title: "Major Bank Integrates Crypto Payment Solutions for Institutional Clients",
      source: "Banking Weekly",
      sourceIcon: "BW",
      time: "6 hours ago",
      tag: "Adoption",
      tagSeverity: "warn"
    },
    {
      title: "Regulatory Concerns Rise as Countries Consider New Crypto Frameworks",
      source: "Global Finance",
      sourceIcon: "GF",
      time: "8 hours ago",
      tag: "Regulation",
      tagSeverity: "danger"
    }
  ];

  private analysisNews: NewsItem[] = [
    {
      title: "Technical Analysis: BTC Forming Bullish Pattern, $75K Target in Sight",
      source: "CryptoAnalyst",
      sourceIcon: "CA",
      time: "3 hours ago",
      tag: "Technical",
      tagSeverity: "success"
    },
    {
      title: "Ethereum's Upcoming Upgrade Could Solve Scaling Issues, Analysts Say",
      source: "Blockchain Report",
      sourceIcon: "BR",
      time: "5 hours ago",
      tag: "Fundamental",
      tagSeverity: "info"
    },
    {
      title: "Market Sentiment Index Shows Extreme Greed, Correction Possible",
      source: "Sentiment Tracker",
      sourceIcon: "ST",
      time: "7 hours ago",
      tag: "Sentiment",
      tagSeverity: "warn"
    },
    {
      title: "On-Chain Analysis: Whales Accumulating Despite Price Uncertainty",
      source: "ChainData",
      sourceIcon: "CD",
      time: "9 hours ago",
      tag: "On-Chain",
      tagSeverity: "info"
    }
  ];

  private marketNewsSubject = new BehaviorSubject<NewsItem[]>(this.marketNews);
  private analysisNewsSubject = new BehaviorSubject<NewsItem[]>(this.analysisNews);

  constructor() {}

  getMarketNews(): Observable<NewsItem[]> {
    return this.marketNewsSubject.asObservable();
  }

  getAnalysisNews(): Observable<NewsItem[]> {
    return this.analysisNewsSubject.asObservable();
  }

  refreshNews(): void {
    // Trong ứng dụng thực tế, đây là nơi bạn sẽ gọi API để lấy tin tức mới
    console.log('Refreshing news data...');
    
    // Giả lập cập nhật tin tức mới bằng cách thêm timestamp
    const timestamp = new Date().toLocaleTimeString();
    
    // Cập nhật tin tức thị trường
    const updatedMarketNews = this.marketNews.map(news => ({
      ...news,
      time: `Updated at ${timestamp}`
    }));
    this.marketNewsSubject.next(updatedMarketNews);
    
    // Cập nhật tin tức phân tích
    const updatedAnalysisNews = this.analysisNews.map(news => ({
      ...news,
      time: `Updated at ${timestamp}`
    }));
    this.analysisNewsSubject.next(updatedAnalysisNews);
  }
} 