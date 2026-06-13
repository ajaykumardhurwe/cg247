import { Component, signal, inject } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ThemeService } from './services/theme.service';
import { AppHeaderComponent } from './components/header/app-header.component';
import { BottomNavComponent, TabItem } from './components/bottom-nav/bottom-nav.component';
import { HomeComponent } from './components/tabs/home/home.component';
import { PyqComponent } from './components/tabs/pyq/pyq.component';
import { JobComponent } from './components/tabs/job/job.component';
import { ServicesComponent } from './components/tabs/services/services.component';
import { MoreComponent } from './components/tabs/more/more.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    AppHeaderComponent,
    BottomNavComponent,
    HomeComponent,
    PyqComponent,
    JobComponent,
    ServicesComponent,
    MoreComponent,
  ],
  template: `
    <app-header />

    <main class="min-h-screen">
      @switch (activeTab()) {
        @case ('home') {
          <app-home />
        }
        @case ('pyq') {
          <app-pyq />
        }
        @case ('job') {
          <app-job />
        }
        @case ('services') {
          <app-services />
        }
        @case ('more') {
          <app-more />
        }
      }
    </main>

    <app-bottom-nav
      [tabs]="tabs"
      [activeTab]="activeTab()"
      (tabSelect)="onTabSelect($event)" />
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class App {
  themeService = inject(ThemeService);

  activeTab = signal('home');

  tabs: TabItem[] = [
    {
      id: 'home',
      label: 'Home',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>',
      iconActive: '<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.25L2 12l2.5 2.25V22h7v-6h3v6h7v-7.75L22 12L12 2.25z"/></svg>',
    },
    {
      id: 'pyq',
      label: 'PYQ',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>',
      iconActive: '<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M6 2a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V7.5L14.5 2H6zm5 11H9v-2h2v2zm0 4H9v-2h2v2zm4-4h-2v-2h2v2zm0 4h-2v-2h2v2z"/></svg>',
    },
    {
      id: 'job',
      label: 'Job',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>',
      iconActive: '<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M20 6h-3V4c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM9 4h6v2H9V4zm11 14H4v-4h16v4z"/></svg>',
    },
    {
      id: 'services',
      label: 'Services',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/></svg>',
      iconActive: '<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M6 4h4v4H6V4zm8 0h4v4h-4V4zM6 16h4v4H6v-4zm8 0h4v4h-4v-4zM6 10h4v4H6v-4zm8 0h4v4h-4v-4z"/></svg>',
    },
    {
      id: 'more',
      label: 'More',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>',
      iconActive: '<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M4 6h16v2H4V6zm0 4h16v2H4v-2zm0 4h16v2H4v-2zm0 4h16v2H4v-2z"/></svg>',
    },
  ];

  onTabSelect(tabId: string): void {
    this.activeTab.set(tabId);
  }
}

bootstrapApplication(App);
