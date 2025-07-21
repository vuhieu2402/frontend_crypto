import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [CommonModule, AppMenuitem, RouterModule],
    template: `<ul class="layout-menu">
        <ng-container *ngFor="let item of model; let i = index">
            <li app-menuitem *ngIf="!item.separator" [item]="item" [index]="i" [root]="true"></li>
            <li *ngIf="item.separator" class="menu-separator"></li>
        </ng-container>
    </ul> `
})
export class AppMenu {
    model: MenuItem[] = [];

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [
                    { 
                        label: 'Dashboard', 
                        icon: 'pi pi-fw pi-chart-bar', 
                        routerLink: ['/dashboard'] 
                    }
                ]
            },
            {
                label: 'Management',
                items: [
                    { 
                        label: 'Market', 
                        icon: 'pi pi-fw pi-chart-line', 
                        routerLink: ['/market'] 
                    },
                    { 
                        label: 'Transactions', 
                        icon: 'pi pi-fw pi-sync', 
                        routerLink: ['/transactions'] 
                    },
                    { 
                        label: 'Portfolio', 
                        icon: 'pi pi-fw pi-briefcase', 
                        routerLink: ['/portfolio'] 
                    }
                ]
            },
            {
                label: 'Inspector',
                items: [{ label: 'Inspector Vision', icon: 'pi pi-fw pi-id-card', routerLink: ['/home/inspector'] }]
            }
        ];
    }
}
