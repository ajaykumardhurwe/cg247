import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface PYQItem {
  id: string;
  title: string;
  year: string;
  subject: string;
  type: 'exam' | 'practice' | 'mock';
  downloads: number;
}

@Component({
  selector: 'app-pyq',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-full pb-20 pt-20 px-4 md:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <!-- Header -->
        <div class="mb-6 md:mb-8 animate-fade-in">
          <h2 class="font-display text-2xl md:text-3xl lg:text-4xl font-bold gradient-text mb-2">
            Previous Year Questions
          </h2>
          <p class="text-surface-600 dark:text-surface-400">Access PYQs and practice materials</p>
        </div>

        <!-- Search and Filters -->
        <div class="card-3d p-4 md:p-6 mb-6 md:mb-8 animate-slide-up">
          <div class="flex flex-col md:flex-row gap-4">
            <div class="flex-1 relative">
              <input
                type="text"
                [ngModel]="searchQuery()"
                (ngModelChange)="searchQuery.set($event)"
                placeholder="Search PYQs..."
                class="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all duration-300"
              />
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2 text-surface-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            <div class="flex gap-2 overflow-x-auto pb-2 md:pb-0">
              @for (filter of filters; track filter.value) {
                <button
                  (click)="activeFilter.set(filter.value)"
                  class="px-4 py-2 rounded-xl whitespace-nowrap transition-all duration-300 text-sm font-medium"
                  [class.bg-primary-500]="activeFilter() === filter.value"
                  [class.text-white]="activeFilter() === filter.value"
                  [class.bg-surface-100]="activeFilter() !== filter.value"
                  [class.text-surface-600]="activeFilter() !== filter.value"
                  [class.dark:bg-surface-700]="activeFilter() !== filter.value"
                  [class.dark:text-surface-300]="activeFilter() !== filter.value"
                  [class.hover:bg-surface-200]="activeFilter() !== filter.value"
                  [class.dark:hover:bg-surface-600]="activeFilter() !== filter.value">
                  {{ filter.label }}
                </button>
              }
            </div>
          </div>
        </div>

        <!-- Category Tabs -->
        <div class="flex gap-2 mb-6 overflow-x-auto pb-2">
          @for (category of categories; track category) {
            <button
              (click)="selectedCategory.set(category)"
              class="px-4 py-2 rounded-xl whitespace-nowrap transition-all duration-300 text-sm font-medium"
              [class.bg-primary-500]="selectedCategory() === category"
              [class.text-white]="selectedCategory() === category"
              [class.bg-white]="selectedCategory() !== category"
              [class.text-surface-600]="selectedCategory() !== category"
              [class.dark:bg-surface-800]="selectedCategory() !== category"
              [class.dark:text-surface-300]="selectedCategory() !== category"
              [class.shadow-md]="selectedCategory() === category">
              {{ category }}
            </button>
          }
        </div>

        <!-- PYQ Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          @for (pyq of filteredPYQs(); track pyq.id) {
            <div class="card-3d overflow-hidden animate-scale-in cursor-pointer group"
                 style="animation-delay: {{ $index * 0.05 }}s">
              <div class="p-4 md:p-6">
                <div class="flex items-start justify-between mb-4">
                  <div class="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                       [class.bg-blue-100]="pyq.type === 'exam'"
                       [class.bg-green-100]="pyq.type === 'practice'"
                       [class.bg-orange-100]="pyq.type === 'mock'"
                       [class.dark:bg-blue-900/30]="pyq.type === 'exam'"
                       [class.dark:bg-green-900/30]="pyq.type === 'practice'"
                       [class.dark:bg-orange-900/30]="pyq.type === 'mock'">
                    {{ pyq.type === 'exam' ? '📋' : pyq.type === 'practice' ? '✏️' : '📝' }}
                  </div>
                  <span class="px-2 py-1 rounded-lg text-xs font-medium"
                        [class.bg-blue-100]="pyq.type === 'exam'"
                        [class.bg-green-100]="pyq.type === 'practice'"
                        [class.bg-orange-100]="pyq.type === 'mock'"
                        [class.text-blue-600]="pyq.type === 'exam'"
                        [class.text-green-600]="pyq.type === 'practice'"
                        [class.text-orange-600]="pyq.type === 'mock'">
                    {{ pyq.type === 'exam' ? 'Exam' : pyq.type === 'practice' ? 'Practice' : 'Mock Test' }}
                  </span>
                </div>

                <h4 class="font-bold text-lg mb-2 group-hover:text-primary-500 transition-colors">
                  {{ pyq.title }}
                </h4>

                <div class="flex items-center gap-2 text-sm text-surface-500 dark:text-surface-400 mb-4">
                  <span>{{ pyq.year }}</span>
                  <span class="w-1 h-1 rounded-full bg-surface-400"></span>
                  <span>{{ pyq.subject }}</span>
                </div>

                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2 text-sm text-surface-500">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    <span>{{ pyq.downloads }} downloads</span>
                  </div>

                  <button class="btn-3d bg-primary-500 text-white px-4 py-2 text-sm hover:bg-primary-600">
                    Download
                  </button>
                </div>
              </div>
            </div>
          }
        </div>

        <!-- Load More -->
        <div class="text-center mt-8">
          <button class="btn-3d bg-gradient-to-r from-primary-500 to-primary-600 text-white px-8 py-3 hover:from-primary-600 hover:to-primary-700 transition-all duration-300 shadow-lg hover:shadow-xl">
            Load More PYQs
          </button>
        </div>
      </div>
    </div>
  `
})
export class PyqComponent {
  searchQuery = signal('');
  activeFilter = signal('all');
  selectedCategory = signal('All');

  filters = [
    { label: 'All', value: 'all' },
    { label: 'Exam', value: 'exam' },
    { label: 'Practice', value: 'practice' },
    { label: 'Mock Test', value: 'mock' },
  ];

  categories = ['All', 'Science', 'Mathematics', 'History', 'Geography', 'Civics', 'Economics'];

  pyqs: PYQItem[] = [
    { id: '1', title: 'CGPSC Preliminary Exam 2024', year: '2024', subject: 'General Studies', type: 'exam', downloads: 1250 },
    { id: '2', title: 'Physics Practice Set', year: '2023', subject: 'Science', type: 'practice', downloads: 890 },
    { id: '3', title: 'CG Vyapam Mock Test', year: '2024', subject: 'General Knowledge', type: 'mock', downloads: 2100 },
    { id: '4', title: 'Mathematics Previous Year', year: '2023', subject: 'Mathematics', type: 'exam', downloads: 1560 },
    { id: '5', title: 'Chemistry Practice Papers', year: '2024', subject: 'Science', type: 'practice', downloads: 780 },
    { id: '6', title: 'History Mock Test Series', year: '2024', subject: 'History', type: 'mock', downloads: 1340 },
  ];

  filteredPYQs = signal(this.pyqs);
}
