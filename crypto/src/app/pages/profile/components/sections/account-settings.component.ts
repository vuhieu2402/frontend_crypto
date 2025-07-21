import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../../service/theme.service';
import { PrimeIcons, MenuItem } from 'primeng/api';

@Component({
  selector: 'app-account-settings',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white dark:bg-gray-800 text-black dark:text-white p-6 rounded-lg shadow-md">
      <h2 class="text-2xl font-bold mb-6 flex items-center">
        <span class="material-icons-outlined mr-3">
          <i class="pi pi-globe"></i>
        </span>
        Regional Settings
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label for="preferred-currency" class="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Preferred Currency</label>
          <select id="preferred-currency" class="w-full bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-black dark:text-white rounded-md p-3 focus:ring-blue-500 focus:border-blue-500">
            <option *ngFor="let currency of currencies" [value]="currency.code">{{ currency.name }}</option>
          </select>
        </div>
        <div>
          <label for="timezone" class="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Timezone</label>
          <select id="timezone" class="w-full bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-black dark:text-white rounded-md p-3 focus:ring-blue-500 focus:border-blue-500">
            <option *ngFor="let tz of timezones" [value]="tz.value">{{ tz.name }}</option>
          </select>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .material-icons-outlined {
      font-family: 'Material Icons';
      font-weight: normal;
      font-style: normal;
      font-size: 24px;
      line-height: 1;
      letter-spacing: normal;
      text-transform: none;
      display: inline-block;
      white-space: nowrap;
      word-wrap: normal;
      direction: ltr;
      -webkit-font-feature-settings: 'liga';
      -webkit-font-smoothing: antialiased;
    }
  `]
})
export class AccountSettingsComponent {
  themeService = inject(ThemeService);

  currencies = [
    { code: 'USD', name: 'USD - US Dollar' },
    { code: 'EUR', name: 'EUR - Euro' },
    { code: 'JPY', name: 'JPY - Japanese Yen' },
    { code: 'GBP', name: 'GBP - British Pound' },
    { code: 'AUD', name: 'AUD - Australian Dollar' },
    { code: 'CAD', name: 'CAD - Canadian Dollar' },
    { code: 'CHF', name: 'CHF - Swiss Franc' },
    { code: 'CNY', name: 'CNY - Chinese Yuan' },
    { code: 'SEK', name: 'SEK - Swedish Krona' },
    { code: 'NZD', name: 'NZD - New Zealand Dollar' },
    { code: 'VND', name: 'VND - Vietnamese Dong' },
  ];

  timezones = [
    { value: 'UTC-12', name: '(UTC-12:00) International Date Line West' },
    { value: 'UTC-11', name: '(UTC-11:00) Coordinated Universal Time-11' },
    { value: 'UTC-10', name: '(UTC-10:00) Hawaii' },
    { value: 'UTC-9', name: '(UTC-09:00) Alaska' },
    { value: 'UTC-8', name: '(UTC-08:00) Pacific Time (US & Canada)' },
    { value: 'UTC-7', name: '(UTC-07:00) Mountain Time (US & Canada)' },
    { value: 'UTC-6', name: '(UTC-06:00) Central Time (US & Canada)' },
    { value: 'UTC-5', name: '(UTC-05:00) Eastern Time (US & Canada)' },
    { value: 'UTC-4', name: '(UTC-04:00) Atlantic Time (Canada)' },
    { value: 'UTC-3', name: '(UTC-03:00) Buenos Aires, Georgetown' },
    { value: 'UTC-2', name: '(UTC-02:00) Coordinated Universal Time-02' },
    { value: 'UTC-1', name: '(UTC-01:00) Azores, Cape Verde Is.' },
    { value: 'UTC+0', name: '(UTC+00:00) Greenwich Mean Time : Dublin, Edinburgh, Lisbon, London' },
    { value: 'UTC+1', name: '(UTC+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna' },
    { value: 'UTC+2', name: '(UTC+02:00) Athens, Bucharest, Istanbul' },
    { value: 'UTC+3', name: '(UTC+03:00) Moscow, St. Petersburg, Volgograd' },
    { value: 'UTC+4', name: '(UTC+04:00) Abu Dhabi, Muscat' },
    { value: 'UTC+5', name: '(UTC+05:00) Islamabad, Karachi, Tashkent' },
    { value: 'UTC+6', name: '(UTC+06:00) Astana, Dhaka' },
    { value: 'UTC+7', name: '(UTC+07:00) Bangkok, Hanoi, Jakarta' },
    { value: 'UTC+8', name: '(UTC+08:00) Beijing, Perth, Singapore, Hong Kong' },
    { value: 'UTC+9', name: '(UTC+09:00) Tokyo, Seoul, Osaka, Sapporo, Yakutsk' },
    { value: 'UTC+10', name: '(UTC+10:00) Eastern Australia, Guam, Vladivostok' },
    { value: 'UTC+11', name: '(UTC+11:00) Magadan, Solomon Is., New Caledonia' },
    { value: 'UTC+12', name: '(UTC+12:00) Auckland, Wellington, Fiji, Kamchatka' }
  ];
}
