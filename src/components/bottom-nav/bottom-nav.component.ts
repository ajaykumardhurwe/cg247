import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface TabItem {
  id: string;
  label: string;
  icon: string;
  iconActive: string;
}

@Component({
  selector: 'app-bottom-nav',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="fixed bottom-0 left-0 right-0 z-50 safe-area-inset-bottom">
      <div class="glass-effect border-t border-surface-200 dark:border-surface-700">
        <div class="flex justify-around items-center h-16 max-w-lg mx-auto px-2">
          @for (tab of tabs(); track tab.id) {
            <button
              (click)="tabSelect.emit(tab.id)"
              class="flex flex-col items-center justify-center w-full h-full relative group"
              [class.active-tab]="activeTab() === tab.id">

              <div class="relative">
                <div class="absolute inset-0 rounded-full bg-primary-500/20 scale-0 group-hover:scale-150 transition-transform duration-300"></div>

                <div class="relative z-10 transform transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-1"
                     [class.scale-125]="activeTab() === tab.id">
                  <span [innerHTML]="activeTab() === tab.id ? tab.iconActive : tab.icon"
                        class="text-2xl block transition-colors duration-300"
                        [class.text-primary-500]="activeTab() === tab.id"
                        [class.text-surface-500]="activeTab() !== tab.id"
                        [class.dark:text-surface-400]="activeTab() !== tab.id">
                  </span>
                </div>
              </div>

              <span class="text-xs mt-1 font-medium transition-all duration-300"
                    [class.text-primary-500]="activeTab() === tab.id"
                    [class.text-surface-500]="activeTab() !== tab.id"
                    [class.dark:text-surface-400]="activeTab() !== tab.id"
                    [class.opacity-100]="activeTab() === tab.id"
                    [class.opacity-70]="activeTab() !== tab.id">
                {{ tab.label }}
              </span>

              @if (activeTab() === tab.id) {
                <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary-500"></div>
              }
            </button>
          }
        </div>
      </div>
    </nav>
  `,
  styles: [`
    :host {
      display: block;
    }

    .active-tab {
      transform: translateY(-2px);
    }

    button:active {
      transform: scale(0.95);
    }
  `]
})
export class BottomNavComponent {
  tabs = input<TabItem[]>([]);
  activeTab = input<string>('');
  tabSelect = output<string>();
}
