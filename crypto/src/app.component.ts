import { AfterViewInit, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { PreloaderService } from './app/service/preload-service';
import { ThemeService } from './app/service/theme.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, RouterModule, ToastModule],
    template: `
        <div [class.dark]="themeService.isDark()">
            <router-outlet></router-outlet>
            <p-toast></p-toast>
        </div>
    `
})
export class AppComponent implements AfterViewInit, OnInit {
    constructor(
        private preloader: PreloaderService,
        public themeService: ThemeService
    ) {}
    
    ngOnInit() {
        // Theme is handled by ThemeService
    }
    
    ngAfterViewInit() {
        this.preloader.hide();
    }
}
