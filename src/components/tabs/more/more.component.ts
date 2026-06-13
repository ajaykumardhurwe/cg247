import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../services/theme.service';

interface MenuItem {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  route?: string;
  action?: string;
  badge?: string;
}

@Component({
  selector: 'app-more',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-full pb-20 pt-20 px-4 md:px-6 lg:px-8">
      <div class="max-w-3xl mx-auto">
        <!-- Header -->
        <div class="mb-6 md:mb-8 animate-fade-in">
          <h2 class="font-display text-2xl md:text-3xl lg:text-4xl font-bold gradient-text mb-2">
            More
          </h2>
          <p class="text-surface-600 dark:text-surface-400">Settings and additional options</p>
        </div>

        <!-- Profile Card -->
        <div class="card-3d p-6 mb-6 animate-slide-up">
          <div class="flex items-center gap-4">
            <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-400 to-accent-500 flex items-center justify-center text-white text-2xl font-bold">
              U
            </div>
            <div class="flex-1">
              <h3 class="font-bold text-lg">User Profile</h3>
              <p class="text-surface-500 dark:text-surface-400 text-sm">user@example.com</p>
            </div>
            <button class="w-10 h-10 rounded-xl bg-surface-100 dark:bg-surface-700 flex items-center justify-center hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Settings Sections -->
        <div class="space-y-6">
          <!-- Appearance -->
          <div class="card-3d overflow-hidden animate-scale-in">
            <div class="px-4 py-3 bg-surface-50 dark:bg-surface-800/50 border-b border-surface-200 dark:border-surface-700">
              <h3 class="font-semibold text-sm text-surface-500 uppercase tracking-wider">Appearance</h3>
            </div>
            <div class="p-4">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-4">
                  <div class="w-10 h-10 rounded-xl bg-surface-100 dark:bg-surface-700 flex items-center justify-center">
                    {{ themeService.isDarkMode() ? '🌙' : '☀️' }}
                  </div>
                  <div>
                    <h4 class="font-medium">Dark Mode</h4>
                    <p class="text-sm text-surface-500">Switch between light and dark theme</p>
                  </div>
                </div>
                <button
                  (click)="themeService.toggleTheme()"
                  class="relative w-14 h-8 rounded-full transition-colors duration-300"
                  [class.bg-primary-500]="themeService.isDarkMode()"
                  [class.bg-surface-300]="!themeService.isDarkMode()">
                  <div class="absolute top-1 w-6 h-6 rounded-full bg-white shadow-md transition-transform duration-300"
                       [class.translate-x-7]="themeService.isDarkMode()"
                       [class.translate-x-1]="!themeService.isDarkMode()">
                  </div>
                </button>
              </div>
            </div>
          </div>

          <!-- App Settings -->
          <div class="card-3d overflow-hidden animate-scale-in" style="animation-delay: 0.1s">
            <div class="px-4 py-3 bg-surface-50 dark:bg-surface-800/50 border-b border-surface-200 dark:border-surface-700">
              <h3 class="font-semibold text-sm text-surface-500 uppercase tracking-wider">App Settings</h3>
            </div>
            <div class="divide-y divide-surface-200 dark:divide-surface-700">
              @for (item of settingsItems; track item.id) {
                <button class="w-full p-4 flex items-center gap-4 hover:bg-surface-50 dark:hover:bg-surface-800/50 transition-colors">
                  <div class="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                       [class.bg-surface-100]="!item.badge"
                       [class.dark:bg-surface-700]="!item.badge"
                       [class.bg-primary-100]="item.badge"
                       [class.dark:bg-primary-900/30]="item.badge">
                    {{ item.icon }}
                  </div>
                  <div class="flex-1 text-left">
                    <h4 class="font-medium">{{ item.title }}</h4>
                    <p class="text-sm text-surface-500">{{ item.subtitle }}</p>
                  </div>
                  @if (item.badge) {
                    <span class="px-2 py-1 rounded-full text-xs font-medium bg-primary-500 text-white">
                      {{ item.badge }}
                    </span>
                  }
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-surface-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              }
            </div>
          </div>

          <!-- Support -->
          <div class="card-3d overflow-hidden animate-scale-in" style="animation-delay: 0.2s">
            <div class="px-4 py-3 bg-surface-50 dark:bg-surface-800/50 border-b border-surface-200 dark:border-surface-700">
              <h3 class="font-semibold text-sm text-surface-500 uppercase tracking-wider">Support</h3>
            </div>
            <div class="divide-y divide-surface-200 dark:divide-surface-700">
              @for (item of supportItems; track item.id) {
                <button class="w-full p-4 flex items-center gap-4 hover:bg-surface-50 dark:hover:bg-surface-800/50 transition-colors">
                  <div class="w-10 h-10 rounded-xl bg-surface-100 dark:bg-surface-700 flex items-center justify-center text-lg">
                    {{ item.icon }}
                  </div>
                  <div class="flex-1 text-left">
                    <h4 class="font-medium">{{ item.title }}</h4>
                    <p class="text-sm text-surface-500">{{ item.subtitle }}</p>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-surface-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              }
            </div>
          </div>

          <!-- Footer Info -->
          <div class="text-center py-8 animate-fade-in" style="animation-delay: 0.3s">
            <div class="flex items-center justify-center gap-2 mb-2">
              <div class="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center text-white font-bold">
                CG
              </div>
              <span class="font-display font-bold gradient-text">Chhattisgarh</span>
            </div>
            <p class="text-sm text-surface-500 mb-2">Version 1.0.0</p>
            <p class="text-xs text-surface-400">Made with ❤️ for Chhattisgarh</p>

            <!-- Social Links -->
            <div class="flex justify-center gap-3 mt-4">
              <a href="#" class="w-10 h-10 rounded-xl bg-surface-100 dark:bg-surface-700 flex items-center justify-center hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors">
                <svg class="w-5 h-5 text-surface-600 dark:text-surface-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a href="#" class="w-10 h-10 rounded-xl bg-surface-100 dark:bg-surface-700 flex items-center justify-center hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors">
                <svg class="w-5 h-5 text-surface-600 dark:text-surface-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 4s-.7 2.1-2 3.4c1 6-4 11.6-10 11.6-1.8 0-3.5-.5-5-1.4 2.9.3 5.6-1 6.6-3.4-1.3.1-2.5-.4-3-1.4 1.7-.5 2.8-1.7 3-3-1.3-.3-2.5-1.2-2.9-2.5 1.8-.7 3.6-.7 5.4.1 1.2-1.5 2-3.4 2-5.4z"/>
                </svg>
              </a>
              <a href="#" class="w-10 h-10 rounded-xl bg-surface-100 dark:bg-surface-700 flex items-center justify-center hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors">
                <svg class="w-5 h-5 text-surface-600 dark:text-surface-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <rect x="2" y="2" width="20" height="20" rx="5" stroke-width="2"/>
                  <circle cx="12" cy="12" r="4" stroke-width="2"/>
                  <circle cx="18" cy="6" r="1" fill="currentColor" stroke="none"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class MoreComponent {
  themeService = inject(ThemeService);

  settingsItems: MenuItem[] = [
    { id: 'notifications', title: 'Notifications', subtitle: 'Manage push notifications', icon: '🔔', badge: '3' },
    { id: 'language', title: 'Language', subtitle: 'English (India)', icon: '🌐' },
    { id: 'storage', title: 'Storage', subtitle: 'Clear cache and manage data', icon: '💾' },
    { id: 'privacy', title: 'Privacy & Security', subtitle: 'Manage your privacy settings', icon: '🔒' },
  ];

  supportItems: MenuItem[] = [
    { id: 'help', title: 'Help Center', subtitle: 'FAQs and guides', icon: '❓' },
    { id: 'feedback', title: 'Send Feedback', subtitle: 'Help us improve', icon: '💭' },
    { id: 'rate', title: 'Rate Us', subtitle: 'Share your experience', icon: '⭐' },
    { id: 'terms', title: 'Terms & Conditions', subtitle: 'Read our policies', icon: '📄' },
  ];
}
