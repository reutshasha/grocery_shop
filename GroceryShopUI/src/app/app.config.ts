import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AuthInterceptor } from './core/services/auth.interceptor';
import * as NgCharts from 'ng2-charts';
console.log(NgCharts);


export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
  provideHttpClient(withInterceptors([AuthInterceptor])),
  provideRouter(routes),
  provideClientHydration(withEventReplay()),
  importProvidersFrom(MatSnackBarModule),
  importProvidersFrom(NoopAnimationsModule),
  importProvidersFrom(NgCharts.NgChartsModule),

  ]
};

