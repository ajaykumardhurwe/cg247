import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: 'full-time' | 'part-time' | 'contract' | 'remote';
  posted: string;
  logo: string;
  tags: string[];
}

@Component({
  selector: 'app-job',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-full pb-20 pt-20 px-4 md:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <!-- Header -->
        <div class="mb-6 md:mb-8 animate-fade-in">
          <h2 class="font-display text-2xl md:text-3xl lg:text-4xl font-bold gradient-text mb-2">
            Job Opportunities
          </h2>
          <p class="text-surface-600 dark:text-surface-400">Find your dream career in Chhattisgarh</p>
        </div>

        <!-- Search and Filters -->
        <div class="card-3d p-4 md:p-6 mb-6 md:mb-8 animate-slide-up">
          <div class="flex flex-col lg:flex-row gap-4">
            <div class="flex-1 relative">
              <input
                type="text"
                [ngModel]="searchQuery()"
                (ngModelChange)="searchQuery.set($event)"
                placeholder="Search jobs..."
                class="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all duration-300"
              />
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2 text-surface-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            <div class="flex flex-wrap gap-2">
              @for (type of jobTypes; track type.value) {
                <button
                  (click)="selectedType.set(type.value)"
                  class="px-4 py-2 rounded-xl transition-all duration-300 text-sm font-medium whitespace-nowrap"
                  [class.bg-primary-500]="selectedType() === type.value"
                  [class.text-white]="selectedType() === type.value"
                  [class.bg-surface-100]="selectedType() !== type.value"
                  [class.text-surface-600]="selectedType() !== type.value"
                  [class.dark:bg-surface-700]="selectedType() !== type.value"
                  [class.dark:text-surface-300]="selectedType() !== type.value">
                  {{ type.label }}
                </button>
              }
            </div>
          </div>
        </div>

        <!-- Stats -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 md:mb-8">
          <div class="card-3d p-4 text-center animate-scale-in">
            <div class="text-2xl md:text-3xl font-bold text-primary-500">{{ totalJobs() }}</div>
            <div class="text-sm text-surface-500">Total Jobs</div>
          </div>
          <div class="card-3d p-4 text-center animate-scale-in" style="animation-delay: 0.1s">
            <div class="text-2xl md:text-3xl font-bold text-green-500">{{ fullTimeCount() }}</div>
            <div class="text-sm text-surface-500">Full-time</div>
          </div>
          <div class="card-3d p-4 text-center animate-scale-in" style="animation-delay: 0.2s">
            <div class="text-2xl md:text-3xl font-bold text-blue-500">{{ remoteCount() }}</div>
            <div class="text-sm text-surface-500">Remote</div>
          </div>
          <div class="card-3d p-4 text-center animate-scale-in" style="animation-delay: 0.3s">
            <div class="text-2xl md:text-3xl font-bold text-accent-500">25+</div>
            <div class="text-sm text-surface-500">Companies</div>
          </div>
        </div>

        <!-- Job Listings -->
        <div class="space-y-4">
          @for (job of filteredJobs(); track job.id) {
            <div class="card-3d p-4 md:p-6 cursor-pointer group animate-slide-up"
                 style="animation-delay: {{ $index * 0.05 }}s">
              <div class="flex flex-col md:flex-row md:items-start gap-4">
                <!-- Company Logo -->
                <div class="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold text-xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  {{ job.company.charAt(0) }}
                </div>

                <!-- Job Details -->
                <div class="flex-1 min-w-0">
                  <div class="flex flex-col md:flex-row md:items-start md:justify-between mb-2">
                    <h4 class="font-bold text-lg group-hover:text-primary-500 transition-colors">{{ job.title }}</h4>
                    <span class="px-3 py-1 rounded-full text-xs font-medium mt-1 md:mt-0 w-fit"
                          [class.bg-green-100]="job.type === 'full-time'"
                          [class.bg-blue-100]="job.type === 'remote'"
                          [class.bg-orange-100]="job.type === 'part-time'"
                          [class.bg-purple-100]="job.type === 'contract'"
                          [class.text-green-600]="job.type === 'full-time'"
                          [class.text-blue-600]="job.type === 'remote'"
                          [class.text-orange-600]="job.type === 'part-time'"
                          [class.text-purple-600]="job.type === 'contract'">
                      {{ job.type.replace('-', ' ') }}
                    </span>
                  </div>

                  <p class="text-surface-600 dark:text-surface-400 mb-3">{{ job.company }}</p>

                  <div class="flex flex-wrap items-center gap-3 text-sm text-surface-500 dark:text-surface-400 mb-4">
                    <span class="flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {{ job.location }}
                    </span>
                    <span class="flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v1m0 0v1m0-1h1m-1 0H10m2 0v1" />
                      </svg>
                      {{ job.salary }}
                    </span>
                    <span class="flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {{ job.posted }}
                    </span>
                  </div>

                  <!-- Tags -->
                  <div class="flex flex-wrap gap-2 mb-4">
                    @for (tag of job.tags; track tag) {
                      <span class="px-2 py-1 rounded-lg text-xs bg-surface-100 dark:bg-surface-700 text-surface-600 dark:text-surface-300">
                        {{ tag }}
                      </span>
                    }
                  </div>

                  <!-- Actions -->
                  <div class="flex flex-wrap gap-2">
                    <button class="btn-3d gradient-bg text-white px-4 py-2 text-sm">
                      Apply Now
                    </button>
                    <button class="btn-3d border border-surface-200 dark:border-surface-600 px-4 py-2 text-sm hover:bg-surface-50 dark:hover:bg-surface-700">
                      Save Job
                    </button>
                  </div>
                </div>
              </div>
            </div>
          }
        </div>

        <!-- Load More -->
        <div class="text-center mt-8">
          <button class="btn-3d bg-gradient-to-r from-primary-500 to-primary-600 text-white px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300">
            Explore More Jobs
          </button>
        </div>
      </div>
    </div>
  `
})
export class JobComponent {
  searchQuery = signal('');
  selectedType = signal('all');

  jobTypes = [
    { label: 'All', value: 'all' },
    { label: 'Full-time', value: 'full-time' },
    { label: 'Part-time', value: 'part-time' },
    { label: 'Remote', value: 'remote' },
    { label: 'Contract', value: 'contract' },
  ];

  jobs = signal<Job[]>([
    { id: '1', title: 'Software Developer', company: 'Tech Solutions Pvt Ltd', location: 'Raipur', salary: '₹4-6 LPA', type: 'full-time', posted: '2 days ago', logo: 'T', tags: ['React', 'Node.js', 'MongoDB'] },
    { id: '2', title: 'Data Analyst', company: 'Analytics Corp', location: 'Bhilai', salary: '₹3-5 LPA', type: 'full-time', posted: '5 days ago', logo: 'A', tags: ['Python', 'SQL', 'Tableau'] },
    { id: '3', title: 'Digital Marketing Manager', company: 'Growth Hub', location: 'Remote', salary: '₹5-8 LPA', type: 'remote', posted: '1 week ago', logo: 'G', tags: ['SEO', 'SEM', 'Social Media'] },
    { id: '4', title: 'Civil Engineer', company: 'Infrastructure India', location: 'Durg', salary: '₹4-7 LPA', type: 'full-time', posted: '3 days ago', logo: 'I', tags: ['AutoCAD', 'Project Management'] },
    { id: '5', title: 'Content Writer', company: 'Media Express', location: 'Raipur', salary: '₹2-4 LPA', type: 'part-time', posted: '1 day ago', logo: 'M', tags: ['Blogging', 'SEO Writing', 'Copywriting'] },
    { id: '6', title: 'Electrical Engineer', company: 'Power Grid Corp', location: 'Korba', salary: '₹5-8 LPA', type: 'contract', posted: '4 days ago', logo: 'P', tags: ['PLC', 'SCADA', 'Maintenance'] },
  ]);

  totalJobs = computed(() => this.jobs().length);

  fullTimeCount = computed(() => {
    const jobsList = this.jobs();
    let count = 0;
    for (const job of jobsList) {
      if (job.type === 'full-time') count++;
    }
    return count;
  });

  remoteCount = computed(() => {
    const jobsList = this.jobs();
    let count = 0;
    for (const job of jobsList) {
      if (job.type === 'remote') count++;
    }
    return count;
  });

  filteredJobs = computed(() => {
    const query = this.searchQuery().toLowerCase();
    const type = this.selectedType();
    const jobsList = this.jobs();

    return jobsList.filter(job => {
      const matchesQuery = !query ||
        job.title.toLowerCase().includes(query) ||
        job.company.toLowerCase().includes(query) ||
        job.location.toLowerCase().includes(query);
      const matchesType = type === 'all' || job.type === type;
      return matchesQuery && matchesType;
    });
  });
}
