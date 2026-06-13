import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="fixed top-0 left-0 right-0 z-50 safe-area-inset-top">
      <div class="glass-effect border-b border-surface-200 dark:border-surface-700">
        <div class="flex items-center justify-between h-14 md:h-16 px-4 md:px-6 max-w-7xl mx-auto">
          <!-- App Name -->
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 md:w-10 md:h-10 rounded-xl gradient-bg flex items-center justify-center shadow-lg transform hover:rotate-12 transition-transform duration-300">
              <span class="text-white font-bold text-lg md:text-xl">CG</span>
            </div>
            <h1 class="font-display font-bold text-lg md:text-xl lg:text-2xl gradient-text mobile-header-title tablet-header-title desktop-header-title">
              Chhattisgarh
            </h1>
          </div>

          <!-- Right Side Icons -->
          <div class="flex items-center gap-2 md:gap-4">
            <!-- Theme Toggle -->
            <button
              (click)="toggleTheme()"
              class="relative w-10 h-10 md:w-12 md:h-12 rounded-xl overflow-hidden group transition-all duration-300 hover:bg-surface-100 dark:hover:bg-surface-800"
              aria-label="Toggle theme">

              <div class="absolute inset-0 flex items-center justify-center transition-all duration-500"
                   [class.opacity-0]="themeService.isDarkMode()"
                   [class.rotate-180]="themeService.isDarkMode()"
                   [class.scale-0]="themeService.isDarkMode()">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 md:w-6 md:h-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>

              <div class="absolute inset-0 flex items-center justify-center transition-all duration-500"
                   [class.opacity-0]="!themeService.isDarkMode()"
                   [class.-rotate-180]="!themeService.isDarkMode()"
                   [class.scale-0]="!themeService.isDarkMode()">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 md:w-6 md:h-6 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              </div>
            </button>

            <!-- Social Media Icons -->
            <div class="hidden sm:flex items-center gap-2">
              <a href="#"
                 class="w-9 h-9 md:w-10 md:h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:bg-surface-100 dark:hover:bg-surface-800 group"
                 aria-label="Facebook">
                <svg class="w-4 h-4 md:w-5 md:h-5 text-surface-600 dark:text-surface-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>

              <a href="#"
                 class="w-9 h-9 md:w-10 md:h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:bg-surface-100 dark:hover:bg-surface-800 group"
                 aria-label="Twitter">
                <svg class="w-4 h-4 md:w-5 md:h-5 text-surface-600 dark:text-surface-400 group-hover:text-sky-500 dark:group-hover:text-sky-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 4s-.7 2.1-2 3.4c1 6-4 11.6-10 11.6-1.8 0-3.5-.5-5-1.4 2.9.3 5.6-1 6.6-3.4-1.3.1-2.5-.4-3-1.4 1.7-.5 2.8-1.7 3-3-1.3-.3-2.5-1.2-2.9-2.5 1.8-.7 3.6-.7 5.4.1 1.2-1.5 2-3.4 2-5.4z"/>
                </svg>
              </a>

              <a href="#"
                 class="w-9 h-9 md:w-10 md:h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:bg-surface-100 dark:hover:bg-surface-800 group"
                 aria-label="Instagram">
                <svg class="w-4 h-4 md:w-5 md:h-5 text-surface-600 dark:text-surface-400 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <rect x="2" y="2" width="20" height="20" rx="5" stroke-width="2"/>
                  <circle cx="12" cy="12" r="4" stroke-width="2"/>
                  <circle cx="18" cy="6" r="1" fill="currentColor" stroke="none"/>
                </svg>
              </a>
            </div>

            <!-- Profile -->
            <button
              class="relative w-10 h-10 md:w-12 md:h-12 rounded-xl overflow-hidden group"
              aria-label="Profile">
              <div class="absolute inset-0 bg-gradient-to-br from-primary-400 to-accent-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              <div class="w-full h-full rounded-xl bg-surface-200 dark:bg-surface-700 flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:scale-105">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 md:w-6 md:h-6 text-surface-500 dark:text-surface-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  `,
  styles: [`
    :host {
      display: block;
    }

    button:active {
      transform: scale(0.95);
    }
  `]
})
export class AppHeaderComponent {
  themeService = inject(ThemeService);

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
