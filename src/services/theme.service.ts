import { Injectable, signal, effect } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly THEME_KEY = 'chhattisgarh-theme';

  isDarkMode = signal<boolean>(false);

  constructor() {
    this.initializeTheme();

    effect(() => {
      this.applyTheme(this.isDarkMode());
    });
  }

  private initializeTheme(): void {
    const savedTheme = localStorage.getItem(this.THEME_KEY);
    if (savedTheme) {
      this.isDarkMode.set(savedTheme === 'dark');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.isDarkMode.set(prefersDark);
    }
  }

  private applyTheme(isDark: boolean): void {
    const body = document.body;
    body.classList.remove('light', 'dark');
    body.classList.add(isDark ? 'dark' : 'light');
    localStorage.setItem(this.THEME_KEY, isDark ? 'dark' : 'light');

    const themeColor = isDark ? '#1a1a2e' : '#1890ff';
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', themeColor);
  }

  toggleTheme(): void {
    this.isDarkMode.update(value => !value);
  }

  setTheme(isDark: boolean): void {
    this.isDarkMode.set(isDark);
  }
}
