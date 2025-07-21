import { Injectable, signal } from '@angular/core';

type Theme = 'light' | 'dark' | 'system';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private themeSignal = signal<Theme>('system');
  private isDarkSignal = signal<boolean>(false);

  constructor() {
    this.initTheme();
  }

  private initTheme(): void {
    // Check if theme is stored in localStorage
    const storedTheme = localStorage.getItem('theme') as Theme | null;
    if (storedTheme) {
      this.themeSignal.set(storedTheme);
    }

    // Apply the theme
    this.applyTheme();

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      if (this.themeSignal() === 'system') {
        this.applyTheme();
      }
    });
  }

  private applyTheme(): void {
    const theme = this.themeSignal();
    const isDark = theme === 'dark' || 
      (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    this.isDarkSignal.set(isDark);
  }

  setTheme(theme: Theme): void {
    this.themeSignal.set(theme);
    localStorage.setItem('theme', theme);
    this.applyTheme();
  }

  getTheme(): Theme {
    return this.themeSignal();
  }

  isDark(): boolean {
    return this.isDarkSignal();
  }

  toggleTheme(): void {
    const currentTheme = this.themeSignal();
    if (currentTheme === 'light') {
      this.setTheme('dark');
    } else if (currentTheme === 'dark') {
      this.setTheme('system');
    } else {
      this.setTheme('light');
    }
  }
} 