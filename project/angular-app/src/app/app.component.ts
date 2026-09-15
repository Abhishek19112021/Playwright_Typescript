import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface LearningTrack { title: string; type: string; level: string; duration: string; progress: number; accent: string; icon: string; description: string; modules: string[]; }

@Component({ selector: 'app-root', standalone: true, imports: [CommonModule], templateUrl: './app.component.html' })
export class AppComponent {
  activeTrack = 0;
  tracks: LearningTrack[] = [
    { title: 'Web automation lab', type: 'Playwright + Selenium', level: 'Foundation to advanced', duration: '8 weeks', progress: 68, accent: 'mint', icon: '✦', description: 'Build resilient UI automation for a real commerce workflow, from locators to parallel CI runs.', modules: ['Test architecture', 'Playwright fixtures', 'Selenium Grid', 'Enterprise CI/CD'] },
    { title: 'API & data workshop', type: 'REST + SQL + contracts', level: 'Intermediate', duration: '5 weeks', progress: 32, accent: 'coral', icon: '⌁', description: 'Validate APIs, seed databases, and connect contract tests to the same business scenarios.', modules: ['HTTP fundamentals', 'PostgreSQL validation', 'Auth & contracts', 'Service virtualization'] },
    { title: 'Performance command center', type: 'k6 + observability', level: 'Advanced', duration: '6 weeks', progress: 12, accent: 'gold', icon: '↗', description: 'Turn production signals into meaningful load models, thresholds, and performance gates.', modules: ['Load modeling', 'k6 scripting', 'Dashboards & tracing', 'Release readiness'] }
  ];

  selectTrack(index: number): void { this.activeTrack = index; }
  get currentTrack(): LearningTrack { return this.tracks[this.activeTrack]; }
}
