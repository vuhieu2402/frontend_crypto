import { Component } from '@angular/core';

@Component({
    standalone: true,
    selector: 'app-footer',
    template: `<div class="layout-footer">
        INSPECTOR by
        <a href="https://www.artjsc.com/" target="_blank" rel="noopener noreferrer" class="text-primary font-bold hover:underline">A.R.T</a>
    </div>`
})
export class AppFooter {}
