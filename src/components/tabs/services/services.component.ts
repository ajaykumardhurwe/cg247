import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'government' | 'education' | 'health' | 'business' | 'utility';
  link: string;
  popular: boolean;
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-full pb-20 pt-20 px-4 md:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <!-- Header -->
        <div class="mb-6 md:mb-8 animate-fade-in">
          <h2 class="font-display text-2xl md:text-3xl lg:text-4xl font-bold gradient-text mb-2">
            Services
          </h2>
          <p class="text-surface-600 dark:text-surface-400">Quick access to government and local services</p>
        </div>

        <!-- Category Filter -->
        <div class="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
          @for (category of categories; track category.value) {
            <button
              (click)="selectedCategory.set(category.value)"
              class="flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap transition-all duration-300 text-sm font-medium"
              [class.bg-primary-500]="selectedCategory() === category.value"
              [class.text-white]="selectedCategory() === category.value"
              [class.bg-white]="selectedCategory() !== category.value"
              [class.text-surface-600]="selectedCategory() !== category.value"
              [class.dark:bg-surface-800]="selectedCategory() !== category.value"
              [class.dark:text-surface-300]="selectedCategory() !== category.value"
              [class.shadow-md]="selectedCategory() === category.value">
              <span class="text-lg">{{ category.icon }}</span>
              {{ category.label }}
            </button>
          }
        </div>

        <!-- Popular Services Banner -->
        <div class="card-3d p-6 mb-8 animate-slide-up overflow-hidden relative">
          <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-400/20 to-accent-400/20 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div class="relative z-10">
            <h3 class="font-bold text-lg md:text-xl mb-4 flex items-center gap-2">
              <span class="text-2xl">⭐</span>
              Popular Services
            </h3>
            <div class="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              @for (service of popularServices(); track service.id) {
                <button
                  class="flex-shrink-0 px-4 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white text-sm font-medium hover:from-primary-600 hover:to-primary-700 transition-all duration-300 shadow-md hover:shadow-lg">
                  {{ service.title }}
                </button>
              }
            </div>
          </div>
        </div>

        <!-- Services Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          @for (service of filteredServices(); track service.id) {
            <div class="card-3d p-5 cursor-pointer group animate-scale-in perspective-1000"
                 style="animation-delay: {{ $index * 0.05 }}s">
              <!-- Icon -->
              <div class="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-4 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300"
                   [class.bg-blue-100]="service.category === 'government'"
                   [class.bg-green-100]="service.category === 'education'"
                   [class.bg-red-100]="service.category === 'health'"
                   [class.bg-amber-100]="service.category === 'business'"
                   [class.bg-cyan-100]="service.category === 'utility'"
                   [class.dark:bg-blue-900/30]="service.category === 'government'"
                   [class.dark:bg-green-900/30]="service.category === 'education'"
                   [class.dark:bg-red-900/30]="service.category === 'health'"
                   [class.dark:bg-amber-900/30]="service.category === 'business'"
                   [class.dark:bg-cyan-900/30]="service.category === 'utility'">
                {{ service.icon }}
              </div>

              <!-- Content -->
              <h4 class="font-bold text-lg mb-2 group-hover:text-primary-500 transition-colors">
                {{ service.title }}
              </h4>
              <p class="text-sm text-surface-600 dark:text-surface-400 mb-4 line-clamp-2">
                {{ service.description }}
              </p>

              <!-- Badge -->
              @if (service.popular) {
                <span class="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
                  <span class="text-xs">⭐</span>
                  Popular
                </span>
              }

              <!-- Action Arrow -->
              <div class="flex items-center justify-end mt-4">
                <div class="w-8 h-8 rounded-full bg-surface-100 dark:bg-surface-700 flex items-center justify-center group-hover:bg-primary-500 group-hover:text-white transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          }
        </div>

        <!-- Help Section -->
        <div class="mt-8 md:mt-12">
          <div class="card-3d p-6 md:p-8 text-center animate-fade-in">
            <h3 class="font-bold text-xl md:text-2xl mb-3">Need Help?</h3>
            <p class="text-surface-600 dark:text-surface-400 mb-6 max-w-lg mx-auto">
              Can't find what you're looking for? Our support team is here to help you.
            </p>
            <div class="flex flex-col sm:flex-row gap-3 justify-center">
              <button class="btn-3d gradient-bg text-white px-6 py-3 font-medium">
                Contact Support
              </button>
              <button class="btn-3d border border-surface-200 dark:border-surface-600 px-6 py-3 font-medium hover:bg-surface-50 dark:hover:bg-surface-700">
                Browse All Services
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ServicesComponent {
  selectedCategory = signal('all');

  categories = [
    { label: 'All', value: 'all', icon: '🏠' },
    { label: 'Government', value: 'government', icon: '🏛️' },
    { label: 'Education', value: 'education', icon: '🎓' },
    { label: 'Health', value: 'health', icon: '🏥' },
    { label: 'Business', value: 'business', icon: '💼' },
    { label: 'Utility', value: 'utility', icon: '⚡' },
  ];

  services = signal<ServiceItem[]>([
    { id: '1', title: 'Aadhaar Services', description: 'Apply for Aadhaar card, update details', icon: '🪪', category: 'government', link: '#', popular: true },
    { id: '2', title: 'Ration Card Application', description: 'Apply for new ration card or update existing', icon: '🛒', category: 'government', link: '#', popular: true },
    { id: '3', title: 'Birth Certificate', description: 'Apply for birth certificate online', icon: '📜', category: 'government', link: '#', popular: false },
    { id: '4', title: 'School Admissions', description: 'Apply for school admissions in CG', icon: '🏫', category: 'education', link: '#', popular: true },
    { id: '5', title: 'Scholarship Portal', description: 'Apply for government scholarships', icon: '💎', category: 'education', link: '#', popular: true },
    { id: '6', title: 'Hospital Services', description: 'Book appointments at government hospitals', icon: '🏥', category: 'health', link: '#', popular: false },
    { id: '7', title: 'COVID Vaccination', description: 'Book your vaccination slot', icon: '💉', category: 'health', link: '#', popular: false },
    { id: '8', title: 'Business Registration', description: 'Register your business in CG', icon: '📝', category: 'business', link: '#', popular: false },
    { id: '9', title: 'GST Registration', description: 'Apply for GST registration', icon: '💳', category: 'business', link: '#', popular: false },
    { id: '10', title: 'Electricity Bill', description: 'Pay electricity bills online', icon: '💡', category: 'utility', link: '#', popular: true },
    { id: '11', title: 'Water Supply', description: 'New water connection & bill payment', icon: '🚰', category: 'utility', link: '#', popular: false },
    { id: '12', title: 'Property Tax', description: 'Pay property taxes online', icon: '🏠', category: 'government', link: '#', popular: false },
  ]);

  popularServices = signal(this.services().filter(s => s.popular));

  filteredServices = signal(this.services());
}
