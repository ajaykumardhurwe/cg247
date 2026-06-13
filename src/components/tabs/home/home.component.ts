import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-full pb-20 pt-20 px-4 md:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <!-- Hero Section -->
        <div class="text-center mb-8 md:mb-12 animate-fade-in">
          <h2 class="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4 gradient-text">
            Welcome to Chhattisgarh
          </h2>
          <p class="text-surface-600 dark:text-surface-400 text-lg md:text-xl max-w-2xl mx-auto">
            Your one-stop destination for resources, jobs, and services
          </p>
        </div>

        <!-- Quick Stats Cards -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">
          @for (stat of stats; track stat.label) {
            <div class="card-3d p-4 md:p-6 animate-scale-in perspective-1000"
                 style="animation-delay: {{ $index * 0.1 }}s">
              <div class="text-3xl md:text-4xl mb-2">{{ stat.icon }}</div>
              <div class="text-2xl md:text-3xl font-bold text-primary-500 mb-1">{{ stat.value }}</div>
              <div class="text-sm md:text-base text-surface-600 dark:text-surface-400">{{ stat.label }}</div>
            </div>
          }
        </div>

        <!-- Featured Section -->
        <div class="mb-8 md:mb-12">
          <h3 class="font-display text-xl md:text-2xl font-bold mb-6 flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-primary-500"></span>
            Featured Resources
          </h3>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            @for (feature of features; track feature.title) {
              <div class="card-3d p-6 cursor-pointer group animate-slide-up"
                   style="animation-delay: {{ $index * 0.1 }}s">
                <div class="flex items-start gap-4">
                  <div class="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center text-white text-2xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    {{ feature.icon }}
                  </div>
                  <div class="flex-1">
                    <h4 class="font-bold text-lg mb-2 group-hover:text-primary-500 transition-colors">{{ feature.title }}</h4>
                    <p class="text-sm text-surface-600 dark:text-surface-400">{{ feature.description }}</p>
                  </div>
                </div>
                <div class="mt-4 flex items-center justify-between text-sm">
                  <span class="text-primary-500 font-medium">{{ feature.category }}</span>
                  <span class="text-surface-500">{{ feature.date }}</span>
                </div>
              </div>
            }
          </div>
        </div>

        <!-- Recent Activities -->
        <div>
          <h3 class="font-display text-xl md:text-2xl font-bold mb-6 flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-accent-500"></span>
            Recent Activities
          </h3>

          <div class="space-y-4">
            @for (activity of activities; track activity.title) {
              <div class="card-3d p-4 md:p-5 flex items-center gap-4 cursor-pointer hover:border-primary-500 transition-all duration-300">
                <div class="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center text-xl"
                     [class.bg-primary-100]="activity.type === 'update'"
                     [class.bg-accent-100]="activity.type === 'new'"
                     [class.bg-green-100]="activity.type === 'success'"
                     [class.dark:bg-primary-900/30]="activity.type === 'update'"
                     [class.dark:bg-accent-900/30]="activity.type === 'new'"
                     [class.dark:bg-green-900/30]="activity.type === 'success'">
                  {{ activity.icon }}
                </div>
                <div class="flex-1 min-w-0">
                  <h5 class="font-medium text-sm md:text-base truncate">{{ activity.title }}</h5>
                  <p class="text-xs md:text-sm text-surface-500 dark:text-surface-400">{{ activity.time }}</p>
                </div>
                <div class="text-xs px-2 py-1 rounded-full"
                     [class.bg-primary-100]="activity.type === 'update'"
                     [class.bg-accent-100]="activity.type === 'new'"
                     [class.bg-green-100]="activity.type === 'success'"
                     [class.text-primary-600]="activity.type === 'update'"
                     [class.text-accent-600]="activity.type === 'new'"
                     [class.text-green-600]="activity.type === 'success'">
                  {{ activity.type }}
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  `
})
export class HomeComponent {
  stats = [
    { icon: '📚', value: '500+', label: 'Study Materials' },
    { icon: '💼', value: '200+', label: 'Job Listings' },
    { icon: '🛠️', value: '150+', label: 'Services' },
    { icon: '👥', value: '10K+', label: 'Users' },
  ];

  features = [
    { icon: '📝', title: 'Civil Services Guide', description: 'Complete guide for CG civil services examination preparation', category: 'Education', date: '2 days ago' },
    { icon: '🔬', title: 'Science PYQs', description: 'Previous year questions with detailed solutions', category: 'PYQ', date: '5 days ago' },
    { icon: '🎓', title: 'Scholarship Programs', description: 'Government scholarships for students', category: 'Education', date: '1 week ago' },
    { icon: '🏭', title: 'Industrial Jobs', description: 'Latest job openings in Chhattisgarh industries', category: 'Jobs', date: '3 days ago' },
    { icon: '🏛️', title: 'Government Services', description: 'Online government services portal', category: 'Services', date: '1 day ago' },
    { icon: '🌾', title: 'Agriculture Schemes', description: 'Farmer welfare schemes and subsidies', category: 'Services', date: '4 days ago' },
  ];

  activities = [
    { icon: '📝', title: 'New PYQ papers uploaded for 2024', time: '2 hours ago', type: 'new' },
    { icon: '💼', title: 'IT Company hiring freshers in Raipur', time: '5 hours ago', type: 'new' },
    { icon: '✅', title: 'Profile verification completed', time: '1 day ago', type: 'success' },
    { icon: '🔔', title: 'System maintenance scheduled', time: '2 days ago', type: 'update' },
  ];
}
